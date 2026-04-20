export type QuizResult = {
  slug: string;
  name: string;
  hook: string;
  summary: string;
  strengths: string[];
  risks: string[];
  shareTitle: string;
  shareDescription: string;
};

export type QuizOption = {
  label: string;
  result: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const QUIZ_RESULTS: QuizResult[] = [
  {
    slug: "architect",
    name: "Architect",
    hook: "You use AI best when you define the frame before the model touches the work.",
    summary:
      "Architects lead with structure, constraints, and intent. They are usually at their best when the task is ambiguous and the AI needs a strong operator setting the boundaries.",
    strengths: ["Strong framing", "Clear direction", "Good at preventing drift"],
    risks: ["Can over-design before testing", "May slow themselves down with too much setup"],
    shareTitle: "I got Architect on the AI Work Style Quiz",
    shareDescription: "High direction, high structure, low patience for vague AI output.",
  },
  {
    slug: "operator",
    name: "Operator",
    hook: "You treat AI like a useful junior teammate and care most about getting to shipped work.",
    summary:
      "Operators bias toward execution. They keep momentum, force decisions, and use AI to absorb mechanical work while staying focused on delivery.",
    strengths: ["Fast iteration", "High output", "Good at moving from draft to shipped work"],
    risks: ["Can under-document reasoning", "May accept decent output too early under pressure"],
    shareTitle: "I got Operator on the AI Work Style Quiz",
    shareDescription: "Execution-heavy, momentum-driven, and built for turning AI into output.",
  },
  {
    slug: "explorer",
    name: "Explorer",
    hook: "You use AI to widen the search space and discover possibilities other people miss.",
    summary:
      "Explorers get value from divergence. They use AI to surface options, patterns, and unexpected directions, then narrow after they have seen enough of the space.",
    strengths: ["High idea generation", "Strong research instinct", "Comfortable with ambiguity"],
    risks: ["Can wander too long", "Needs stronger criteria for convergence"],
    shareTitle: "I got Explorer on the AI Work Style Quiz",
    shareDescription: "Curious, wide-ranging, and strongest when AI is used to surface new paths.",
  },
  {
    slug: "synthesizer",
    name: "Synthesizer",
    hook: "You are strongest when the work requires compression, pattern recognition, and editorial judgment.",
    summary:
      "Synthesizers use AI to gather raw material, then turn it into coherent structure. They are often strongest in writing, analysis, and sense-making tasks where signal has to be separated from noise.",
    strengths: ["Strong editorial instinct", "Good pattern recognition", "High judgment on final form"],
    risks: ["Can hide too much process", "May rely on cleanup instead of upstream direction"],
    shareTitle: "I got Synthesizer on the AI Work Style Quiz",
    shareDescription: "Pattern-driven, editorial, and strongest when shaping noisy AI output into clarity.",
  },
  {
    slug: "ghostwriter-addict",
    name: "Ghostwriter Addict",
    hook: "You are getting speed from AI, but probably giving away too much authorship in the process.",
    summary:
      "This result does not mean you are bad at using AI. It means the system is doing too much of the visible thinking for you. The upside is speed. The downside is that your proof of contribution is weak unless you correct for it.",
    strengths: ["High speed", "Low friction to output", "Comfortable delegating drafts"],
    risks: ["Weak authorship signal", "Low visibility into judgment", "Easy to overclaim without evidence"],
    shareTitle: "I got Ghostwriter Addict on the AI Work Style Quiz",
    shareDescription: "Fast, delegative, and one step away from letting the model do too much of the thinking.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "start",
    prompt: "When you open AI for a real project, what do you usually do first?",
    options: [
      { label: "Write the frame, constraints, and desired outcome before asking for output.", result: "architect" },
      { label: "Get a fast draft moving, then improve it while momentum is high.", result: "operator" },
      { label: "Use it to explore options and see what directions are possible.", result: "explorer" },
      { label: "Drop in notes and source material so I can synthesize from there.", result: "synthesizer" },
      { label: "Ask it to draft the thing and see if I can use most of it.", result: "ghostwriter-addict" },
    ],
  },
  {
    id: "bad-output",
    prompt: "What do you do when the first answer is weak?",
    options: [
      { label: "Tighten the constraints and restate the target.", result: "architect" },
      { label: "Patch what matters and keep moving.", result: "operator" },
      { label: "Try a different angle or model and compare.", result: "explorer" },
      { label: "Pull out the useful pieces and rewrite the rest.", result: "synthesizer" },
      { label: "Accept it if it is good enough and edit lightly.", result: "ghostwriter-addict" },
    ],
  },
  {
    id: "best-use",
    prompt: "Where does AI help you the most?",
    options: [
      { label: "Turning a well-framed plan into components and drafts.", result: "architect" },
      { label: "Clearing repetitive execution and shipping faster.", result: "operator" },
      { label: "Finding new approaches I would not have seen alone.", result: "explorer" },
      { label: "Digesting complexity and shaping it into a coherent answer.", result: "synthesizer" },
      { label: "Writing whole sections so I do not have to start from scratch.", result: "ghostwriter-addict" },
    ],
  },
  {
    id: "proof",
    prompt: "What would be easiest for you to show someone after the work is done?",
    options: [
      { label: "My brief, structure, and the decisions I imposed on the system.", result: "architect" },
      { label: "The sequence of drafts that led to a shipped result.", result: "operator" },
      { label: "The branches I explored before converging on one direction.", result: "explorer" },
      { label: "How I turned scattered material into a final argument or artifact.", result: "synthesizer" },
      { label: "Mostly the final output, not much of the process.", result: "ghostwriter-addict" },
    ],
  },
  {
    id: "failure-mode",
    prompt: "Which failure mode sounds most like you?",
    options: [
      { label: "I can spend too long architecting the perfect frame.", result: "architect" },
      { label: "I can optimize for shipping so hard that I skip reflection.", result: "operator" },
      { label: "I can stay in exploration mode longer than I should.", result: "explorer" },
      { label: "I can over-index on polishing instead of shaping earlier.", result: "synthesizer" },
      { label: "I can let the model carry too much of the visible thinking.", result: "ghostwriter-addict" },
    ],
  },
  {
    id: "goal",
    prompt: "What do you actually want from AI over the long term?",
    options: [
      { label: "A tool that executes inside my structure.", result: "architect" },
      { label: "A force multiplier that helps me ship more.", result: "operator" },
      { label: "A discovery engine that expands what I can see.", result: "explorer" },
      { label: "A thinking partner that helps me compress and clarify.", result: "synthesizer" },
      { label: "A shortcut to first drafts and finished language.", result: "ghostwriter-addict" },
    ],
  },
];

export function getQuizResult(slug?: string) {
  return QUIZ_RESULTS.find((result) => result.slug === slug) || null;
}

export function computeQuizResult(answers: Record<string, string>) {
  const scores = new Map<string, number>();
  Object.values(answers).forEach((slug) => {
    scores.set(slug, (scores.get(slug) || 0) + 1);
  });

  return QUIZ_RESULTS.reduce((winner, result) => {
    const nextScore = scores.get(result.slug) || 0;
    const winnerScore = scores.get(winner.slug) || 0;
    return nextScore > winnerScore ? result : winner;
  }, QUIZ_RESULTS[0]);
}
