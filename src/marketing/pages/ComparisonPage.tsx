import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { Section } from "../components/Section";
import { getComparisonPage } from "../data/seoExpansion";
import { archetypes, getGlossaryConceptBySlug } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function ComparisonPage() {
  const { slug } = useParams();
  const page = getComparisonPage(slug);
  const canonical = page ? `${siteMetadata.canonical}/compare/${page.slug}` : `${siteMetadata.canonical}/enterprise/hiring-ai-capable-talent`;
  const jsonLd = page
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: page.title,
            description: page.description,
            url: canonical,
            about: "AI capability evaluation",
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteMetadata.canonical },
              { "@type": "ListItem", position: 2, name: "Hiring evaluation", item: `${siteMetadata.canonical}/enterprise/hiring-ai-capable-talent` },
              { "@type": "ListItem", position: 3, name: page.title, item: canonical },
            ],
          },
        ],
      }
    : undefined;

  useSeo(
    page ? page.title : "Comparison page unavailable",
    page?.description ?? "This comparison page is not part of the current acquisition layer.",
    page ? `/compare/${page.slug}` : "/enterprise/hiring-ai-capable-talent",
    undefined,
    page ? "article" : "website",
    jsonLd,
  );

  if (!page) {
    return (
      <section className="dossier-surface">
        <p className="eyebrow">Comparison unavailable</p>
        <h1>This comparison page is not published in the current acquisition layer.</h1>
        <Link className="button primary" to="/enterprise/hiring-ai-capable-talent">
          Hiring evaluation
        </Link>
      </section>
    );
  }

  const relatedGlossary = page.relatedGlossary.map(getGlossaryConceptBySlug).filter(Boolean);
  const relatedArchetypes = page.relatedArchetypes
    .map((archetypeSlug) => archetypes.find((archetype) => archetype.slug === archetypeSlug))
    .filter(Boolean);

  return (
    <>
      <article className="dossier-shell taxonomy-detail">
        <header className="proof-masthead">
          <span>PROOFOFAIWORK</span>
          <span>Comparison · category education</span>
        </header>

        <section className="dossier-identity">
          <div>
            <p className="eyebrow">Evaluation comparison</p>
            <h1>{page.title}</h1>
            <p>{page.framing}</p>
            <div className="cta-row">
              <Link className="button primary" to="/enterprise/hiring-ai-capable-talent">
                Hiring evaluation
                <ArrowRight size={18} />
              </Link>
              <a className="button secondary" href={APP_URL}>
                Create proof
              </a>
            </div>
          </div>
          <aside className="dossier-summary-panel">
            <p className="eyebrow">Positioning</p>
            <strong>Evidence</strong>
            <span>Use comparisons to clarify fit, not to attack alternatives.</span>
          </aside>
        </section>

        <div className="proof-dossier-body">
          <main className="proof-main-column">
            <Section eyebrow="Best fit" title="Where each approach helps">
              <div className="two-column">
                {page.bestFor.map((item) => (
                  <article className="feature-panel" key={item.label}>
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Limits" title="Where each approach can fail">
              <div className="two-column">
                {page.limits.map((item) => (
                  <article className="feature-panel" key={item.label}>
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Proof of work" title="Why artifacts improve the review surface">
              <div className="artifact-grid">
                {page.proofOfWorkAdvantage.map((advantage) => (
                  <article key={advantage}>
                    <span>Advantage</span>
                    <h3>{advantage}</h3>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Evaluation rule" title="Keep the decision accountable">
              <div className="soft-callout">
                <h2>Proof artifacts support review. They do not replace human responsibility.</h2>
                <p>
                  Use ProofOfAIWork to collect better evidence, structure interview questions, and compare work samples
                  against consistent criteria.
                </p>
              </div>
            </Section>
          </main>

          <aside className="proof-side-column">
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
              <p className="eyebrow">Related archetypes</p>
              <h2>Signals to inspect</h2>
              <div className="cluster-list">
                {relatedArchetypes.map((archetype) =>
                  archetype ? (
                    <div key={archetype.slug}>
                      <Link to={`/archetypes/${archetype.slug}`}>{archetype.name}</Link>
                      <p>{archetype.enterpriseInterpretation}</p>
                    </div>
                  ) : null,
                )}
              </div>
            </section>

            <section className="side-section">
              <p className="eyebrow">Evidence archive</p>
              <h2>Proof and dossiers</h2>
              <p>Use the public archive as the discovery surface for inspectable proof artifacts.</p>
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
