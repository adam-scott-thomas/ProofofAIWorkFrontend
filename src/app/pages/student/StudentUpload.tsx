import { Upload, FileText, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function StudentUpload() {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      navigate("/student/analyze");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl tracking-tight">
            How do you work with AI?
          </h1>
          <p className="text-xl text-[#717182]">
            Upload your AI conversations. Get a free analysis of your work style.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="border-2 border-dashed border-[rgba(0,0,0,0.12)] bg-white p-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F7]">
              <Upload className="h-10 w-10 text-[#717182]" />
            </div>
          </div>

          <h2 className="mb-3 text-xl">Upload AI Conversations</h2>
          <p className="mb-6 text-[15px] text-[#717182]">
            ChatGPT exports, Claude conversations, or any AI chat logs
          </p>

          <div className="mb-6">
            <Button
              size="lg"
              className="w-full max-w-xs"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Choose Files
                </>
              )}
            </Button>
          </div>

          <div className="text-[13px] text-[#717182]">
            Supports: JSON, TXT, Markdown • Max 50 conversations
          </div>
        </Card>

        {/* What You'll Get */}
        <div className="mt-8 rounded-md border border-[rgba(0,0,0,0.08)] bg-white p-6">
          <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">
            What You'll Get
          </div>
          <ul className="space-y-2 text-[15px]">
            <li className="flex items-center gap-2">
              <span className="text-[#717182]">→</span>
              <span>Your AI work style profile</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#717182]">→</span>
              <span>Strengths and gaps analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#717182]">→</span>
              <span>Shareable score card</span>
            </li>
          </ul>
        </div>

        {/* Privacy */}
        <div className="mt-6 text-center text-[13px] text-[#717182]">
          Your conversations are analyzed locally and not stored permanently.
        </div>
      </div>
    </div>
  );
}
