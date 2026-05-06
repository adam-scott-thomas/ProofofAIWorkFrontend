import type { QuizDefinition } from "../data/quiz";

export type QuizProfile = {
  label: string;
  summary: string;
  strengths: string[];
  improvements: string[];
};

export function calculateQuizScore(quiz: QuizDefinition, answers: Record<string, number>) {
  const total = quiz.questions.reduce((sum, question) => {
    const choiceIndex = answers[question.id];
    return sum + (question.choices[choiceIndex]?.points ?? 0);
  }, 0);
  const max = quiz.questions.length * 10;
  return Math.round((total / max) * 100);
}

export function getProfile(score: number): QuizProfile {
  if (score >= 90) {
    return {
      label: "AI-Native Operator",
      summary: "You show mature ownership, strong execution habits, and high-quality evidence practices.",
      strengths: ["Clear task framing", "Deliberate verification", "High leverage without losing judgment"],
      improvements: ["Package more proof for others", "Track repeatable workflow patterns", "Compare your strongest sessions over time"],
    };
  }

  if (score >= 80) {
    return {
      label: "AI-Augmented Builder",
      summary: "You use AI as a serious execution partner and usually keep control of quality.",
      strengths: ["Strong iteration habits", "Practical use of AI leverage", "Good judgment on output quality"],
      improvements: ["Keep richer evidence trails", "Define success criteria earlier", "Make decision points easier to review"],
    };
  }

  if (score >= 70) {
    return {
      label: "Capable AI Collaborator",
      summary: "You have useful AI workflows and can grow quickly with more structured review habits.",
      strengths: ["Useful drafting and organization", "Willingness to revise", "Good baseline AI fluency"],
      improvements: ["Break work into clearer checkpoints", "Verify assumptions before finalizing", "Save transcripts and rationale"],
    };
  }

  if (score >= 60) {
    return {
      label: "Emerging AI Worker",
      summary: "You are building useful AI habits and can improve by adding structure around the work.",
      strengths: ["Active experimentation", "Growing comfort with AI tools", "Useful starting-point generation"],
      improvements: ["Frame tasks before prompting", "Review outputs against evidence", "Document what changed and why"],
    };
  }

  return {
    label: "Early AI Explorer",
    summary: "You are early in the journey. The next gains come from clearer goals, review habits, and saved evidence.",
    strengths: ["Curiosity", "Early tool exposure", "Openness to new workflows"],
    improvements: ["Start with smaller tasks", "Compare AI output to trusted references", "Keep a simple record of prompts and decisions"],
  };
}

export function isQuizComplete(quiz: QuizDefinition, answers: Record<string, number>) {
  return quiz.questions.every((question) => Number.isInteger(answers[question.id]));
}
