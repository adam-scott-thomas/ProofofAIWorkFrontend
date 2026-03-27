import { ExternalLink, Shield, CheckCircle2, Calendar, User as UserIcon } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const mockPublicProof = {
  projectName: "Backend Architecture Migration",
  userName: "Alex Chen",
  userHandle: "@alexchen",
  evaluatedAt: "2026-03-20T14:32:00Z",
  slug: "backend-arch-migration-alex-chen",
  
  workProfile: {
    human_leadership_score: 89,
    hls_dimensions: {
      goal_origination: 94,
      constraint_setting: 90,
      decision_control: 87,
      correction_pressure: 83,
      strategic_pivots: 92,
      final_ownership: 88,
    },
    ai_execution_load: 0.71,
    cai: 456,
    cai_dimensions: {
      complexity_ceiling: 91,
      iteration_depth: 93,
      velocity: 85,
      domain_span: 79,
      throughput: 88,
      leverage_maturity: 91,
    },
    confidence: "high" as const,
    archetype: {
      primary: "Architect",
      secondary: ["Craftsman"],
    },
    narrative: "Demonstrates exceptional technical leadership in complex system migration. Strong pattern of breaking down architectural decisions into clear constraints while delegating implementation details. Shows sophisticated understanding of distributed systems patterns and event-driven architecture. Leadership style balances strategic vision with tactical execution oversight. Velocity metrics indicate 2.8x faster completion compared to baseline while maintaining complexity ceiling in 91st percentile.",
  },
  
  evidence: {
    rejected_drafts: 52,
    constructive_revisions: 89,
    strategic_pivots: 14,
    validated_domains: ["system-architecture", "microservices", "event-driven", "devops"],
    velocity_days: 7.8,
    velocity_baseline_days: 21.8,
    complexity_percentile: 91,
    accepted_artifacts: 38,
  },
  
  integrity: {
    verified: true,
    hashChain: "sha256:a3f5...2c9d",
    timestamp: "2026-03-24T14:05:00Z",
  },
  
  projectDescription: "Migration from monolithic architecture to microservices with event-driven patterns using Kafka, implementing circuit breakers, observability, and zero-downtime deployment strategies.",
  conversationCount: 18,
  turnCount: 342,
};

function DimensionBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[13px]">
        <span className="text-[#3A3A3A]">{label}</span>
        <span className="font-mono text-[#717182]">{value}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#F5F5F7]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function PublicProofPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="mx-auto max-w-5xl px-8 py-6">
          <div className="mb-4 flex items-center gap-2 text-[13px] text-[#717182]">
            <span>Proof of AI Work</span>
            <span>•</span>
            <span className="font-mono">poaw.io/p/{mockPublicProof.slug}</span>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="mb-2 text-2xl tracking-tight">{mockPublicProof.projectName}</h1>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-[#717182]" />
                  <span className="text-[14px]">{mockPublicProof.userName}</span>
                  <span className="text-[13px] text-[#717182]">{mockPublicProof.userHandle}</span>
                </div>
                <span className="text-[#717182]">•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#717182]" />
                  <span className="text-[13px] text-[#717182]">
                    {new Date(mockPublicProof.evaluatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <p className="text-[14px] text-[#717182] leading-relaxed">
                {mockPublicProof.projectDescription}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {mockPublicProof.workProfile.confidence.toUpperCase()} CONFIDENCE
              </Badge>
              {mockPublicProof.integrity.verified && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Shield className="mr-1 h-3 w-3" />
                  VERIFIED
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-8 py-12">
        {/* Three Scores - The Money Shot */}
        <Card className="mb-12 border border-[rgba(0,0,0,0.08)] bg-white p-10 shadow-sm">
          <div className="mb-2 text-center text-[13px] uppercase tracking-wider text-[#717182]">
            AI Work Profile
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-3 text-[13px] text-[#717182]">Human Leadership Score</div>
              <div className="mb-2 text-8xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-hls)' }}>
                {mockPublicProof.workProfile.human_leadership_score}
              </div>
              <div className="text-[13px] text-[#717182]">of 100</div>
            </div>

            <div className="border-x border-[rgba(0,0,0,0.06)] text-center">
              <div className="mb-3 text-[13px] text-[#717182]">AI Execution Load</div>
              <div className="mb-2 text-8xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-execution)' }}>
                {(mockPublicProof.workProfile.ai_execution_load * 100).toFixed(0)}%
              </div>
              <div className="text-[13px] text-[#717182]">delegation rate</div>
            </div>

            <div className="text-center">
              <div className="mb-3 text-[13px] text-[#717182]">Cognitive Amplification Index</div>
              <div className="mb-2 text-9xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-cai)' }}>
                {mockPublicProof.workProfile.cai}
              </div>
              <div className="text-[13px] text-[#717182]">capacity increase</div>
            </div>
          </div>

          {/* Archetype */}
          <div className="mt-10 flex items-center justify-center gap-3 border-t border-[rgba(0,0,0,0.06)] pt-8">
            <div className="text-[13px] uppercase tracking-wider text-[#717182]">Archetype</div>
            <div className="rounded-sm bg-[#F5F5F7] px-4 py-2 font-mono text-[15px] tracking-tight">
              {mockPublicProof.workProfile.archetype.primary}
            </div>
            {mockPublicProof.workProfile.archetype.secondary.map((arch) => (
              <div key={arch} className="rounded-sm bg-[#F5F5F7] px-4 py-2 font-mono text-[15px] tracking-tight text-[#717182]">
                {arch}
              </div>
            ))}
          </div>
        </Card>

        {/* Narrative Interpretation */}
        <Card className="mb-12 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-4 text-[13px] uppercase tracking-wider text-[#717182]">
            What We Observed
          </div>
          <p className="text-[16px] leading-relaxed text-[#3A3A3A]">
            {mockPublicProof.workProfile.narrative}
          </p>
        </Card>

        {/* Evidence Grid */}
        <Card className="mb-12 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-6 text-[13px] uppercase tracking-wider text-[#717182]">
            Evidence Trail
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Rejected Drafts
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.rejected_drafts}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Constructive Revisions
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.constructive_revisions}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Strategic Pivots
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.strategic_pivots}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Accepted Artifacts
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.accepted_artifacts}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Velocity (Days)
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.velocity_days}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Baseline (Days)
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.velocity_baseline_days}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Complexity Percentile
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.evidence.complexity_percentile}th</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">
                Conversations
              </div>
              <div className="text-3xl tracking-tight">{mockPublicProof.conversationCount}</div>
            </div>
          </div>
          <div className="mt-8 border-t border-[rgba(0,0,0,0.06)] pt-6">
            <div className="mb-3 text-[11px] uppercase tracking-wider text-[#717182]">
              Validated Domains
            </div>
            <div className="flex flex-wrap gap-2">
              {mockPublicProof.evidence.validated_domains.map((domain) => (
                <Badge key={domain} variant="outline" className="border-[rgba(0,0,0,0.08)] font-mono text-[13px] px-3 py-1">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Dimension Breakdowns */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {/* HLS Dimensions */}
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-4 text-[13px] uppercase tracking-wider text-[#717182]">
              Human Leadership Dimensions
            </div>
            <div className="space-y-4">
              <DimensionBar label="Goal Origination" value={mockPublicProof.workProfile.hls_dimensions.goal_origination} />
              <DimensionBar label="Constraint Setting" value={mockPublicProof.workProfile.hls_dimensions.constraint_setting} />
              <DimensionBar label="Decision Control" value={mockPublicProof.workProfile.hls_dimensions.decision_control} />
              <DimensionBar label="Correction Pressure" value={mockPublicProof.workProfile.hls_dimensions.correction_pressure} />
              <DimensionBar label="Strategic Pivots" value={mockPublicProof.workProfile.hls_dimensions.strategic_pivots} />
              <DimensionBar label="Final Ownership" value={mockPublicProof.workProfile.hls_dimensions.final_ownership} />
            </div>
          </Card>

          {/* CAI Dimensions */}
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-4 text-[13px] uppercase tracking-wider text-[#717182]">
              CAI Dimensions
            </div>
            <div className="space-y-4">
              <DimensionBar label="Complexity Ceiling" value={mockPublicProof.workProfile.cai_dimensions.complexity_ceiling} />
              <DimensionBar label="Iteration Depth" value={mockPublicProof.workProfile.cai_dimensions.iteration_depth} />
              <DimensionBar label="Velocity" value={mockPublicProof.workProfile.cai_dimensions.velocity} />
              <DimensionBar label="Domain Span" value={mockPublicProof.workProfile.cai_dimensions.domain_span} />
              <DimensionBar label="Throughput" value={mockPublicProof.workProfile.cai_dimensions.throughput} />
              <DimensionBar label="Leverage Maturity" value={mockPublicProof.workProfile.cai_dimensions.leverage_maturity} />
            </div>
          </Card>
        </div>

        {/* Integrity Verification */}
        <Card className="border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-[15px] text-blue-900">Integrity Verification</h3>
              <p className="mb-3 text-[13px] text-blue-800">
                This proof page is cryptographically verified and timestamped. All conversation data
                has been hashed and recorded in an immutable chain.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-blue-700">Hash Chain</div>
                  <div className="font-mono text-[12px] text-blue-900">{mockPublicProof.integrity.hashChain}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-blue-700">Timestamp</div>
                  <div className="font-mono text-[12px] text-blue-900">
                    {new Date(mockPublicProof.integrity.timestamp).toISOString()}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Verify
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-12 border-t border-[rgba(0,0,0,0.08)] pt-8 text-center">
          <p className="mb-3 text-[13px] text-[#717182]">
            This proof page was generated by Proof of AI Work
          </p>
          <Button variant="outline">
            Learn More About PoAW
          </Button>
        </div>
      </div>
    </div>
  );
}