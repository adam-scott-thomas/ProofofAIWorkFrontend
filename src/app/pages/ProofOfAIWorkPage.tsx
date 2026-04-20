import MarketingPage from "../components/MarketingPage";

export default function ProofOfAIWorkPage() {
  return (
    <MarketingPage
      title="Proof of AI Work | What Verified AI Work Actually Means"
      description="Proof of AI Work is the category for evidence-backed AI-assisted projects. Show authorship, process, judgment, and leverage instead of just polished output."
      canonical="https://proofofaiwork.com/proof-of-ai-work"
      eyebrow="Category page"
      h1="What proof of AI work actually means"
      intro="Proof of AI work is not AI detection and it is not another portfolio slogan. It means showing the evidence behind AI-assisted work clearly enough that another person can inspect what you directed, what you changed, what you verified, and what was still yours."
      sections={[
        {
          title: "Authorship stays visible",
          body: "Proof matters because polished output alone is no longer a trustworthy signal. A proof page should make human contribution legible even when AI was heavily involved in the workflow.",
        },
        {
          title: "Process beats vibes",
          body: "The strongest evidence is behavioral: framing, iteration, rejection, redirection, validation, and final judgment. That is what separates AI leverage from AI dependence.",
        },
        {
          title: "Credibility compounds",
          body: "Once work is documented this way, it becomes useful in hiring, collaboration, and public reputation. It is not just a record of what was built. It is a record of how the work happened.",
        },
      ]}
    />
  );
}
