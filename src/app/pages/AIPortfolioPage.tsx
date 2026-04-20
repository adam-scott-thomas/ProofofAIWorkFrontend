import MarketingPage from "../components/MarketingPage";

export default function AIPortfolioPage() {
  return (
    <MarketingPage
      title="Verified AI Portfolio | Build an AI Portfolio With Proof"
      description="Build a verified AI portfolio with evidence-backed projects, public proof pages, and visible process behind AI-assisted work."
      canonical="https://proofofaiwork.com/ai-portfolio"
      eyebrow="AI portfolio"
      h1="The AI portfolio, upgraded with proof"
      intro="A normal AI portfolio shows finished work. A verified AI portfolio shows how the work happened. That difference matters because employers, clients, and collaborators increasingly need more than polished output to trust the person behind it."
      sections={[
        {
          title: "Show work, not just deliverables",
          body: "A verified AI portfolio ties projects to evidence, conversations, revisions, and public proof pages. That gives the reviewer a way to inspect process instead of guessing from presentation quality.",
        },
        {
          title: "Turn skepticism into signal",
          body: "AI-assisted work creates ambiguity. A better portfolio does not hide that ambiguity. It resolves it by showing what the person actually did inside the loop.",
        },
        {
          title: "Make AI skills legible",
          body: "The portfolio becomes more useful when it reflects direction, judgment, and execution quality rather than just output volume. That is what makes it credible in skills-based evaluation.",
        },
      ]}
    />
  );
}
