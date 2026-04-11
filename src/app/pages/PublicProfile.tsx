import { ExternalLink, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Link } from "react-router";

// Mock data - would come from API
const mockProfile = {
  name: "Alex Chen",
  username: "alexchen",
  tagline: "Builds systems using AI",
  verdict: "Strong execution, inconsistent structure",
  level: "ADVANCED–INTERMEDIATE",
  signals: {
    leadership: 87,
    aiExecution: 68,
    amplification: 4.37,
  },
  recentProofs: [
    {
      id: "proof_1",
      title: "Backend Architecture Migration",
      assessment: "Strong system design, heavy iteration",
      slug: "backend-arch-migration",
    },
    {
      id: "proof_2",
      title: "Mobile App Redesign",
      assessment: "Good execution, weak upfront constraints",
      slug: "mobile-redesign",
    },
    {
      id: "proof_3",
      title: "Security Audit",
      assessment: "High validation discipline",
      slug: "security-audit",
    },
  ],
  trend: [
    "Getting faster",
    "Still over-relying on iteration",
    "Structure improving, not consistent",
  ],
  stats: {
    projects: 8,
    conversations: 127,
    publishedProofs: 5,
  },
};

export default function PublicProfile() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-5xl tracking-tight">{mockProfile.name}</h1>
          <p className="mb-2 text-xl text-[#717182]">{mockProfile.tagline}</p>
          <p className="mb-6 text-lg">{mockProfile.verdict}</p>

          <div className="inline-block rounded-lg border-2 border-[var(--score-execution)] bg-[#FAFAFA] px-6 py-3">
            <div className="text-[11px] uppercase tracking-wider text-[#717182]">
              AI Operator Level
            </div>
            <div className="mt-1 text-2xl tracking-tight font-medium">
              {mockProfile.level}
            </div>
          </div>
        </div>

        {/* Signal Snapshot */}
        <Card className="mb-8 border border-[rgba(0,0,0,0.08)] bg-white p-8">
          <div className="mb-6 text-[13px] uppercase tracking-wider text-[#717182]">
            Signal Snapshot
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="mb-1 text-4xl tracking-tight">
                {mockProfile.signals.leadership}%
              </div>
              <div className="text-[13px] text-[#717182]">Leadership</div>
            </div>
            <div>
              <div className="mb-1 text-4xl tracking-tight">
                {mockProfile.signals.aiExecution}%
              </div>
              <div className="text-[13px] text-[#717182]">AI Execution</div>
            </div>
            <div>
              <div className="mb-1 text-4xl tracking-tight">
                {mockProfile.signals.amplification}x
              </div>
              <div className="text-[13px] text-[#717182]">Amplification</div>
            </div>
          </div>
        </Card>

        {/* Recent Proofs */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl tracking-tight">Recent Proofs</h2>
          <div className="space-y-3">
            {mockProfile.recentProofs.map((proof) => (
              <Link
                key={proof.id}
                to={`/@${mockProfile.username}/${proof.slug}`}
                className="group block"
              >
                <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-all hover:border-[rgba(0,0,0,0.2)] hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 text-lg font-medium tracking-tight group-hover:underline">
                        {proof.title}
                      </div>
                      <div className="text-[15px] text-[#717182]">
                        → {proof.assessment}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#717182] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Pattern Over Time */}
        <Card className="mb-8 border border-[rgba(0,0,0,0.08)] bg-white p-8">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <h2 className="text-2xl tracking-tight">Trend</h2>
          </div>
          <div className="space-y-3">
            {mockProfile.trend.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-[15px]">
                <span className="text-[#717182]">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Project Snapshot */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
            <div className="mb-1 text-3xl tracking-tight">
              {mockProfile.stats.projects}
            </div>
            <div className="text-[13px] text-[#717182]">Projects</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
            <div className="mb-1 text-3xl tracking-tight">
              {mockProfile.stats.conversations}
            </div>
            <div className="text-[13px] text-[#717182]">Conversations</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 text-center">
            <div className="mb-1 text-3xl tracking-tight">
              {mockProfile.stats.publishedProofs}
            </div>
            <div className="text-[13px] text-[#717182]">Published Proofs</div>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-[13px] text-[#717182]">
            Proof generated by Proof of AI Work
          </p>
          <Link
            to="/"
            className="text-[13px] text-[#030213] underline underline-offset-4 hover:text-[#717182]"
          >
            Create your own proof →
          </Link>
        </div>
      </div>
    </div>
  );
}
