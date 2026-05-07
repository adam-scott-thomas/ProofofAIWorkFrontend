import { Hash } from "lucide-react";
import { ArtifactGrid, EditorialSection, LedgerPanel, VerificationBlock } from "../components/EditorialPrimitives";
import ProofCard from "../components/ProofCard";
import { specimenProofs } from "../data/specimens";
import { useSeo } from "../hooks/useSeo";
import type { PublicReceipt } from "../lib/publicReceipts";

function n(value?: number) {
  return value == null ? "--" : value.toLocaleString("en-US");
}

function SpecimenProof({ proof }: { proof: PublicReceipt }) {
  return (
    <article className="specimen-proof" id={proof.slug.replace("specimen-", "")}>
      <div className="proof-utility">
        <span>Specimen example</span>
        <span>{proof.verification_state}</span>
      </div>
      <header className="proof-masthead">
        <span>{proof.title}</span>
        <span>{proof.archetype_label}</span>
      </header>
      <section className="proof-dossier-hero">
        <div className="proof-score-event">
          <p className="eyebrow">AI Leverage Score</p>
          <strong>{n(proof.ai_leverage_score)}</strong>
          <div className="proof-score-context">
            <span>Evidence confidence {n(proof.evidence_confidence)}</span>
            <span>Output multiplier {proof.output_multiplier?.toFixed(1)}x</span>
          </div>
        </div>
        <div className="proof-identity-block">
          <p className="eyebrow">Narrative interpretation</p>
          <h1>{proof.archetype_label}</h1>
          <p className="proof-title-line">{proof.title}</p>
          <p className="proof-narrative">{proof.summary}</p>
        </div>
      </section>
      <div className="proof-dossier-body">
        <main className="proof-main-column">
          <EditorialSection kicker="01 · Proof card" title="Portable artifact">
            <ProofCard receipt={proof} />
          </EditorialSection>
          <EditorialSection kicker="02 · Evidence ledger" title="What was counted">
            <LedgerPanel
              items={[
                { label: "Ownership", value: n(proof.ownership), note: "0-100 score" },
                { label: "Execution", value: n(proof.execution), note: "0-100 score" },
                { label: "Leverage", value: n(proof.leverage_score), note: "0-100 score" },
                { label: "Completed actions", value: n(proof.completed_actions), note: "closed against intent" },
                { label: "Decisions", value: n(proof.decisions), note: "choice points" },
                { label: "Alternatives", value: n(proof.alternatives), note: "branches compared" },
                { label: "Turns analyzed", value: n(proof.turns_analyzed), note: "conversation turns" },
                { label: "Artifacts", value: n(proof.artifacts), note: "public deliverables" },
              ]}
            />
          </EditorialSection>
          <EditorialSection kicker="03 · Evidence cards" title="Readable trail">
            <ArtifactGrid artifacts={proof.evidence_cards} />
          </EditorialSection>
        </main>
        <aside className="proof-side-column">
          <VerificationBlock canonical={proof.canonical_url} hash={proof.proof_hash} status="Specimen demonstration" />
          <section className="side-section">
            <p className="eyebrow">Timeline</p>
            <h2>Work sequence</h2>
            <ArtifactGrid artifacts={proof.timeline} />
          </section>
          <section className="side-section">
            <p className="eyebrow">Artifacts</p>
            <h2>Filed outputs</h2>
            <ArtifactGrid artifacts={proof.artifact_cards} />
          </section>
        </aside>
      </div>
      <footer className="proof-dossier-footer">
        <Hash size={16} />
        <span>Specimen proof hash</span>
        <code>{proof.proof_hash}</code>
      </footer>
    </article>
  );
}

export default function DemoProofsPage() {
  useSeo("Demo proof dossiers", "Six specimen full proof examples for ProofOfAIWork.", "/demo/proofs");

  return (
    <section className="demo-page">
      <header className="archive-masthead">
        <p className="eyebrow">Full proof specimens</p>
        <h1>AI work leaves a readable trail.</h1>
        <p>
          These seeded proof records demonstrate how public artifacts can show decisions, revisions, artifacts, and
          outcomes without exposing raw private transcripts.
        </p>
      </header>
      <div className="specimen-proof-list">
        {specimenProofs.map((proof) => (
          <SpecimenProof proof={proof} key={proof.slug} />
        ))}
      </div>
    </section>
  );
}
