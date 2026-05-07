import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProofCard from "../components/ProofCard";
import { specimenProofs } from "../data/specimens";
import { useSeo } from "../hooks/useSeo";

const exampleSurfaces = [
  ["/demo/cards", "Proof card examples", "Standalone portable proof cards, including compact and full variants."],
  ["/demo/proofs", "Full proof examples", "Six seeded proof dossiers with ledgers, timelines, and artifacts."],
  ["/demo/dossiers", "Dossier examples", "Founder, operator, researcher, and recruiter capability archives."],
  ["/community", "Community gallery", "The archival public evidence gallery for real published receipts."],
];

export default function ExamplesPage() {
  useSeo("Examples", "Concrete ProofOfAIWork specimen examples and demonstration artifacts.", "/examples");

  return (
    <section className="page-hero examples-rebuilt">
      <p className="eyebrow">Examples</p>
      <h1>Real AI work leaves a readable trail.</h1>
      <p>
        These specimen examples show how decisions, revisions, artifacts, and outcomes become inspectable capability
        artifacts. They are demonstrations, not real user claims.
      </p>

      <div className="demo-hero-cards">
        {specimenProofs.slice(0, 2).map((proof) => (
          <ProofCard receipt={proof} compact key={proof.slug} />
        ))}
      </div>

      <div className="demo-index-grid">
        {exampleSurfaces.map(([href, title, copy]) => (
          <Link className="feature-panel" to={href} key={href}>
            <span className="proof-card-label">Specimen example</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <span className="text-link">
              Open examples <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
