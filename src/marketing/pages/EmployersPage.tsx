import { CtaButtons } from "../components/CtaButtons";
import { Section } from "../components/Section";
import { useSeo } from "../hooks/useSeo";

export default function EmployersPage() {
  useSeo("For employers", "Evaluate real AI work patterns with ProofOfAIWork.", "/employers");

  return (
    <section className="page-hero">
      <p className="eyebrow">Employers</p>
      <h1>Evaluate AI fluency by looking at real work patterns.</h1>
      <p>
        ProofOfAIWork helps hiring teams move beyond resume keywords and polished samples by reviewing structured
        signals from actual AI-assisted work.
      </p>
      <Section title="What employers can inspect">
        <div className="three-column">
          <article className="feature-panel">
            <h2>Decision ownership</h2>
            <p>See whether the candidate drove the work or outsourced judgment to the tool.</p>
          </article>
          <article className="feature-panel">
            <h2>Execution pattern</h2>
            <p>Understand how the candidate decomposes, iterates, verifies, and finishes work.</p>
          </article>
          <article className="feature-panel">
            <h2>Evidence trail</h2>
            <p>Review transcript-based proof that supports the claims being made.</p>
          </article>
        </div>
      </Section>
      <CtaButtons />
    </section>
  );
}
