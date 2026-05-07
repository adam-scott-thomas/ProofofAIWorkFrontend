import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProofCard from "../components/ProofCard";
import { specimenProofs } from "../data/specimens";
import { useSeo } from "../hooks/useSeo";

const demoSections = [
  ["Proof card examples", "/demo/cards", "Portable verified capability artifacts with a restrained flip side."],
  ["Full proof examples", "/demo/proofs", "Six specimen dossiers showing decisions, revisions, artifacts, and outcomes."],
  ["Individual dossier examples", "/demo/dossiers", "Founder, operator, researcher, and recruiter archive patterns."],
  ["Community/gallery examples", "/community", "The public archive where real published receipts appear."],
  ["Employer inspection examples", "/employers", "How reviewers evaluate demonstrated capability, not claimed familiarity."],
];

export default function DemoIndexPage() {
  useSeo(
    "Demo artifacts",
    "Specimen ProofOfAIWork cards, proof pages, dossiers, and gallery examples.",
    "/demo",
  );

  return (
    <section className="demo-page">
      <header className="archive-masthead">
        <p className="eyebrow">Demonstration artifacts</p>
        <h1>Understand ProofOfAIWork in sixty seconds.</h1>
        <p>
          Specimen examples show how AI work leaves a readable trail: decisions, revisions, artifacts, and outcomes.
          These are demonstrations, not real user claims.
        </p>
      </header>

      <div className="demo-hero-cards">
        {specimenProofs.slice(0, 3).map((proof) => (
          <ProofCard receipt={proof} compact key={proof.slug} />
        ))}
      </div>

      <div className="demo-index-grid">
        {demoSections.map(([title, href, copy]) => (
          <Link className="feature-panel" to={href} key={href}>
            <span className="proof-card-label">Specimen example</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <span className="text-link">
              Open surface <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
