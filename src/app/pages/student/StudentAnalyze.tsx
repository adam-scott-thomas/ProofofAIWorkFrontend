import { Sparkles, Brain, FileSearch, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function StudentAnalyze() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { icon: FileSearch, label: "Reading conversations", duration: 1500 },
    { icon: Brain, label: "Analyzing patterns", duration: 2000 },
    { icon: Sparkles, label: "Generating insights", duration: 1500 },
    { icon: CheckCircle2, label: "Complete", duration: 500 },
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentStep < analysisSteps.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, analysisSteps[currentStep].duration);
    } else if (currentStep === analysisSteps.length - 1) {
      // On final step, wait a bit then navigate to share gate
      timeoutId = setTimeout(() => {
        navigate("/student/share");
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStep, navigate]);

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
