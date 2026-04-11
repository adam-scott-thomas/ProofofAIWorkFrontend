import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
  appId: string;
  locationId: string;
  onToken: (sourceId: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export default function SquarePaymentForm({
  appId,
  locationId,
  onToken,
  onCancel,
  submitLabel = "Pay",
  loading = false,
}: Props) {
  const cardRef = useRef<SquareCard | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [tokenizing, setTokenizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!window.Square) {
        setError("Square SDK failed to load. Please refresh the page.");
        return;
      }

      try {
        const payments = await window.Square.payments(appId, locationId);
        const card = await payments.card();
        if (cancelled) {
          card.destroy();
          return;
        }
        await card.attach("#sq-card-container");
        cardRef.current = card;
        setReady(true);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to initialize payment form");
      }
    }

    init();

    return () => {
      cancelled = true;
      cardRef.current?.destroy();
      cardRef.current = null;
    };
  }, [appId, locationId]);

  const handleSubmit = useCallback(async () => {
    if (!cardRef.current) return;
    setError(null);
    setTokenizing(true);

    try {
      const result = await cardRef.current.tokenize();
      if (result.status === "OK" && result.token) {
        onToken(result.token);
      } else {
        const msg = result.errors?.map((e) => e.message).join("; ") || "Card tokenization failed";
        setError(msg);
      }
    } catch (e: any) {
      setError(e.message || "Payment error");
    } finally {
      setTokenizing(false);
    }
  }, [onToken]);

  const busy = tokenizing || loading;

  return (
    <div className="space-y-4">
      <div
        id="sq-card-container"
        ref={containerRef}
        className="min-h-[44px] rounded-md border border-[rgba(0,0,0,0.12)] bg-white p-1"
      />

      {!ready && !error && (
        <div className="flex items-center gap-2 text-[13px] text-[#717182]">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Loading card form...
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={handleSubmit} disabled={!ready || busy}>
          {busy && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
