import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { Section } from "../components/Section";
import { archetypes, getGlossaryConcept } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function GlossaryTermPage() {
  const { slug } = useParams();
  const concept = getGlossaryConcept(slug);
  const canonical = concept ? `${siteMetadata.canonical}/glossary/${concept.slug}` : `${siteMetadata.canonical}/glossary`;
  const jsonLd = concept
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "DefinedTerm",
            name: concept.term,
            description: concept.definition,
            url: canonical,
            inDefinedTermSet: `${siteMetadata.canonical}/glossary`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteMetadata.canonical },
              { "@type": "ListItem", position: 2, name: "Glossary", item: `${siteMetadata.canonical}/glossary` },
              { "@type": "ListItem", position: 3, name: concept.term, item: canonical },
            ],
          },
        ],
      }
    : undefined;

  useSeo(
    concept ? `${concept.term}: definition` : "Glossary term unavailable",
    concept
      ? `${concept.definition} Learn why it matters for proof, hiring, and AI-assisted work evaluation.`
      : "This glossary concept is not published in the first ProofOfAIWork acquisition layer.",
    concept ? `/glossary/${concept.slug}` : "/glossary",
    undefined,
    concept ? "article" : "website",
    jsonLd,
  );

  if (!concept) {
    return (
      <section className="dossier-surface">
        <p className="eyebrow">Glossary term unavailable</p>
        <h1>This concept is not published in the first glossary layer.</h1>
        <Link className="button primary" to="/glossary">
          View glossary
        </Link>
      </section>
    );
  }

  const relatedArchetypes = concept.relatedArchetypes
    .map((archetypeSlug) => archetypes.find((archetype) => archetype.slug === archetypeSlug))
    .filter(Boolean);

  return (
    <>
      <article className="dossier-shell taxonomy-detail">
        <header className="proof-masthead">
          <span>PROOFOFAIWORK</span>
          <span>Glossary · Taxonomy v1</span>
        </header>

        <section className="dossier-identity">
          <div>
            <p className="eyebrow">Defined term</p>
            <h1>{concept.term}</h1>
            <p>{concept.definition}</p>
          </div>
          <aside className="dossier-summary-panel">
            <p className="eyebrow">Use case</p>
            <strong>Proof</strong>
            <span>Language for evaluating observable AI-assisted work.</span>
          </aside>
        </section>

        <div className="proof-dossier-body">
          <main className="proof-main-column">
            <Section eyebrow="Why it matters" title="The practical reason this term exists">
              <div className="soft-callout">
                <h2>{concept.whyItMatters}</h2>
                <p>
                  ProofOfAIWork uses this language to keep review grounded in work samples, artifacts, and human
                  judgment.
                </p>
              </div>
            </Section>

            <Section eyebrow="Proof example" title="What this can look like">
              <article className="feature-panel">
                <h3>{concept.proofExample}</h3>
                <p>
                  A credible example names the work, the human choices, the AI role, and the review criteria. It does
                  not need fake metrics to be useful.
                </p>
              </article>
            </Section>

            <Section eyebrow="Related archetypes" title="Where the concept appears">
              <div className="artifact-grid">
                {relatedArchetypes.map((archetype) =>
                  archetype ? (
                    <article key={archetype.slug}>
                      <span>Archetype</span>
                      <h3>{archetype.name}</h3>
                      <p>{archetype.meaning}</p>
                      <Link className="text-link" to={`/archetypes/${archetype.slug}`}>
                        Open archetype <ArrowRight size={14} />
                      </Link>
                    </article>
                  ) : null,
                )}
              </div>
            </Section>
          </main>

          <aside className="proof-side-column">
            <section className="side-section">
              <p className="eyebrow">Commercial context</p>
              <h2>Hiring evaluation</h2>
              <p>
                Use glossary terms as shared language for human-reviewed work samples and structured evidence review.
              </p>
              <Link to="/enterprise/hiring-ai-capable-talent">
                Hiring page <ArrowRight size={14} />
              </Link>
            </section>

            <section className="side-section">
              <p className="eyebrow">Create evidence</p>
              <h2>Move from term to artifact</h2>
              <p>Create a public-safe proof page from real AI-assisted work.</p>
              <a href={APP_URL}>
                Create proof <ArrowRight size={14} />
              </a>
            </section>
          </aside>
        </div>
      </article>
    </>
  );
}
