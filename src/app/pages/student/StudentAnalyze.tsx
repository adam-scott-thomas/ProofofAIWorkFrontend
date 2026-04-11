import { Sparkles, Brain, FileSearch, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAssessment } from "../../../hooks/useApi";

// Map backend status to animation step index (0–3)
function statusToStepIndex(status: string): number {
  switch (status) {
    case "pending":
    case "parsing":
      return 0;
    case "normalizing":
      return 1;
    case "gating":
    case "evaluating":
      return 2;
    case "aggregating":
    case "complete":
    case "partial":
      return 3;
    default:
      return 0;
  }
}

export default function StudentAnalyze() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get("id") || "";

  // Poll assessment status every 2s while waiting
  const { data: assessmentData } = useAssessment(assessmentId, {
    refetchInterval: assessmentId ? 2000 : false,
  });

  const currentStatus: string = assessmentData?.status ?? "pending";
  const isDone = currentStatus === "complete" || currentStatus === "partial";
  const currentStep = statusToStepIndex(currentStatus);

  const analysisSteps = [
    { icon: FileSearch, label: "Reading conversations" },
    { icon: Brain, label: "Analyzing patterns" },
    { icon: Sparkles, label: "Generating insights" },
    { icon: CheckCircle2, label: "Complete" },
  ];

  // Navigate to share gate when analysis is done
  useEffect(() => {
    if (isDone) {
      const idParam = assessmentId ? `?id=${assessmentId}` : "";
      navigate(`/student/share${idParam}`);
    }
  }, [isDone, assessmentId, navigate]);

  // Fallback: if no assessmentId, advance through mock steps so the UI isn't frozen
  useEffect(() => {
    if (assessmentId) return; // real polling is handling it
    // No-op: just show step 0 indefinitely if no ID was passed
  }, [assessmentId]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {analysisSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 ${
                    isActive
                      ? "scale-100 opacity-100"
                      : isComplete
                      ? "scale-75 opacity-0"
                      : "scale-75 opacity-0"
                  }`}
                  style={{
                    backgroundColor: isActive ? "#F5F5F7" : "transparent",
                  }}
                >
                  <StepIcon
                    className={`h-12 w-12 ${
                      isActive ? "text-[#030213] animate-pulse" : "text-[#C0C0C5]"
                    }`}
                  />
                </div>
              );
            })}
            <div className="h-24 w-24" /> {/* Spacer */}
          </div>
        </div>

        {/* Current Step Label */}
        <div className="mb-6">
          <h2 className="text-2xl tracking-tight mb-2">
            {analysisSteps[currentStep].label}
          </h2>
          <p className="text-[15px] text-[#717182]">
            This may take a few moments...
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-2">
          {analysisSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-16 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-[#030213]" : "bg-[#E5E5E7]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
