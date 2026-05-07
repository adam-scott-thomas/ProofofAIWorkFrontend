import type { ArchetypeSlug, GlossarySlug } from "./taxonomy";

export type RoleLeverageSlug = "product-managers" | "recruiters" | "marketers";
export type ComparisonSlug = "ai-skills-assessments-vs-work-samples" | "resume-screening-vs-proof-of-work";

export type RoleLeveragePage = {
  slug: RoleLeverageSlug;
  role: string;
  title: string;
  description: string;
  promise: string;
  workPatterns: string[];
  proofSignals: string[];
  weakSignals: string[];
  relatedArchetypes: ArchetypeSlug[];
  relatedGlossary: GlossarySlug[];
  enterpriseUse: string;
};

export type ComparisonPage = {
  slug: ComparisonSlug;
  title: string;
  description: string;
  framing: string;
  bestFor: Array<{ label: string; value: string }>;
  limits: Array<{ label: string; value: string }>;
  proofOfWorkAdvantage: string[];
  relatedGlossary: GlossarySlug[];
  relatedArchetypes: ArchetypeSlug[];
};

export const roleLeveragePages: RoleLeveragePage[] = [
  {
    slug: "product-managers",
    role: "Product managers",
    title: "AI leverage for product managers",
    description:
      "How product managers can use AI to improve discovery, synthesis, prioritization, specs, and decision records.",
    promise:
      "Product AI leverage shows up when a PM can turn ambiguous inputs into clearer product choices, better artifacts, and more inspectable reasoning.",
    workPatterns: [
      "Synthesizing customer feedback, support notes, usage signals, and stakeholder requests into a decision memo.",
      "Drafting product requirements with explicit assumptions, constraints, edge cases, and acceptance criteria.",
      "Comparing roadmap options by tradeoff, risk, dependency, user value, and evidence quality.",
      "Creating review loops that separate AI-generated draft material from human product judgment.",
    ],
    proofSignals: [
      "Decision records that name alternatives and rejected paths.",
      "Before/after product briefs with clearer scope, risks, and acceptance criteria.",
      "Research synthesis artifacts that cite source categories and uncertainty.",
      "Workflow maps for recurring discovery, spec, or launch planning work.",
    ],
    weakSignals: [
      "A polished PRD with no evidence of judgment or source interpretation.",
      "Generic prompt screenshots that do not connect to a product decision.",
      "Claims about speed without showing what became clearer or easier to review.",
    ],
    relatedArchetypes: ["synthesizer", "architect", "strategist", "director"],
    relatedGlossary: ["ai-leverage", "ai-work-sample", "ai-assisted-workflow", "proof-artifact"],
    enterpriseUse:
      "For hiring or calibration, ask PMs to bring an AI-assisted product artifact and explain what the model drafted, what they changed, and which decision criteria mattered.",
  },
  {
    slug: "recruiters",
    role: "Recruiters",
    title: "AI leverage for recruiters",
    description:
      "How recruiters can use AI for sourcing, candidate research, outreach, intake, and evidence-based hiring support.",
    promise:
      "Recruiting AI leverage is strongest when it improves role understanding, candidate evidence review, and communication quality without replacing accountable human judgment.",
    workPatterns: [
      "Turning hiring manager intake notes into structured role criteria and screening questions.",
      "Researching candidate backgrounds against role requirements without reducing people to keyword matches.",
      "Drafting outreach that is specific to the role, candidate context, and actual evidence.",
      "Building repeatable review checklists for AI work samples and proof artifacts.",
    ],
    proofSignals: [
      "Role intake summaries that separate requirements, preferences, and open questions.",
      "Candidate evidence notes tied to public work, proof artifacts, or portfolio examples.",
      "Outreach variants with rationale and human review notes.",
      "Structured hiring rubrics that keep final decisions with the hiring team.",
    ],
    weakSignals: [
      "Keyword-matched candidate lists with no review criteria.",
      "Automated outreach that ignores candidate context.",
      "Claims that AI can remove hiring risk or make final decisions.",
    ],
    relatedArchetypes: ["investigator", "director", "multiplier", "editor"],
    relatedGlossary: ["ai-skills-assessment", "ai-work-sample", "proof-artifact", "ai-assisted-workflow"],
    enterpriseUse:
      "Recruiting teams can use ProofOfAIWork language to request better candidate evidence, standardize work-sample review, and document human evaluation criteria.",
  },
  {
    slug: "marketers",
    role: "Marketers",
    title: "AI leverage for marketers",
    description:
      "How marketers can use AI to improve research, positioning, content systems, campaign planning, and review workflows.",
    promise:
      "Marketing AI leverage is not volume alone. The stronger signal is whether AI helps the marketer understand the audience, sharpen the message, and ship better reviewed work.",
    workPatterns: [
      "Turning customer, market, and sales inputs into positioning notes or campaign briefs.",
      "Creating content variants from a shared strategy while preserving audience and channel fit.",
      "Reviewing AI-assisted copy against claims, proof, tone, and compliance constraints.",
      "Building reusable workflows for research, briefing, drafting, editing, and performance analysis.",
    ],
    proofSignals: [
      "Campaign briefs that show audience assumptions, message options, and review criteria.",
      "Before/after copy examples with the reason for each revision.",
      "Content workflow maps that define human checkpoints.",
      "Analysis notes connecting performance data to next decisions.",
    ],
    weakSignals: [
      "High content volume with no strategy or review trail.",
      "Generic copy that could fit any product or audience.",
      "Unsupported claims, fake urgency, or invented customer evidence.",
    ],
    relatedArchetypes: ["operator", "editor", "synthesizer", "strategist"],
    relatedGlossary: ["ai-leverage", "ai-work-sample", "proof-artifact", "ai-assisted-workflow"],
    enterpriseUse:
      "Marketing leaders can evaluate AI capability by reviewing briefs, revision trails, claims discipline, and repeatable content workflows rather than asking for tool fluency alone.",
  },
];

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "ai-skills-assessments-vs-work-samples",
    title: "AI skills assessments vs work samples",
    description:
      "A practical comparison of AI skills assessments and AI work samples for hiring, evaluation, and workforce development.",
    framing:
      "AI skills assessments can create structure. Work samples create evidence. The strongest evaluation systems use structured criteria to review real or realistic work.",
    bestFor: [
      { label: "AI skills assessments", value: "Consistent prompts, baseline comparisons, and early screening structure." },
      { label: "AI work samples", value: "Inspecting judgment, process, revisions, artifacts, and role-specific execution." },
    ],
    limits: [
      { label: "AI skills assessments", value: "Can become tool trivia or artificial tasks if not tied to real work." },
      { label: "AI work samples", value: "Need clear review criteria so evaluators do not overvalue polish alone." },
    ],
    proofOfWorkAdvantage: [
      "Shows how the person used AI in context, not just whether they know terminology.",
      "Makes revision, verification, and judgment visible.",
      "Supports human-reviewed hiring decisions with better evidence.",
      "Can be reused for portfolios, internal mobility, and team capability mapping.",
    ],
    relatedGlossary: ["ai-skills-assessment", "ai-work-sample", "proof-artifact", "ai-assisted-workflow"],
    relatedArchetypes: ["investigator", "architect", "operator", "editor"],
  },
  {
    slug: "resume-screening-vs-proof-of-work",
    title: "Resume screening vs proof of work",
    description:
      "Why resume screening is a weak signal for AI capability and how proof-of-work artifacts create a clearer review surface.",
    framing:
      "Resumes summarize claims. Proof-of-work artifacts show evidence. For AI capability, the difference matters because tool names alone do not show judgment, direction, or verification.",
    bestFor: [
      { label: "Resume screening", value: "Understanding career history, domain context, and baseline qualifications." },
      { label: "Proof of work", value: "Reviewing demonstrated capability through artifacts, decisions, and work patterns." },
    ],
    limits: [
      { label: "Resume screening", value: "Often rewards keywords and polished claims more than inspectable AI work behavior." },
      { label: "Proof of work", value: "Requires reviewers to know what signals to inspect and what private data to exclude." },
    ],
    proofOfWorkAdvantage: [
      "Connects AI claims to specific artifacts.",
      "Shows the human role in directing, checking, and improving AI output.",
      "Creates a better interview starting point than generic AI experience claims.",
      "Supports fairer review by focusing discussion on observable work.",
    ],
    relatedGlossary: ["proof-artifact", "ai-work-sample", "ai-skills-assessment", "ai-leverage"],
    relatedArchetypes: ["operator", "synthesizer", "builder", "investigator"],
  },
];

export function getRoleLeveragePage(slug: string | undefined) {
  return roleLeveragePages.find((page) => page.slug === slug);
}

export function getComparisonPage(slug: string | undefined) {
  return comparisonPages.find((page) => page.slug === slug);
}
