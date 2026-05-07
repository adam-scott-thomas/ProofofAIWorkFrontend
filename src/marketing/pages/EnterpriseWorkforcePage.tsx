import { ArrowRight, Network, Repeat2, Users } from "lucide-react";
import { Link } from "react-router";
import { Section } from "../components/Section";
import { capabilities, roleFamilies } from "../data/taxonomy";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";

export default function EnterpriseWorkforcePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ProofOfAIWork workforce amplification",
    description: "Map and develop demonstrated AI capability across teams through proof artifacts and role-based review.",
    provider: { "@type": "Organization", name: "ProofOfAIWork", url: siteMetadata.canonical },
    serviceType: "Workforce AI capability mapping",
  };

  useSeo(
    "Workforce amplification",
    "Map where teams can produce better, faster, and more repeatable work with AI through evidence-based capability review.",
    "/enterprise/workforce-amplification",
    undefined,
    "website",
    jsonLd,
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Enterprise workforce</p>
          <h1>Map AI capability without turning people into scores.</h1>
          <p className="hero-subhead">
            ProofOfAIWork helps leaders understand where real AI-assisted workflows are emerging and where teams need
            clearer systems, training, or review.
          </p>
          <div className="cta-row">
            <a className="button primary" href={APP_URL}>
              Create proof
              <ArrowRight size={18} />
            </a>
            <Link className="button secondary" to="/archetypes">
              View taxonomy
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Workforce capability map">
          <div className="visual-grid">
            {capabilities.slice(0, 5).map((capability, index) => (
              <div className="signal-line" key={capability.slug}>
                <span>{capability.name}</span>
                <strong>{index + 1}</strong>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: `${72 + index * 4}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="proof-ribbon">
            <Network size={18} />
            Capability map from observable work
          </div>
        </div>
      </section>

      <Section eyebrow="Framing" title="Amplification means better systems around human work">
        <div className="three-column">
          <article className="feature-panel">
            <Users size={22} />
            <h3>Find existing capability</h3>
            <p>Identify teams already creating useful AI-assisted workflows through inspectable proof artifacts.</p>
          </article>
          <article className="feature-panel">
            <Repeat2 size={22} />
            <h3>Turn habits into systems</h3>
            <p>Move from isolated tool use to repeatable workflows, review loops, and shared playbooks.</p>
          </article>
          <article className="feature-panel">
            <Network size={22} />
            <h3>Route training by role</h3>
            <p>Use role families and capabilities to decide where enablement should be specific, not generic.</p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Role families" title="Where capability mapping starts">
        <div className="three-column">
          {roleFamilies.map((family) => (
            <article className="feature-panel" key={family.slug}>
              <h3>{family.name}</h3>
              <p>{family.roles.join(", ")}.</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Capability model" title="Signals leaders can discuss safely">
        <div className="artifact-grid">
          {capabilities.map((capability) => (
            <article key={capability.slug}>
              <span>Capability</span>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="final-cta">
        <p className="eyebrow">Executive-safe language</p>
        <h2>Develop demonstrated capability across the workforce.</h2>
        <p>
          Use ProofOfAIWork for evidence collection, structured review, and enablement planning. Keep employment
          decisions under accountable human governance.
        </p>
      </section>
    </>
  );
}
