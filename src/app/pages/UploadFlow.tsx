import { Upload, Sparkles, Lock, FolderKanban, Network, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PaymentModal } from "../components/PaymentModal";

type FlowStep = "upload" | "processing" | "partial-results" | "unlock";

export default function UploadFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FlowStep>("upload");
  const [progress, setProgress] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const processingSteps = [
    { label: "Reading conversations", duration: 1500 },
    { label: "Detecting patterns", duration: 2000 },
    { label: "Mapping projects", duration: 1500 },
    { label: "Generating insights", duration: 2000 },
  ];

  const [currentProcessingStep, setCurrentProcessingStep] = useState(0);

  useEffect(() => {
    if (step === "processing") {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep("partial-results");
          }, 500);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === "processing" && currentProcessingStep < processingSteps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentProcessingStep(currentProcessingStep + 1);
      }, processingSteps[currentProcessingStep].duration);

      return () => clearTimeout(timeout);
    }
  }, [step, currentProcessingStep]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      setStep("processing");
      setProgress(0);
      setCurrentProcessingStep(0);
    }
  };

  const handleUnlock = () => {
    setPaymentModalOpen(true);
  };

  // Upload Step
  if (step === "upload") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-5xl tracking-tight">Upload your conversations</h1>
            <p className="text-xl text-[#717182]">
              ChatGPT, Claude, or Grok exports accepted
            </p>
          </div>

          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-12">
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[rgba(0,0,0,0.12)] bg-[#FAFAFA] px-8 py-16 transition-colors hover:border-[rgba(0,0,0,0.24)] hover:bg-[#F5F5F7]"
            >
              <Upload className="mb-4 h-12 w-12 text-[#717182]" />
              <div className="mb-2 text-lg">
                {file ? file.name : "Click to upload or drag and drop"}
              </div>
              <div className="text-[13px] text-[#717182]">
                ZIP, JSON, or TXT files accepted
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".zip,.json,.txt"
                onChange={handleFileSelect}
              />
            </label>

            {file && (
              <Button
                size="lg"
                className="mt-6 w-full text-lg"
                onClick={handleUpload}
              >
                Start Analysis
              </Button>
            )}
          </Card>

          <div className="mt-8 text-center text-[13px] text-[#717182]">
            Your data is processed securely and never shared
          </div>
        </div>
      </div>
    );
  }

  // Processing Step
  if (step === "processing") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
        <div className="w-full max-w-xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F5F7]">
              <Sparkles className="h-12 w-12 text-[#030213] animate-pulse" />
            </div>
          </div>

          <h2 className="mb-3 text-3xl tracking-tight">
            We're analyzing your work
          </h2>
          <p className="mb-8 text-lg text-[#717182]">
            {processingSteps[currentProcessingStep].label}
          </p>

          <div className="mb-3">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-[13px] text-[#717182]">{progress}%</div>
        </div>
      </div>
    );
  }

  // Partial Results Step
  if (step === "partial-results") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00C853]">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-3 text-5xl tracking-tight">We've mapped your work</h1>
            <p className="text-xl text-[#717182]">
              Here's what we found in your conversations
            </p>
          </div>

          {/* Detected Projects */}
          <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <FolderKanban className="h-6 w-6" />
              <h2 className="text-2xl tracking-tight">Detected Projects</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] p-4">
                <div>
                  <div className="mb-1 text-[15px] font-medium">
                    Landing Page Redesign
                  </div>
                  <div className="text-[13px] text-[#717182]">
                    23 conversations
                  </div>
                </div>
                <div className="text-[13px] text-[#717182]">Mar 15 - Mar 28</div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] p-4">
                <div>
                  <div className="mb-1 text-[15px] font-medium">API Integration</div>
                  <div className="text-[13px] text-[#717182]">
                    18 conversations
                  </div>
                </div>
                <div className="text-[13px] text-[#717182]">Mar 8 - Mar 20</div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] p-4">
                <div>
                  <div className="mb-1 text-[15px] font-medium">
                    Database Optimization
                  </div>
                  <div className="text-[13px] text-[#717182]">
                    12 conversations
                  </div>
                </div>
                <div className="text-[13px] text-[#717182]">Feb 28 - Mar 12</div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
              <div className="mb-2 text-3xl tracking-tight">87</div>
              <div className="text-[13px] text-[#717182]">Total Conversations</div>
            </Card>
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
              <div className="mb-2 text-3xl tracking-tight">6</div>
              <div className="text-[13px] text-[#717182]">Projects Identified</div>
            </Card>
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
              <div className="mb-2 text-3xl tracking-tight">42</div>
              <div className="text-[13px] text-[#717182]">Days of Work</div>
            </Card>
          </div>

          {/* Locked Section */}
          <Card className="relative overflow-hidden border-2 border-[rgba(0,0,0,0.12)] bg-white p-8">
            {/* Blurred Preview */}
            <div className="blur-sm select-none pointer-events-none">
              <div className="mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6" />
                <h2 className="text-2xl tracking-tight">Your Full Profile</h2>
              </div>

              <div className="mb-6 rounded-lg bg-[#FAFAFA] p-6">
                <div className="mb-3 text-[11px] uppercase tracking-wider text-[#717182]">
                  Operator Level
                </div>
                <div className="text-5xl tracking-tight">ADVANCED–INTERMEDIATE</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">
                    Strengths
                  </div>
                  <div className="text-[15px]">
                    You control direction and get outcomes
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">
                    Gaps
                  </div>
                  <div className="text-[15px]">
                    You don't define constraints early
                  </div>
                </div>
              </div>
            </div>

            {/* Unlock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
              <div className="max-w-md text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F7]">
                    <Lock className="h-10 w-10 text-[#030213]" />
                  </div>
                </div>

                <h3 className="mb-4 text-3xl tracking-tight">
                  Unlock your full analysis
                </h3>

                <ul className="mb-8 space-y-2 text-left text-[15px] text-[#717182]">
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Your operator level (ADVANCED, INTERMEDIATE, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Detailed strengths and gaps analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Shareable proof page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Knowledge map visualization</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="h-14 min-w-[240px] text-lg font-medium"
                  onClick={handleUnlock}
                >
                  Unlock full analysis — $7
                </Button>

                <p className="mt-4 text-[13px] text-[#717182]">
                  One-time payment. Full access forever.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <PaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          onComplete={() => {
            setPaymentModalOpen(false);
            navigate("/app");
          }}
        />
      </div>
    );
  }

  return null;
}
