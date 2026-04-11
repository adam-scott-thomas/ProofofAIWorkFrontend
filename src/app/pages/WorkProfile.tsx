import { Download, Share2, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useState } from "react";
import { ShareDialog } from "../components/ShareDialog";

const mockWorkProfile = {
  human_leadership_score: 87,
  hls_dimensions: {
    goal_origination: 92,
    constraint_setting: 88,
    decision_control: 85,
    correction_pressure: 81,
    strategic_pivots: 90,
    final_ownership: 84,
  },
  ai_execution_load: 0.68,
  cai: 437,
  cai_dimensions: {
    complexity_ceiling: 88,
    iteration_depth: 91,
    velocity: 82,
    domain_span: 76,
    throughput: 85,
    leverage_maturity: 89,
  },
  confidence: "high" as const,
  confidence_rationale: [
    "Sufficient conversation volume across multiple domains",
    "Consistent behavioral patterns across projects",
    "Clear evidence of iterative refinement and strategic pivots",
    "Multiple completed projects with ship proof",
  ],
  integrity: {
    manipulation_likelihood: "low",
    flags: [],
    adjustments: [],
  },
  evidence: {
    rejected_drafts: 47,
    constructive_revisions: 82,
    strategic_pivots: 12,
    validated_domains: ["frontend-engineering", "ui-design", "system-architecture", "data-engineering"],
    velocity_days: 8.2,
    velocity_baseline_days: 21.5,
    complexity_percentile: 88,
    accepted_artifacts: 34,
    correction_cost_trend: "decreasing",
    prompt_sophistication_gain: 0.73,
  },
  archetype: {
    primary: "Architect",
    secondary: ["Delegator", "Craftsman"],
  },
  narrative: "Demonstrates exceptional ability to frame complex problems and guide AI toward strategic outcomes. Strong pattern of setting clear constraints while allowing flexibility in execution. Shows sophisticated prompt engineering with iterative refinement. Leadership style balances high-level direction with tactical course correction. Operates comfortably across multiple technical domains with consistent quality. Velocity metrics indicate 2.6x faster task completion compared to baseline while maintaining complexity ceiling in 88th percentile. Evidence suggests mature understanding of AI capabilities and limitations.",
  evaluated_at: "2026-03-20T14:32:00Z",
  project_count: 8,
  conversation_count: 127,
};

function DimensionBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[13px]">
        <span className="text-[#3A3A3A]">{label}</span>
        <span className="font-mono text-[#717182]">{value}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#F5F5F7]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function EvidenceItem({ label, value, trend }: { label: string; value: string | number; trend?: 'up' | 'down' }) {
  return (
    <div className="rounded-sm border border-[rgba(0,0,0,0.06)] bg-white p-4">
      <div className="mb-1 text-[11px] uppercase tracking-wider text-[#717182]">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl tracking-tight">{value}</div>
        {trend && (
          <TrendingUp
            className={`h-4 w-4 ${trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`}
          />
        )}
      </div>
    </div>
  );
}

export default function WorkProfile() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const shareData = {
    name: "Alex Chen",
    handle: "@alexchen",
    hlsScore: mockWorkProfile.human_leadership_score,
    aelScore: Math.round(mockWorkProfile.ai_execution_load * 100),
    caiScore: mockWorkProfile.cai,
    proofUrl: "https://proofofaiwork.com/p/alexchen-q1-2026",
    conversationCount: 127,
    date: "Mar 27, 2026",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Work Profile</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Your verified AI work capacity across all projects
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-8 py-8">
        {/* Verdict */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xl leading-relaxed text-[#3A3A3A]">
                You are operating at a high level — but not consistently.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#717182]">
                You design well and execute fast, but your process lacks structure.
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {mockWorkProfile.confidence.toUpperCase()} CONFIDENCE
            </Badge>
          </div>
          <div className="border-t border-[rgba(0,0,0,0.06)] pt-4">
            <div className="text-[13px] text-[#717182]">
              Based on {mockWorkProfile.project_count} projects, {mockWorkProfile.conversation_count} conversations • Evaluated {new Date(mockWorkProfile.evaluated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </Card>

        {/* Strengths */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="mb-1 text-[15px]">Strengths</h3>
          </div>
          <ul className="space-y-3 text-[15px] leading-relaxed text-[#3A3A3A]">
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Exceptional ability to frame complex problems and guide AI toward strategic outcomes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Strong pattern of setting clear constraints while allowing flexibility in execution</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Sophisticated prompt engineering with iterative refinement</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Operates comfortably across multiple technical domains with consistent quality</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>2.6x faster task completion compared to baseline while maintaining complexity ceiling in 88th percentile</span>
            </li>
          </ul>
        </Card>

        {/* Gaps */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="mb-1 text-[15px]">Gaps</h3>
          </div>
          <ul className="space-y-3 text-[15px] leading-relaxed text-[#3A3A3A]">
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>You start fast without defining constraints, which leads to extra iterations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Your workflow lacks consistency and upfront structure</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#717182]">•</span>
              <span>Output quality varies by session rather than being systematically repeatable</span>
            </li>
          </ul>
        </Card>

        {/* Signals (Main Metrics) */}
        <Card className="mb-8 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="mb-1 text-[15px]">Signals</h3>
            <p className="text-[13px] text-[#717182]">
              The three core metrics that define your AI work profile
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-hls)' }}>
                  {mockWorkProfile.human_leadership_score}
                </div>
                <div className="text-[13px] text-[#717182]">Human Leadership</div>
              </div>
              <div className="pt-2">
                <p className="text-[15px] leading-relaxed text-[#3A3A3A]">
                  You maintain strong strategic control and originate goals independently. High decision control across projects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 border-t border-[rgba(0,0,0,0.06)] pt-6">
              <div className="flex-shrink-0">
                <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-execution)' }}>
                  {(mockWorkProfile.ai_execution_load * 100).toFixed(0)}%
                </div>
                <div className="text-[13px] text-[#717182]">AI Execution Load</div>
              </div>
              <div className="pt-2">
                <p className="text-[15px] leading-relaxed text-[#3A3A3A]">
                  You delegate heavily to AI for execution while keeping control of direction. High leverage, moderate risk.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 border-t border-[rgba(0,0,0,0.06)] pt-6">
              <div className="flex-shrink-0">
                <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-cai)' }}>
                  {mockWorkProfile.cai}
                </div>
                <div className="text-[13px] text-[#717182]">Cognitive Amplification</div>
              </div>
              <div className="pt-2">
                <p className="text-[15px] leading-relaxed text-[#3A3A3A]">
                  You significantly extend your output capacity using AI. 2.6x velocity increase with maintained complexity ceiling.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Signals (for nerds) */}
        <details className="mb-8">
          <summary className="mb-6 cursor-pointer text-[15px] text-[#717182] hover:text-[#3A3A3A]">
            Detailed Signals (for nerds) →
          </summary>

          <div className="space-y-6 pl-4">
            {/* HLS Dimensions */}
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="mb-1 text-[15px]">Human Leadership Score Breakdown</h3>
                <p className="text-[13px] text-[#717182]">
                  Six dimensions measuring human control and strategic direction
                </p>
              </div>
              <div className="space-y-4">
                <DimensionBar label="Goal Origination" value={mockWorkProfile.hls_dimensions.goal_origination} />
                <DimensionBar label="Constraint Setting" value={mockWorkProfile.hls_dimensions.constraint_setting} />
                <DimensionBar label="Decision Control" value={mockWorkProfile.hls_dimensions.decision_control} />
                <DimensionBar label="Correction Pressure" value={mockWorkProfile.hls_dimensions.correction_pressure} />
                <DimensionBar label="Strategic Pivots" value={mockWorkProfile.hls_dimensions.strategic_pivots} />
                <DimensionBar label="Final Ownership" value={mockWorkProfile.hls_dimensions.final_ownership} />
              </div>
            </Card>

            {/* CAI Dimensions */}
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="mb-1 text-[15px]">CAI Dimensions</h3>
                <p className="text-[13px] text-[#717182]">
                  Six factors contributing to cognitive capacity amplification
                </p>
              </div>
              <div className="space-y-4">
                <DimensionBar label="Complexity Ceiling" value={mockWorkProfile.cai_dimensions.complexity_ceiling} />
                <DimensionBar label="Iteration Depth" value={mockWorkProfile.cai_dimensions.iteration_depth} />
                <DimensionBar label="Velocity" value={mockWorkProfile.cai_dimensions.velocity} />
                <DimensionBar label="Domain Span" value={mockWorkProfile.cai_dimensions.domain_span} />
                <DimensionBar label="Throughput" value={mockWorkProfile.cai_dimensions.throughput} />
                <DimensionBar label="Leverage Maturity" value={mockWorkProfile.cai_dimensions.leverage_maturity} />
              </div>
            </Card>

            {/* Evidence Grid */}
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h3 className="mb-1 text-[15px]">Evidence Trail</h3>
                <p className="text-[13px] text-[#717182]">
                  Quantified observations from conversation analysis
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <EvidenceItem label="Rejected Drafts" value={mockWorkProfile.evidence.rejected_drafts} />
                <EvidenceItem label="Constructive Revisions" value={mockWorkProfile.evidence.constructive_revisions} />
                <EvidenceItem label="Strategic Pivots" value={mockWorkProfile.evidence.strategic_pivots} />
                <EvidenceItem label="Accepted Artifacts" value={mockWorkProfile.evidence.accepted_artifacts} />
                <EvidenceItem label="Velocity (Days)" value={mockWorkProfile.evidence.velocity_days} trend="up" />
                <EvidenceItem label="Baseline (Days)" value={mockWorkProfile.evidence.velocity_baseline_days} />
                <EvidenceItem label="Complexity %ile" value={`${mockWorkProfile.evidence.complexity_percentile}th`} />
                <EvidenceItem label="Prompt Sophistication" value={`+${(mockWorkProfile.evidence.prompt_sophistication_gain * 100).toFixed(0)}%`} trend="up" />
              </div>
              <div className="mt-6 border-t border-[rgba(0,0,0,0.06)] pt-6">
                <div className="mb-2 text-[13px] uppercase tracking-wider text-[#717182]">Validated Domains</div>
                <div className="flex flex-wrap gap-2">
                  {mockWorkProfile.evidence.validated_domains.map((domain) => (
                    <Badge key={domain} variant="outline" className="border-[rgba(0,0,0,0.08)] font-mono text-[12px]">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </details>

        {/* Confidence & Integrity */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <h3 className="text-[15px]">Confidence Rationale</h3>
            </div>
            <ul className="space-y-2">
              {mockWorkProfile.confidence_rationale.map((reason, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-[#3A3A3A]">
                  <span className="text-[#717182]">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-[15px]">Integrity Check</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] text-[#717182]">Manipulation Likelihood</div>
                <Badge variant="secondary" className="mt-1 bg-green-50 text-green-700 border-green-200">
                  {mockWorkProfile.integrity.manipulation_likelihood.toUpperCase()}
                </Badge>
              </div>
              {mockWorkProfile.integrity.flags.length === 0 && (
                <div className="rounded-sm bg-green-50 px-3 py-2 text-[13px] text-green-800">
                  No integrity flags detected
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={shareData} />
    </div>
  );
}