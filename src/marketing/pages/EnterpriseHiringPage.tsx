import { ArrowRight, FileSearch, Scale, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { Section } from "../components/Section";
import { comparisonPages, roleLeveragePages } from "../data/seoExpansion";
import { archetypes, proofArtifactTypes } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function EnterpriseHiringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ProofOfAIWork hiring evaluation",
    description: "Evidence-based review of demonstrated AI capability through human-reviewed work artifacts.",
    provider: { "@type": "Organization", name: "ProofOfAIWork", url: siteMetadata.canonical },
    areaServed: "US",
    serviceType: "AI skills evaluation support",
  };

  useSeo(
    "Hiring AI-capable talent",
    "Evaluate demonstrated AI capability through public-safe work samples, proof artifacts, and structured human review.",
    "/enterprise/hiring-ai-capable-talent",
    undefined,
    "website",
    jsonLd,
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Enterprise hiring</p>
          <h1>Evaluate demonstrated AI capability, not claimed familiarity.</h1>
          <p className="hero-subhead">
            ProofOfAIWork gives hiring teams structured evidence from real AI-assisted work while keeping final
            decisions with human reviewers.
          </p>
          <div className="cta-row">
            <a className="button primary" href={APP_URL}>
              Create proof
              <ArrowRight size={18} />
            </a>
            <Link className="button secondary" to="/glossary/ai-skills-assessment">
              Assessment language
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Hiring evidence model">
          <div className="visual-grid">
            {["Work sample", "Proof artifact", "Review criteria", "Human decision"].map((label, index) => (
              <div className="signal-line" key={label}>
                <span>{label}</span>
                <strong>{index + 1}</strong>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: `${78 + index * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="proof-ribbon">
            <ShieldCheck size={18} />
            Evidence-based evaluation support
          </div>
        </div>
      </section>

      <Section eyebrow="Narrative" title="The hiring signal changes from keyword to artifact">
        <div className="three-column">
          <article className="feature-panel">
            <FileSearch size={22} />
            <h3>What was made</h3>
            <p>Review a finished output, workflow, prototype, or decision record instead of relying on AI keywords.</p>
          </article>
          <article className="feature-panel">
            <Scale size={22} />
            <h3>How it was judged</h3>
            <p>Look for instruction quality, human decisions, verification behavior, and role-specific relevance.</p>
          </article>
          <article className="feature-panel">
            <ShieldCheck size={22} />
            <h3>What stays human</h3>
            <p>ProofOfAIWork supports structured review. Employers remain responsible for final hiring decisions.</p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Artifact types" title="Evidence formats for AI-capable hiring">
        <div className="artifact-grid">
          {proofArtifactTypes.map((artifact) => (
            <article key={artifact.slug}>
              <span>Proof format</span>
              <h3>{artifact.name}</h3>
              <p>{artifact.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Archetype context" title="Interpret workstyle without pretending it is psychology">
        <div className="post-grid">
          {archetypes.slice(0, 6).map((archetype) => (
            <Link className="post-card" to={`/archetypes/${archetype.slug}`} key={archetype.slug}>
              <span>{archetype.enterpriseInterpretation}</span>
              <h3>{archetype.name}</h3>
              <p>{archetype.meaning}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Role pages" title="Start evaluation with role-specific work">
        <div className="three-column">
          {roleLeveragePages.map((page) => (
            <Link className="feature-panel" to={`/ai-leverage/${page.slug}`} key={page.slug}>
              <h3>{page.role}</h3>
              <p>{page.enterpriseUse}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Comparisons" title="Explain the shift from claims to evidence">
        <div className="two-column">
          {comparisonPages.map((page) => (
            <Link className="feature-panel" to={`/compare/${page.slug}`} key={page.slug}>
              <h3>{page.title}</h3>
              <p>{page.framing}</p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="final-cta">
        <p className="eyebrow">Compliance-safe framing</p>
        <h2>Use proof artifacts as evidence for human review.</h2>
        <p>
          Do not use archetypes as automated hiring decisions. Use them to organize review criteria and ask better
          work-sample questions.
        </p>
      </section>
    </>
  );
}
