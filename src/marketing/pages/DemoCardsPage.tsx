import ProofCard from "../components/ProofCard";
import { specimenProofs } from "../data/specimens";
import { useSeo } from "../hooks/useSeo";

const labels = [
  "compact card",
  "full card",
  "high-score example",
  "lower-score but honest example",
  "recruiter/workflow example",
  "founder/operator example",
];

export default function DemoCardsPage() {
  useSeo("Demo proof cards", "Standalone specimen ProofCard variants for ProofOfAIWork.", "/demo/cards");

  return (
    <section className="demo-page">
      <header className="archive-masthead">
        <p className="eyebrow">Proof card specimens</p>
        <h1>Portable identity artifacts.</h1>
        <p>
          Each card is labeled as a specimen example. The front creates curiosity; the back exposes the evidence ledger.
        </p>
      </header>

      <div className="demo-card-lab">
        {specimenProofs.map((proof, index) => (
          <section key={proof.slug}>
            <div className="demo-label">
              <span>Demonstration artifact</span>
              <strong>{labels[index]}</strong>
            </div>
            <ProofCard receipt={proof} compact={index !== 1} />
          </section>
        ))}
      </div>
    </section>
  );
}
