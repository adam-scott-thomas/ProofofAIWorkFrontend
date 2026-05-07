import { ArtifactGrid, EditorialSection, LedgerPanel, VerificationBlock } from "../components/EditorialPrimitives";
import ProofCard from "../components/ProofCard";
import { specimenDossiers, totalsFor } from "../data/specimens";
import { useSeo } from "../hooks/useSeo";

function n(value?: number) {
  return value == null ? "--" : value.toLocaleString("en-US");
}

export default function DemoDossiersPage() {
  useSeo("Demo dossiers", "Founder, operator, researcher, and recruiter specimen dossiers.", "/demo/dossiers");

  return (
    <section className="demo-page">
      <header className="archive-masthead">
        <p className="eyebrow">Dossier specimens</p>
        <h1>Capability archives over time.</h1>
        <p>
          Dossiers aggregate multiple proof artifacts into a professional archive. These are demonstration artifacts,
          not social profiles.
        </p>
      </header>

      <div className="specimen-dossier-list">
        {specimenDossiers.map((dossier) => {
          const totals = totalsFor(dossier.proofs);
          const featured = dossier.proofs[0];
          const artifacts = dossier.proofs.map((proof) => ({
            id: proof.slug,
            title: proof.title,
            kind: proof.archetype_label,
            summary: proof.summary,
          }));

          return (
            <article className="dossier-shell specimen-dossier" key={dossier.handle}>
              <header className="proof-masthead">
                <span>Specimen dossier</span>
                <span>{dossier.handle}</span>
              </header>
              <section className="dossier-identity">
                <div>
                  <p className="eyebrow">Public identity framing</p>
                  <h1>{dossier.operator_name}</h1>
                  <p className="dossier-archetype">{dossier.archetype}</p>
                  <p>{dossier.description}</p>
                </div>
                <aside className="dossier-summary-panel">
                  <p className="eyebrow">Evidence totals</p>
                  <strong>{n(totals.public_proofs)}</strong>
                  <span>Specimen proofs in this archive.</span>
                </aside>
              </section>
              <div className="proof-dossier-body">
                <main className="proof-main-column">
                  <EditorialSection kicker="01 · Featured proof" title="Pinned capability artifact">
                    <ProofCard receipt={featured} />
                  </EditorialSection>
                  <EditorialSection kicker="02 · Capability summary" title="Evidence totals">
                    <LedgerPanel
                      items={[
                        { label: "Public proofs", value: n(totals.public_proofs), note: "specimen artifacts" },
                        { label: "Completed actions", value: n(totals.completed_actions), note: "summed across proofs" },
                        { label: "Decisions", value: n(totals.decisions), note: "choice points" },
                        { label: "Alternatives", value: n(totals.alternatives), note: "branches compared" },
                        { label: "Turns analyzed", value: n(totals.turns_analyzed), note: "conversation turns" },
                        { label: "Artifacts", value: n(totals.artifacts), note: "filed outputs" },
                      ]}
                    />
                  </EditorialSection>
                  <EditorialSection kicker="03 · Public artifact grid" title="Filed work">
                    <ArtifactGrid artifacts={artifacts} />
                  </EditorialSection>
                </main>
                <aside className="proof-side-column">
                  <VerificationBlock
                    canonical={`https://proofofaiwork.com/demo/dossiers#${dossier.handle}`}
                    hash={featured.proof_hash}
                    status="Specimen demonstration"
                  />
                </aside>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
