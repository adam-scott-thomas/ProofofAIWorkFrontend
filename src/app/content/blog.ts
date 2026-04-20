export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  keywords: string[];
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "show-ai-assisted-work-in-a-portfolio",
    title: "How to Show AI-Assisted Work in a Portfolio Without Looking Fake",
    description:
      "A practical guide to documenting AI-assisted work with evidence, process, and judgment instead of empty polish.",
    eyebrow: "Portfolio credibility",
    publishedAt: "2026-04-20",
    keywords: ["how to show AI-assisted work in a portfolio", "verified AI portfolio", "proof of AI work"],
    sections: [
      {
        heading: "The problem is not AI use. It is unverifiable AI use.",
        paragraphs: [
          "Most portfolios now have an unspoken trust problem. The work looks polished, the language is clean, and the reviewer has no way to tell where the candidate’s thinking stopped and the model’s output started.",
          "That does not mean you need to hide AI. It means you need to make your contribution legible. A credible AI portfolio shows direction, revision, rejection, verification, and decision-making, not just a polished final artifact.",
        ],
      },
      {
        heading: "Show the process, not just the output",
        paragraphs: [
          "The strongest portfolio pages include evidence of iteration. That can mean prompt history, excerpts from conversations, checkpoints, decision notes, or revisions with commentary on what changed and why.",
          "The goal is simple: make it obvious that AI was a tool inside a human-led workflow, not a substitute for one.",
        ],
      },
      {
        heading: "Explain what the human actually owned",
        paragraphs: [
          "Reviewers want to know where your judgment lived. Did you frame the problem? Did you reject bad output? Did you test claims? Did you redirect the system when it drifted?",
          "When you can show those moments, the portfolio stops feeling like generic AI gloss and starts reading like real proof of work.",
        ],
      },
    ],
  },
  {
    slug: "what-employers-want-in-an-ai-portfolio",
    title: "What Employers Actually Want to See in an AI Portfolio",
    description:
      "What hiring teams care about in AI-assisted work: authorship, judgment, process visibility, and evidence-backed execution.",
    eyebrow: "Hiring signal",
    publishedAt: "2026-04-20",
    keywords: ["what employers want in an AI portfolio", "evaluate AI-assisted work", "AI portfolio assessment"],
    sections: [
      {
        heading: "Hiring teams are not looking for anti-AI purity tests",
        paragraphs: [
          "The interesting hiring question is no longer whether AI was used. In many roles, AI use is expected. The real question is whether the candidate still demonstrated judgment, authorship, and useful decision-making while using it.",
          "That is why a verified AI portfolio is more useful than a polished showcase page with no supporting evidence behind it.",
        ],
      },
      {
        heading: "Good portfolios reduce ambiguity",
        paragraphs: [
          "A strong AI portfolio gives a reviewer concrete material to inspect. They can see how a project was framed, how the person responded to weak output, and whether the final result reflects original thought or just surface-level cleanup.",
          "That makes interviews sharper. It also makes overclaiming much harder.",
        ],
      },
      {
        heading: "The highest-value signals",
        paragraphs: [
          "The most useful signals are usually direction, verification habit, iteration discipline, and the ability to use AI for leverage without becoming dependent on the first pass.",
          "Employers are trying to distinguish between people who can lead AI and people who merely accept AI output. Your portfolio should make that distinction visible.",
        ],
      },
    ],
  },
  {
    slug: "portfolio-vs-resume-in-the-ai-era",
    title: "Portfolio vs Resume in the AI Era",
    description:
      "Why evidence-backed portfolios are becoming more credible than resumes as AI-assisted work becomes normal.",
    eyebrow: "Career readiness",
    publishedAt: "2026-04-20",
    keywords: ["portfolio vs resume in the AI era", "proof of AI work", "prove AI skills"],
    sections: [
      {
        heading: "Resumes summarize. Portfolios demonstrate.",
        paragraphs: [
          "A resume can still tell a useful story, but it is increasingly weak as proof. AI makes it easier to produce polished descriptions of work without making the underlying contribution any easier to verify.",
          "A portfolio, especially one tied to evidence and workflow, closes that gap. It gives the reviewer something they can inspect instead of something they are asked to trust on tone alone.",
        ],
      },
      {
        heading: "The AI era raises the standard for credibility",
        paragraphs: [
          "As AI-assisted work becomes the default, the burden shifts. It is not enough to say you built something. You need to show how you worked, where your decisions mattered, and what the system can legitimately attribute to you.",
          "That is why proof of AI work is becoming a better career asset than another formatted bullet list.",
        ],
      },
      {
        heading: "The best stack is resume plus verified portfolio",
        paragraphs: [
          "This is not an argument to delete the resume. It is an argument to stop expecting the resume to carry all the trust by itself.",
          "The strongest setup is a concise resume that points into a verified portfolio with projects, evidence, and proof pages behind the headline claims.",
        ],
      },
    ],
  },
  {
    slug: "how-students-can-prove-they-used-ai-well",
    title: "How Students Can Prove They Used AI Well",
    description:
      "How students can document AI-assisted class and side projects in a way that builds trust with employers instead of eroding it.",
    eyebrow: "Student use case",
    publishedAt: "2026-04-20",
    keywords: ["AI portfolio for students", "prove AI skills to employers", "student AI portfolio"],
    sections: [
      {
        heading: "Student work now gets judged through an AI trust filter",
        paragraphs: [
          "Students are entering a market where polished work is not automatically trusted. Reviewers increasingly assume AI was involved somewhere. That means the edge comes from showing how it was used, not pretending it never was.",
          "A student AI portfolio should make that process legible and credible.",
        ],
      },
      {
        heading: "Use class projects as proof material",
        paragraphs: [
          "You do not need to wait for a full-time job to build a useful proof profile. Class projects, capstones, research work, and side projects can all become evidence-backed portfolio pieces if you keep the workflow material around.",
          "Conversation exports, revision trails, evaluation steps, and explanation of final choices are often enough to make a project much more believable.",
        ],
      },
      {
        heading: "Frame AI use as judgment, not dependency",
        paragraphs: [
          "The portfolio should not read like a confession and it should not read like a flex. It should read like a clear account of how you used tools to move faster while staying responsible for the work.",
          "That framing matters because employers are not just hiring for speed. They are hiring for authorship, reliability, and judgment under real constraints.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug?: string) {
  return BLOG_POSTS.find((post) => post.slug === slug) || null;
}
