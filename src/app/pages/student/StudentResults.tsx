import { Share2, Download, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { useState } from "react";

export default function StudentResults() {
  const [copied, setCopied] = useState(false);

  // Mock analysis results
  const results = {
    hlsScore: 42,
    aiExecutionLoad: 67,
    caiMultiplier: 1.8,
    strengths: ["iteration and validation"],
    actions: ["catch errors", "refine outputs", "push toward working results"],
    gaps: ["initial direction is sometimes unclear", "rely on correction instead of precision"],
    verdict: "You get there — but not efficiently.",
  };

  const shareUrl = `https://proofofaiwork.com/p/student-abc123`;
  const shareText = `I analyzed my AI work style. HLS: ${results.hlsScore}% | AI Load: ${results.aiExecutionLoad}% | CAI: ${results.caiMultiplier}x`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: "twitter" | "linkedin") => {
    let url = "";

    if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    }

    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl tracking-tight">Your AI Work Style</h1>
          <p className="text-[15px] text-[#717182]">
            Based on analysis of your AI conversations
          </p>
        </div>

        {/* Main Assessment Card */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-8">
          {/* Metrics Grid */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-md bg-[#FAFAFA] p-4 text-center">
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                HLS
              </div>
              <div className="text-3xl tracking-tight">{results.hlsScore}%</div>
              <div className="mt-1 text-[11px] text-[#717182]">
                Human-Led Steering
              </div>
            </div>

            <div className="rounded-md bg-[#FAFAFA] p-4 text-center">
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                AI Load
              </div>
              <div className="text-3xl tracking-tight">{results.aiExecutionLoad}%</div>
              <div className="mt-1 text-[11px] text-[#717182]">
                Execution Load
              </div>
            </div>

            <div className="rounded-md bg-[#FAFAFA] p-4 text-center">
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                CAI
              </div>
              <div className="text-3xl tracking-tight">{results.caiMultiplier}x</div>
              <div className="mt-1 text-[11px] text-[#717182]">
                Collaborative AI
              </div>
            </div>
          </div>

          <div className="border-t border-[rgba(0,0,0,0.06)] pt-8">
            {/* Strengths */}
            <div className="mb-6">
              <p className="mb-4 text-xl leading-relaxed">
                You are strong at <strong>{results.strengths.join(", ")}</strong>.
              </p>
            </div>

            {/* What You Do */}
            <div className="mb-6">
              <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">
                You:
              </div>
              <ul className="space-y-2">
                {results.actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2 text-[15px]">
                    <span className="text-[#717182]">−</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gaps */}
            <div className="mb-6">
              <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">
                But:
              </div>
              <ul className="space-y-2">
                {results.gaps.map((gap, index) => (
                  <li key={index} className="flex items-start gap-2 text-[15px]">
                    <span className="text-[#717182]">−</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verdict */}
            <div className="rounded-md bg-[#FAFAFA] p-6">
              <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">
                Net:
              </div>
              <p className="text-xl leading-relaxed">{results.verdict}</p>
            </div>
          </div>
        </Card>

        {/* Share Actions */}
        <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6">
          <div className="mb-4 text-center text-[13px] uppercase tracking-wider text-[#717182]">
            Share Your Results
          </div>

          {/* Copy Link */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 rounded-md border border-[rgba(0,0,0,0.12)] bg-[#FAFAFA] px-4 py-2 text-[13px] text-[#717182]"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-[13px] text-[#717182]">
            Want deeper insights and AI-organized project views?
          </p>
          <Button variant="outline" size="lg">
            Upgrade to Full Platform
          </Button>
        </div>
      </div>
    </div>
  );
}
