import { CtaButtons } from "../components/CtaButtons";
import { Section } from "../components/Section";
import { useSeo } from "../hooks/useSeo";

export default function JobSeekersPage() {
  useSeo("For job seekers", "Prove AI fluency with a verified AI Work Score and shareable proof page.", "/job-seekers");

  return (
    <section className="page-hero">
      <p className="eyebrow">Job seekers</p>
      <h1>Show how you actually work with AI.</h1>
      <p>
        A verified AI Work Score helps you support AI fluency claims with structured evidence from real work sessions.
      </p>
      <Section title="What your proof page can show">
        <div className="three-column">
          <article className="feature-panel">
            <h2>How you think</h2>
            <p>Show task framing, constraints, review choices, and where your judgment shaped the result.</p>
          </article>
          <article className="feature-panel">
            <h2>How you execute</h2>
            <p>Turn an AI session into a readable work profile with signals that recruiters can scan.</p>
          </article>
          <article className="feature-panel">
            <h2>How you improve</h2>
            <p>Use lower or uneven scores as early signals for more structured, inspectable work habits.</p>
          </article>
        </div>
      </Section>
      <CtaButtons />
    </section>
  );
}
