import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { Section } from "../components/Section";
import { capabilities, getArchetype, getGlossaryConceptBySlug } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

function capabilityName(slug: string) {
  return capabilities.find((capability) => capability.slug === slug)?.name ?? slug;
}

export default function ArchetypePage() {
  const { slug } = useParams();
  const archetype = getArchetype(slug);
  const canonical = archetype ? `${siteMetadata.canonical}/archetypes/${archetype.slug}` : `${siteMetadata.canonical}/archetypes`;
  const jsonLd = archetype
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: `${archetype.name} AI work archetype`,
            description: archetype.meaning,
            url: canonical,
            about: archetype.capabilities.map(capabilityName),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteMetadata.canonical },
              { "@type": "ListItem", position: 2, name: "Archetypes", item: `${siteMetadata.canonical}/archetypes` },
              { "@type": "ListItem", position: 3, name: archetype.name, item: canonical },
            ],
          },
        ],
      }
    : undefined;

  useSeo(
    archetype ? `${archetype.name} AI work archetype` : "AI work archetype unavailable",
    archetype
      ? `${archetype.meaning} Learn proof signals, best-fit roles, blind spots, and enterprise interpretation.`
      : "This AI work archetype is not published in the ProofOfAIWork Taxonomy v1.",
    archetype ? `/archetypes/${archetype.slug}` : "/archetypes",
    undefined,
    archetype ? "article" : "website",
    jsonLd,
  );

  if (!archetype) {
    return (
      <section className="dossier-surface">
        <p className="eyebrow">Archetype unavailable</p>
        <h1>This AI work archetype is not in Taxonomy v1.</h1>
        <Link className="button primary" to="/archetypes">
          View all archetypes
        </Link>
      </section>
    );
  }

  const relatedGlossary = archetype.relatedGlossary
    .map((glossarySlug) => getGlossaryConceptBySlug(glossarySlug))
    .filter(Boolean);

  return (
    <>
      <article className="proof-dossier taxonomy-detail">
        <header className="proof-masthead">
          <span>PROOFOFAIWORK</span>
          <span>Taxonomy v1 · practical workstyle pattern</span>
        </header>

        <section className="proof-dossier-hero">
          <div className="proof-score-event">
            <p className="eyebrow">Archetype</p>
            <strong>{archetype.name.slice(0, 2).toUpperCase()}</strong>
            <div className="proof-score-context">
              <span>{archetype.capabilities.map(capabilityName).slice(0, 2).join(" · ")}</span>
            </div>
          </div>

          <div className="proof-identity-block">
            <p className="eyebrow">AI work archetype</p>
            <h1>{archetype.name}</h1>
            <p className="proof-title-line">{archetype.meaning}</p>
            <p className="proof-narrative">{archetype.shareCardCopy}</p>
            <div className="proof-actions">
              <a className="button primary" href={APP_URL}>
                Create proof
                <ArrowRight size={18} />
              </a>
              <Link className="button secondary" to="/archetypes">
                All archetypes
              </Link>
            </div>
          </div>
        </section>

        <section className="proof-dossier-body">
          <main className="proof-main-column">
            <Section eyebrow="Meaning" title="Plain-English meaning">
              <div className="soft-callout">
                <h2>{archetype.meaning}</h2>
                <p>
                  This is a practical workstyle pattern based on observable behavior. It is not a psychological
                  classification.
                </p>
              </div>
            </Section>

            <Section eyebrow="Profile" title="Strength and blind spot">
              <div className="two-column">
                <article className="feature-panel">
                  <h3>Strength</h3>
                  <p>{archetype.strength}</p>
                </article>
                <article className="feature-panel">
                  <h3>Blind spot</h3>
                  <p>{archetype.blindSpot}</p>
                </article>
              </div>
            </Section>

            <Section eyebrow="Proof" title="Signals worth looking for">
              <div className="artifact-grid">
                {archetype.proofSignals.map((signal) => (
                  <article key={signal}>
                    <span>Proof signal</span>
                    <h3>{signal}</h3>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Enterprise" title="How teams should interpret this">
              <div className="soft-callout">
                <h2>{archetype.enterpriseInterpretation}</h2>
                <p>
                  Employers should use this as context for human review of work samples, not as an automated hiring
                  decision.
                </p>
              </div>
            </Section>
          </main>

          <aside className="proof-side-column">
            <section className="side-section">
              <p className="eyebrow">Best-fit roles</p>
              <h2>Where it shows up</h2>
              <div className="cluster-list">
                {archetype.bestFitRoles.map((role) => (
                  <div key={role}>
                    <strong>{role}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="side-section">
              <p className="eyebrow">Related glossary</p>
              <h2>Concepts</h2>
              <div className="cluster-list">
                {relatedGlossary.map((concept) =>
                  concept ? (
                    <div key={concept.slug}>
                      <Link to={`/glossary/${concept.slug}`}>{concept.term}</Link>
                      <p>{concept.definition}</p>
                    </div>
                  ) : null,
                )}
              </div>
            </section>

            <section className="side-section">
              <p className="eyebrow">Capabilities</p>
              <h2>Underlying signals</h2>
              <div className="cluster-list">
                {archetype.capabilities.map((capability) => (
                  <div key={capability}>
                    <strong>{capabilityName(capability)}</strong>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </article>
    </>
  );
}
