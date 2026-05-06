import { Loader2, Sparkles } from "lucide-react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAiCluster, useClusterStatus } from "../../hooks/useApi";
import { ApiError } from "../../lib/api";
import { Button } from "./ui/button";
import { PaymentModal } from "./PaymentModal";

type Props = {
  unassignedCount: number;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

export function AiGroupConversationsAction({ unassignedCount, variant = "outline", className }: Props) {
  const queryClient = useQueryClient();
  const aiCluster = useAiCluster();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [finalized, setFinalized] = useState(false);
  const clusterStatus = useClusterStatus(jobId, !finalized);
  const status = clusterStatus.data?.status;
  const active = !!jobId && !finalized && status !== "complete" && status !== "failed";

  const invalidateWorkspace = () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["pool"] });
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
    queryClient.invalidateQueries({ queryKey: ["state"] });
  };

  useEffect(() => {
    if (!jobId || finalized || !status) return;

    if (status === "complete") {
      setFinalized(true);
      toast.success("AI group conversations complete");
      invalidateWorkspace();
    }

    if (status === "failed") {
      setFinalized(true);
      toast.error(clusterStatus.data?.error_message || "AI group conversations failed");
    }
  }, [clusterStatus.data, finalized, jobId, queryClient, status]);

  const start = () => {
    toast.info("AI grouping started");
    aiCluster.mutate(undefined, {
      onSuccess: (result) => {
        if (!result?.job_id) {
          toast.error("AI group conversations did not return a job id");
          return;
        }
        setFinalized(false);
        setJobId(result.job_id);
      },
      onError: (error: any) => {
        if (error instanceof ApiError && error.status === 402) {
          setPaymentOpen(true);
          return;
        }
        toast.error(error?.message ?? "AI group conversations failed");
      },
    });
  };

  if (unassignedCount <= 0) return null;

  const progressLabel =
    aiCluster.isPending ? "Starting" :
    active && status === "running" ? "Running" :
    active ? "Queued" :
    status === "failed" ? "Failed" :
    status === "complete" ? "Complete" :
    null;

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={start}
        disabled={aiCluster.isPending || active}
      >
        {aiCluster.isPending || active ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
        AI group conversations
      </Button>
      {progressLabel ? (
        <div className="text-[11px] text-[#6B6B66]">
          AI grouping: {progressLabel.toLowerCase()}
        </div>
      ) : null}
      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        onComplete={invalidateWorkspace}
      />
    </div>
  );
}
