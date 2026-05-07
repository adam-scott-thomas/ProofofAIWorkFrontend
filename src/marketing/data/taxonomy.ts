export type ArchetypeSlug =
  | "operator"
  | "architect"
  | "synthesizer"
  | "builder"
  | "investigator"
  | "director"
  | "editor"
  | "strategist"
  | "multiplier";

export type GlossarySlug =
  | "ai-work-sample"
  | "ai-leverage"
  | "proof-artifact"
  | "ai-skills-assessment"
  | "ai-assisted-workflow";

export type Capability = {
  slug: string;
  name: string;
  description: string;
};

export type GlossaryConcept = {
  slug: GlossarySlug;
  term: string;
  definition: string;
  whyItMatters: string;
  proofExample: string;
  relatedArchetypes: ArchetypeSlug[];
};

export type Archetype = {
  slug: ArchetypeSlug;
  name: string;
  meaning: string;
  strength: string;
  blindSpot: string;
  proofSignals: string[];
  bestFitRoles: string[];
  shareCardCopy: string;
  enterpriseInterpretation: string;
  relatedGlossary: GlossarySlug[];
  capabilities: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "prompting-and-instruction-design",
    name: "Prompting and Instruction Design",
    description: "Writing clear instructions, constraints, examples, and evaluation criteria for AI systems.",
  },
  {
    slug: "workflow-design",
    name: "Workflow Design",
    description: "Turning repeated work into structured AI-assisted processes.",
  },
  {
    slug: "research-and-synthesis",
    name: "Research and Synthesis",
    description: "Gathering, comparing, summarizing, and interpreting information.",
  },
  {
    slug: "content-and-communication",
    name: "Content and Communication",
    description: "Producing, editing, adapting, and improving written or visual communication.",
  },
  {
    slug: "automation-and-tool-building",
    name: "Automation and Tool Building",
    description: "Creating scripts, no-code workflows, agents, or internal tools.",
  },
  {
    slug: "data-and-analysis",
    name: "Data and Analysis",
    description: "Using AI to analyze datasets, reports, metrics, or business signals.",
  },
  {
    slug: "quality-review-and-verification",
    name: "Quality Review and Verification",
    description: "Checking AI-assisted work for accuracy, risk, completeness, and usefulness.",
  },
  {
    slug: "strategy-and-decision-support",
    name: "Strategy and Decision Support",
    description: "Using AI to clarify options, tradeoffs, priorities, and plans.",
  },
  {
    slug: "collaboration-and-delegation",
    name: "Collaboration and Delegation",
    description: "Coordinating human and AI work across tasks, teams, or tools.",
  },
  {
    slug: "enablement-and-training",
    name: "Enablement and Training",
    description: "Helping others adopt AI through guides, systems, coaching, or playbooks.",
  },
];

export const glossarySeedConcepts: GlossaryConcept[] = [
  {
    slug: "ai-work-sample",
    term: "AI work sample",
    definition:
      "A concrete piece of work that shows how someone used AI to produce, revise, check, or decide something.",
    whyItMatters:
      "A work sample is stronger than a resume keyword because it lets reviewers inspect the work pattern behind the claim.",
    proofExample: "A product brief with the prompt strategy, revision trail, and final decision criteria attached.",
    relatedArchetypes: ["operator", "editor", "synthesizer"],
  },
  {
    slug: "ai-leverage",
    term: "AI leverage",
    definition: "The practical lift AI gives a person or team in speed, quality, scope, judgment, or repeatability.",
    whyItMatters:
      "Leverage keeps the conversation grounded in better work outcomes instead of tool familiarity or hype.",
    proofExample: "A before-and-after workflow showing how a weekly research task became faster and easier to verify.",
    relatedArchetypes: ["architect", "strategist", "multiplier"],
  },
  {
    slug: "proof-artifact",
    term: "Proof artifact",
    definition:
      "A public-safe evidence object that demonstrates AI-assisted capability without exposing private source material.",
    whyItMatters:
      "Proof artifacts give hiring teams and collaborators something inspectable while preserving boundaries around private work.",
    proofExample: "A workflow map, evaluation record, prototype, or finished deliverable with context about the human role.",
    relatedArchetypes: ["builder", "investigator", "operator"],
  },
  {
    slug: "ai-skills-assessment",
    term: "AI skills assessment",
    definition:
      "A structured review of how someone directs, evaluates, and applies AI in real or realistic work situations.",
    whyItMatters:
      "Good assessment focuses on observable work behavior, not self-reported confidence or trivia about specific tools.",
    proofExample: "A role-specific work sample review with criteria for instruction quality, judgment, verification, and output.",
    relatedArchetypes: ["investigator", "director", "architect"],
  },
  {
    slug: "ai-assisted-workflow",
    term: "AI-assisted workflow",
    definition: "A repeatable process where human judgment and AI systems each have defined roles in producing work.",
    whyItMatters:
      "Workflows reveal whether AI usage is a one-off trick or a durable capability that can be repeated and reviewed.",
    proofExample: "A recruiting sourcing process that names inputs, prompts, review steps, escalation rules, and final outputs.",
    relatedArchetypes: ["architect", "director", "multiplier"],
  },
];

export const glossaryConceptInventory = [
  ...glossarySeedConcepts,
  { slug: "ai-capability", term: "AI capability" },
  { slug: "prompt-engineering", term: "Prompt engineering" },
  { slug: "human-in-the-loop-review", term: "Human-in-the-loop review" },
  { slug: "workflow-automation", term: "Workflow automation" },
  { slug: "ai-readiness", term: "AI readiness" },
] as const;

export const roleFamilies = [
  {
    slug: "go-to-market",
    name: "Go-to-Market",
    roles: ["Sales", "Marketing", "Growth", "Partnerships", "Customer success"],
  },
  {
    slug: "operations-and-administration",
    name: "Operations and Administration",
    roles: ["Operations", "RevOps", "BizOps", "Support ops", "Executive assistants"],
  },
  {
    slug: "product-and-technical",
    name: "Product and Technical",
    roles: ["Product managers", "Engineers", "Designers", "Data analysts", "Technical operators"],
  },
  {
    slug: "strategy-and-knowledge-work",
    name: "Strategy and Knowledge Work",
    roles: ["Consultants", "Analysts", "Researchers", "Finance", "Legal ops"],
  },
  {
    slug: "people-and-talent",
    name: "People and Talent",
    roles: ["Recruiters", "HR", "L&D", "Managers", "Workforce transformation teams"],
  },
];

export const proofArtifactTypes = [
  {
    slug: "finished-work-output",
    name: "Finished Work Output",
    description: "A completed deliverable created or improved with AI.",
  },
  {
    slug: "before-after-transformation",
    name: "Before/After Transformation",
    description: "Evidence showing how AI changed quality, speed, clarity, or scale.",
  },
  {
    slug: "workflow-or-process-map",
    name: "Workflow or Process Map",
    description: "A document showing the repeatable system behind the work.",
  },
  {
    slug: "tool-automation-or-prototype",
    name: "Tool, Automation, or Prototype",
    description: "A working script, agent, app, no-code flow, or prototype.",
  },
  {
    slug: "evaluation-or-decision-record",
    name: "Evaluation or Decision Record",
    description: "A record of reasoning, verification, tradeoffs, critique, or judgment.",
  },
];

export const archetypes: Archetype[] = [
  {
    slug: "operator",
    name: "Operator",
    meaning: "Turns AI assistance into finished work.",
    strength: "Execution velocity with enough structure to keep work moving.",
    blindSpot: "May optimize for output before the strategic question is clear.",
    proofSignals: ["Completed deliverables", "Before/after examples", "Repeatable task flows"],
    bestFitRoles: ["Operations", "Marketing", "Sales", "Support", "Recruiting"],
    shareCardCopy: "I use AI to move from idea to shipped work faster.",
    enterpriseInterpretation: "Strong execution signal for roles where throughput and accountable delivery matter.",
    relatedGlossary: ["ai-work-sample", "proof-artifact", "ai-leverage"],
    capabilities: ["workflow-design", "content-and-communication", "quality-review-and-verification"],
  },
  {
    slug: "architect",
    name: "Architect",
    meaning: "Designs systems, workflows, and reusable structures around AI.",
    strength: "Process design that makes AI useful more than once.",
    blindSpot: "Can over-systematize before the team has learned what actually repeats.",
    proofSignals: ["Workflow maps", "Templates", "Automations", "SOPs", "Agent instructions"],
    bestFitRoles: ["Product", "Operations", "Enablement", "RevOps", "Transformation"],
    shareCardCopy: "I build the systems that make AI useful repeatedly.",
    enterpriseInterpretation: "Useful for scaling AI adoption across teams without relying on individual improvisation.",
    relatedGlossary: ["ai-assisted-workflow", "ai-leverage", "ai-skills-assessment"],
    capabilities: ["workflow-design", "prompting-and-instruction-design", "collaboration-and-delegation"],
  },
  {
    slug: "synthesizer",
    name: "Synthesizer",
    meaning: "Turns messy information into clear decisions.",
    strength: "Sensemaking across sources, constraints, and competing interpretations.",
    blindSpot: "May spend too long gathering context before forcing a decision.",
    proofSignals: ["Research briefs", "Decision memos", "Competitive analysis", "Executive summaries"],
    bestFitRoles: ["Strategy", "Consulting", "Product", "Research", "Analyst roles"],
    shareCardCopy: "I use AI to turn noise into judgment.",
    enterpriseInterpretation: "Strong fit for analysis, planning, and executive communication work.",
    relatedGlossary: ["ai-work-sample", "ai-leverage", "proof-artifact"],
    capabilities: ["research-and-synthesis", "strategy-and-decision-support", "content-and-communication"],
  },
  {
    slug: "builder",
    name: "Builder",
    meaning: "Creates tools, prototypes, automations, and functional outputs.",
    strength: "Making practical things that others can test or use.",
    blindSpot: "May under-document the context, tradeoffs, or stakeholder requirements.",
    proofSignals: ["Demos", "Scripts", "No-code tools", "Internal apps", "Agents"],
    bestFitRoles: ["Engineering", "Product", "Operations", "Growth", "Analytics"],
    shareCardCopy: "I use AI to build working things, not just ideas.",
    enterpriseInterpretation: "Strong signal for practical AI implementation capability.",
    relatedGlossary: ["proof-artifact", "ai-assisted-workflow", "ai-leverage"],
    capabilities: ["automation-and-tool-building", "workflow-design", "data-and-analysis"],
  },
  {
    slug: "investigator",
    name: "Investigator",
    meaning: "Uses AI to test claims, find flaws, and improve reliability.",
    strength: "Scrutiny, verification, and careful risk review.",
    blindSpot: "Can slow momentum when every branch receives the same level of checking.",
    proofSignals: ["QA workflows", "Audit logs", "Red-team prompts", "Risk reviews"],
    bestFitRoles: ["Legal ops", "Compliance", "QA", "Research", "Security", "Finance"],
    shareCardCopy: "I use AI to pressure-test work before it matters.",
    enterpriseInterpretation: "Valuable for regulated, high-risk, or quality-sensitive functions.",
    relatedGlossary: ["ai-skills-assessment", "proof-artifact", "ai-work-sample"],
    capabilities: ["quality-review-and-verification", "research-and-synthesis", "data-and-analysis"],
  },
  {
    slug: "director",
    name: "Director",
    meaning: "Orchestrates people, tools, and AI systems toward an outcome.",
    strength: "Delegation, coordination, and review loops.",
    blindSpot: "May become too abstract from the details of execution.",
    proofSignals: ["Multi-tool workflows", "Review loops", "Project plans", "AI delegation trees"],
    bestFitRoles: ["Managers", "Producers", "Team leads", "Product managers", "Agency operators"],
    shareCardCopy: "I direct AI like a production system.",
    enterpriseInterpretation: "Strong fit for managers building AI-enabled teams.",
    relatedGlossary: ["ai-assisted-workflow", "ai-skills-assessment", "ai-leverage"],
    capabilities: ["collaboration-and-delegation", "workflow-design", "strategy-and-decision-support"],
  },
  {
    slug: "editor",
    name: "Editor",
    meaning: "Improves clarity, quality, taste, and correctness of AI-assisted work.",
    strength: "Refinement and standards for work that will be seen by others.",
    blindSpot: "May be less comfortable starting from a blank page or ambiguous brief.",
    proofSignals: ["Rewrite samples", "Quality rubrics", "Critique notes", "Editorial workflows"],
    bestFitRoles: ["Content", "Communications", "Brand", "Design", "Legal", "Customer success"],
    shareCardCopy: "I use AI to raise the quality bar, not lower it.",
    enterpriseInterpretation: "Strong quality-control signal for communication-heavy roles.",
    relatedGlossary: ["ai-work-sample", "proof-artifact", "ai-assisted-workflow"],
    capabilities: ["content-and-communication", "quality-review-and-verification", "prompting-and-instruction-design"],
  },
  {
    slug: "strategist",
    name: "Strategist",
    meaning: "Applies AI to choices about markets, products, teams, and priorities.",
    strength: "Judgment at the level of options, tradeoffs, and direction.",
    blindSpot: "Can be light on operational detail unless paired with execution proof.",
    proofSignals: ["Strategic plans", "Scenario models", "Market maps", "Prioritization docs"],
    bestFitRoles: ["Executives", "Product leaders", "Consultants", "Founders", "GTM leaders"],
    shareCardCopy: "I use AI to make better decisions at higher altitude.",
    enterpriseInterpretation: "Useful for leadership, planning, and business transformation contexts.",
    relatedGlossary: ["ai-leverage", "ai-skills-assessment", "proof-artifact"],
    capabilities: ["strategy-and-decision-support", "research-and-synthesis", "data-and-analysis"],
  },
  {
    slug: "multiplier",
    name: "Multiplier",
    meaning: "Helps other people become more capable with AI.",
    strength: "Enablement that turns individual tool use into shared capability.",
    blindSpot: "May focus on teaching the system before enough proof exists that it works.",
    proofSignals: ["Training docs", "Playbooks", "Workshops", "Team adoption materials"],
    bestFitRoles: ["Enablement", "L&D", "Managers", "Consultants", "Community", "HR"],
    shareCardCopy: "I help people turn AI from tool into capability.",
    enterpriseInterpretation: "Strong fit for workforce amplification and adoption programs.",
    relatedGlossary: ["ai-assisted-workflow", "ai-leverage", "ai-skills-assessment"],
    capabilities: ["enablement-and-training", "collaboration-and-delegation", "workflow-design"],
  },
];

export function getArchetype(slug: string | undefined) {
  return archetypes.find((archetype) => archetype.slug === slug);
}

export function getGlossaryConcept(slug: string | undefined) {
  return glossarySeedConcepts.find((concept) => concept.slug === slug);
}

export function getGlossaryConceptBySlug(slug: GlossarySlug) {
  return glossarySeedConcepts.find((concept) => concept.slug === slug);
}
