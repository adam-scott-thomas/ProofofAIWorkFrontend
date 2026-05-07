import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { Section } from "../components/Section";
import { getRoleLeveragePage } from "../data/seoExpansion";
import { archetypes, getGlossaryConceptBySlug } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function RoleLeveragePage() {
  const { slug } = useParams();
  const page = getRoleLeveragePage(slug);
  const canonical = page ? `${siteMetadata.canonical}/ai-leverage/${page.slug}` : `${siteMetadata.canonical}/glossary/ai-leverage`;
  const jsonLd = page
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: page.title,
            description: page.description,
            url: canonical,
            about: page.role,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteMetadata.canonical },
              { "@type": "ListItem", position: 2, name: "AI leverage", item: `${siteMetadata.canonical}/glossary/ai-leverage` },
              { "@type": "ListItem", position: 3, name: page.role, item: canonical },
            ],
          },
        ],
      }
    : undefined;

  useSeo(
    page ? page.title : "AI leverage page unavailable",
    page?.description ?? "This role-based AI leverage page is not published in the current acquisition layer.",
    page ? `/ai-leverage/${page.slug}` : "/glossary/ai-leverage",
    undefined,
    page ? "article" : "website",
    jsonLd,
  );

  if (!page) {
    return (
      <section className="dossier-surface">
        <p className="eyebrow">Role page unavailable</p>
        <h1>This AI leverage page is not part of the current acquisition layer.</h1>
        <Link className="button primary" to="/glossary/ai-leverage">
          Read AI leverage
        </Link>
      </section>
    );
  }

  const relatedArchetypes = page.relatedArchetypes
    .map((archetypeSlug) => archetypes.find((archetype) => archetype.slug === archetypeSlug))
    .filter(Boolean);
  const relatedGlossary = page.relatedGlossary.map(getGlossaryConceptBySlug).filter(Boolean);

  return (
    <>
      <article className="dossier-shell taxonomy-detail">
        <header className="proof-masthead">
          <span>PROOFOFAIWORK</span>
          <span>Role-based AI leverage · evidence first</span>
        </header>

        <section className="dossier-identity">
          <div>
            <p className="eyebrow">AI leverage in role</p>
            <h1>{page.title}</h1>
            <p>{page.promise}</p>
            <div className="cta-row">
              <a className="button primary" href={APP_URL}>
                Create proof
                <ArrowRight size={18} />
              </a>
              <Link className="button secondary" to="/enterprise/hiring-ai-capable-talent">
                Hiring evaluation
              </Link>
            </div>
          </div>
          <aside className="dossier-summary-panel">
            <p className="eyebrow">Primary audience</p>
            <strong>{page.role}</strong>
            <span>Work patterns, proof signals, and evaluation language.</span>
          </aside>
        </section>

        <div className="proof-dossier-body">
          <main className="proof-main-column">
            <Section eyebrow="Work patterns" title="Where AI leverage actually appears">
              <div className="artifact-grid">
                {page.workPatterns.map((pattern) => (
                  <article key={pattern}>
                    <span>Pattern</span>
                    <h3>{pattern}</h3>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Proof signals" title="Evidence worth reviewing">
              <div className="artifact-grid">
                {page.proofSignals.map((signal) => (
                  <article key={signal}>
                    <span>Strong signal</span>
                    <h3>{signal}</h3>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Weak signals" title="What not to overvalue">
              <div className="artifact-grid">
                {page.weakSignals.map((signal) => (
                  <article key={signal}>
                    <span>Weak signal</span>
                    <h3>{signal}</h3>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Enterprise use" title="How to evaluate this capability">
              <div className="soft-callout">
                <h2>{page.enterpriseUse}</h2>
                <p>
                  Keep the review grounded in artifacts, criteria, and human judgment. Do not use tool familiarity as a
                  substitute for demonstrated work.
                </p>
              </div>
            </Section>
          </main>

          <aside className="proof-side-column">
            <section className="side-section">
              <p className="eyebrow">Related archetypes</p>
              <h2>Workstyle patterns</h2>
              <div className="cluster-list">
                {relatedArchetypes.map((archetype) =>
                  archetype ? (
                    <div key={archetype.slug}>
                      <Link to={`/archetypes/${archetype.slug}`}>{archetype.name}</Link>
                      <p>{archetype.meaning}</p>
                    </div>
                  ) : null,
                )}
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
              <p className="eyebrow">Proof surface</p>
              <h2>See public evidence</h2>
              <p>Browse public proof artifacts and dossiers when operators choose to publish them.</p>
              <Link to="/community">
                Open community <ArrowRight size={14} />
              </Link>
            </section>
          </aside>
        </div>
      </article>
    </>
  );
}
