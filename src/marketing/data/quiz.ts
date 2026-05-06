export type QuizChoice = {
  label: string;
  points: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
};

export type QuizDefinition = {
  slug: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

const sharedQuestions: QuizQuestion[] = [
  {
    id: "framing",
    prompt: "When starting a new AI-assisted task, what do you usually do first?",
    choices: [
      { label: "Define the goal, constraints, and evidence I need before prompting.", points: 10 },
      { label: "Draft a prompt and adjust once I see the first response.", points: 7 },
      { label: "Ask AI for ideas and decide direction from there.", points: 5 },
      { label: "Use a saved prompt and hope it fits the task.", points: 2 },
    ],
  },
  {
    id: "ownership",
    prompt: "How do you handle AI suggestions that sound confident but may be wrong?",
    choices: [
      { label: "Check sources, assumptions, and edge cases before using them.", points: 10 },
      { label: "Rewrite them in my own words and spot-check important parts.", points: 7 },
      { label: "Use them if they match what I expected.", points: 4 },
      { label: "Trust the output unless it obviously fails.", points: 1 },
    ],
  },
  {
    id: "decomposition",
    prompt: "How often do you break complex work into smaller AI-assisted steps?",
    choices: [
      { label: "Nearly always; I use checkpoints and compare options.", points: 10 },
      { label: "Often, especially when quality matters.", points: 8 },
      { label: "Sometimes, when the first answer is weak.", points: 5 },
      { label: "Rarely; I prefer one broad prompt.", points: 2 },
    ],
  },
  {
    id: "verification",
    prompt: "What kind of evidence do you keep from AI work sessions?",
    choices: [
      { label: "Transcript, decisions, revisions, sources, and final output.", points: 10 },
      { label: "Transcript and final output.", points: 7 },
      { label: "Only the final output.", points: 3 },
      { label: "I do not usually keep evidence.", points: 1 },
    ],
  },
  {
    id: "iteration",
    prompt: "What best describes your iteration pattern?",
    choices: [
      { label: "I compare alternatives, test assumptions, and refine with intent.", points: 10 },
      { label: "I ask for revisions until the result feels useful.", points: 7 },
      { label: "I make a few edits manually after the first answer.", points: 5 },
      { label: "I usually accept the first usable response.", points: 2 },
    ],
  },
  {
    id: "leverage",
    prompt: "Where does AI most improve your work?",
    choices: [
      { label: "It expands my ability to explore, execute, and verify faster.", points: 10 },
      { label: "It helps me draft and organize work.", points: 7 },
      { label: "It saves time on routine writing.", points: 5 },
      { label: "It mostly gives me a starting point.", points: 3 },
    ],
  },
  {
    id: "handoff",
    prompt: "If someone reviewed your AI-assisted work, what would be easiest to understand?",
    choices: [
      { label: "The goal, reasoning, AI role, evidence, and final decisions.", points: 10 },
      { label: "The final output and some notes about how it was made.", points: 7 },
      { label: "The output, but not much process.", points: 4 },
      { label: "They would need to ask me what happened.", points: 2 },
    ],
  },
  {
    id: "scope",
    prompt: "How do you decide whether AI should do more or less of a task?",
    choices: [
      { label: "I match AI use to risk, context, and reviewability.", points: 10 },
      { label: "I use more AI when I know how to judge the result.", points: 8 },
      { label: "I use AI for most parts and correct obvious problems.", points: 5 },
      { label: "I let AI handle as much as possible.", points: 2 },
    ],
  },
  {
    id: "learning",
    prompt: "After a weak AI-assisted result, what do you change?",
    choices: [
      { label: "The task framing, context, checks, and workflow.", points: 10 },
      { label: "The prompt and examples I provide.", points: 7 },
      { label: "The wording of the request.", points: 4 },
      { label: "I move on or try a different tool.", points: 2 },
    ],
  },
  {
    id: "judgment",
    prompt: "Which statement fits your AI work best?",
    choices: [
      { label: "AI accelerates me, but I remain accountable for the work.", points: 10 },
      { label: "AI gives me strong drafts that I improve.", points: 7 },
      { label: "AI helps me finish work I would otherwise delay.", points: 5 },
      { label: "AI often decides the direction for me.", points: 2 },
    ],
  },
];

export const quizzes: QuizDefinition[] = [
  {
    slug: "ai-native-score",
    title: "AI-Native Score",
    description: "A directional quiz that estimates how mature your AI work habits are before verified proof.",
    questions: sharedQuestions,
  },
  {
    slug: "ai-work-style",
    title: "AI Work Style",
    description: "A lightweight profile of how you tend to collaborate with AI systems.",
    questions: sharedQuestions,
  },
];

export function getQuiz(slug: string) {
  return quizzes.find((quiz) => quiz.slug === slug);
}
