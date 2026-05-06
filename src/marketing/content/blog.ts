export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "What is AI fluency?",
    slug: "what-is-ai-fluency",
    description: "AI fluency is the ability to direct, evaluate, and improve work with AI in real contexts.",
    date: "2026-04-18",
    category: "AI fluency",
    seoTitle: "What is AI fluency?",
    seoDescription: "A practical definition of AI fluency for job seekers, employers, and teams.",
    body: [
      "AI fluency is not the same thing as knowing a list of prompts. It is the ability to turn an ambiguous goal into useful work with AI while keeping ownership of the outcome.",
      "A fluent AI worker can frame the task, choose the right level of automation, inspect weak outputs, recover from bad assumptions, and explain why the final result is trustworthy.",
      "That makes fluency observable. The useful evidence is not a claimed skill line on a resume. It is the pattern of decisions inside a real work session.",
    ],
  },
  {
    title: "Why resumes are weak proof of AI skill",
    slug: "why-resumes-are-weak-proof-of-ai-skill",
    description: "AI skill claims are easy to write and hard to evaluate without evidence of real work.",
    date: "2026-04-20",
    category: "Hiring",
    seoTitle: "Why resumes are weak proof of AI skill",
    seoDescription: "Why AI skill claims on resumes need evidence from real AI-assisted work.",
    body: [
      "Resumes compress work into claims. That is useful for scanning, but weak for evaluating how someone actually handles AI-assisted tasks.",
      "Two candidates can both write 'advanced AI user' while behaving very differently. One may delegate blindly. Another may use AI to explore, verify, revise, and ship faster without losing judgment.",
      "Employers need a way to see the work pattern behind the claim: where the person made decisions, how they used AI leverage, and what evidence supports the result.",
    ],
  },
  {
    title: "How employers should evaluate AI-assisted work",
    slug: "how-employers-should-evaluate-ai-assisted-work",
    description: "A practical framework for assessing AI work without rewarding shallow automation.",
    date: "2026-04-22",
    category: "Employers",
    seoTitle: "How employers should evaluate AI-assisted work",
    seoDescription: "Evaluate ownership, execution, leverage, and evidence quality in AI-assisted work.",
    body: [
      "Good evaluation separates output quality from work quality. A polished result matters, but the route to that result matters too.",
      "Look for ownership signal: did the person define the goal, inspect tradeoffs, and make accountable choices? Then look at execution signal: did they move from idea to result with coherent steps?",
      "AI leverage is strongest when it expands capability without hiding judgment. Evidence quality completes the picture by showing whether the worker can support the claims they make.",
    ],
  },
  {
    title: "Prompt engineering is not enough",
    slug: "prompt-engineering-is-not-enough",
    description: "The strongest AI workers are not just better prompters. They are better operators.",
    date: "2026-04-25",
    category: "Workflows",
    seoTitle: "Prompt engineering is not enough",
    seoDescription: "Why AI work evaluation should look beyond prompt writing.",
    body: [
      "Prompt quality matters, but it is only one part of the work. A strong prompt can still produce a weak result if the worker accepts it without inspection.",
      "The durable skill is operational: translating goals, decomposing work, checking outputs, integrating context, and deciding when to use AI or human judgment.",
      "That is why ProofOfAIWork scores patterns across the session instead of treating prompt text as the whole story.",
    ],
  },
  {
    title: "Building an AI work portfolio",
    slug: "building-an-ai-work-portfolio",
    description: "How to turn real AI sessions into credible proof for hiring and growth.",
    date: "2026-04-28",
    category: "Portfolios",
    seoTitle: "Building an AI work portfolio",
    seoDescription: "Build a portfolio that shows how you work with AI, not just what you made.",
    body: [
      "A useful AI work portfolio includes outputs, but it should also show process. Hiring teams want to know what you owned, what AI helped with, and how you verified the result.",
      "Start with work sessions that reflect real goals. Add context for the objective, constraints, evidence, and final result. Avoid inflated claims and let the record carry the proof.",
      "Over time, a portfolio becomes a work profile: a structured view of how you think, execute, and improve with AI.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
