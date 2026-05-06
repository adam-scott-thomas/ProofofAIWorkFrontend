import { CtaButtons } from "../components/CtaButtons";
import { useSeo } from "../hooks/useSeo";

const examples = [
  ["Research brief", "AI helped compare sources, surface gaps, and produce a cited executive summary."],
  ["Product plan", "The worker used AI to pressure-test scope, map tradeoffs, and refine release risks."],
  ["Portfolio case study", "A transcript-backed proof page showed decisions, revisions, and final evidence."],
];

export default function ExamplesPage() {
  useSeo("Examples", "Examples of AI work sessions that can become ProofOfAIWork profiles.", "/examples");

  return (
    <section className="page-hero">
      <p className="eyebrow">Examples</p>
      <h1>Real AI work leaves a readable trail.</h1>
      <p>
        Proof pages can support many kinds of knowledge work as long as the session includes meaningful decisions and
        reviewable evidence.
      </p>
      <div className="three-column">
        {examples.map(([title, text]) => (
          <article className="feature-panel" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <CtaButtons />
    </section>
  );
}
