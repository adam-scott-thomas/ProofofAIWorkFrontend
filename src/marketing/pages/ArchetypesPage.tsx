import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Section } from "../components/Section";
import { archetypes, capabilities, proofArtifactTypes, roleFamilies } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function ArchetypesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ProofOfAIWork AI work archetypes",
    description: "A practical taxonomy for describing how people create leverage with AI at work.",
    url: `${siteMetadata.canonical}/archetypes`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: archetypes.map((archetype, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: archetype.name,
        url: `${siteMetadata.canonical}/archetypes/${archetype.slug}`,
      })),
    },
  };

  useSeo(
    "AI work archetypes",
    "The ProofOfAIWork archetype taxonomy describes observable AI work patterns without pretending to be psychology.",
    "/archetypes",
    undefined,
    "website",
    jsonLd,
  );

  return (
    <>
      <section className="archive-masthead taxonomy-masthead">
        <p className="eyebrow">Taxonomy v1</p>
        <h1>Nine practical ways people create AI leverage.</h1>
        <p>
          These archetypes describe observable work patterns. They are not clinical labels, personality claims, or
          automated hiring decisions.
        </p>
        <div className="cta-row">
          <a className="button primary" href={APP_URL}>
            Create proof
            <ArrowRight size={18} />
          </a>
          <Link className="button secondary" to="/glossary">
            Read the glossary
          </Link>
        </div>
      </section>

      <Section
        eyebrow="Archetypes"
        title="A shared language for proof"
        lead="Each page explains what the workstyle means, what proof signals to look for, and how employers should interpret it."
      >
        <div className="post-grid">
          {archetypes.map((archetype) => (
            <Link className="post-card" to={`/archetypes/${archetype.slug}`} key={archetype.slug}>
              <span>{archetype.strength}</span>
              <h3>{archetype.name}</h3>
              <p>{archetype.meaning}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Capability tags" title="The reusable signals underneath the archetypes">
        <div className="three-column">
          {capabilities.map((capability) => (
            <article className="feature-panel" key={capability.slug}>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Role families" title="Where the taxonomy is applied">
        <div className="three-column">
          {roleFamilies.map((family) => (
            <article className="feature-panel" key={family.slug}>
              <h3>{family.name}</h3>
              <p>{family.roles.join(", ")}.</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proof artifact types" title="The evidence formats this taxonomy expects">
        <div className="three-column">
          {proofArtifactTypes.map((artifact) => (
            <article className="feature-panel" key={artifact.slug}>
              <h3>{artifact.name}</h3>
              <p>{artifact.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
