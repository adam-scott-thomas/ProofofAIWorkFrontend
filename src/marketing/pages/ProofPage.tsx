import { Check, Copy, ExternalLink, FileWarning, Hash, Loader2, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useSeo } from "../hooks/useSeo";
import { APP_URL, siteMetadata } from "../lib/constants";
import { fetchPublicReceipt, type PublicReceipt } from "../lib/publicReceipts";

function formatScore(value?: number) {
  return value == null ? "Pending" : String(value);
}

function formatMultiplier(value?: number) {
  return value == null ? "Pending" : `${value}x`;
}

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function proofDescription(receipt?: PublicReceipt | null) {
  if (!receipt) return "Public ProofOfAIWork receipt.";
  return (
    receipt.summary ??
    `Verified AI work receipt for ${receipt.title}, showing ownership, execution, leverage, and public-safe evidence.`
  );
}

function copyText(receipt: PublicReceipt, url: string) {
  return `${receipt.title}\n${proofDescription(receipt)}\n${url}`;
}

export default function ProofPage() {
  const { slug = "" } = useParams();
  const [receipt, setReceipt] = useState<PublicReceipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const canonical = `${siteMetadata.canonical}/proof/${slug}`;
  const metaTitle = receipt?.title ?? (error ? "Proof unavailable" : "Public proof");
  const metaDescription = proofDescription(receipt);

  useSeo(metaTitle, metaDescription, `/proof/${slug}`, receipt?.ogImageUrl, "article");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchPublicReceipt(slug, controller.signal)
      .then((nextReceipt) => {
        if (!nextReceipt) {
          setReceipt(null);
          setError(true);
          return;
        }
        setReceipt(nextReceipt);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setReceipt(null);
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug]);

  const published = useMemo(() => formatDate(receipt?.publishedAt), [receipt?.publishedAt]);

  const handleCopy = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(copyText(receipt, canonical));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (loading) {
    return (
      <section className="proof-loading">
        <Loader2 className="spin" size={28} />
        <p>Loading public proof...</p>
      </section>
    );
  }

  if (error || !receipt) {
    return (
      <section className="page-hero narrow">
        <p className="eyebrow">Private or unavailable</p>
        <h1>This proof is not available publicly.</h1>
        <p>
          The receipt may be private, unpublished, or no longer available. ProofOfAIWork does not expose private
          transcript data or account details from unavailable receipts.
        </p>
        <div className="cta-row">
          <Link className="button primary" to="/community">
            View community board
          </Link>
          <a className="button secondary" href={APP_URL}>
            Verify your own work
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="proof-page">
      <section className="proof-hero">
        <div>
          <p className="eyebrow">Canonical proof receipt</p>
          <h1>{receipt.title}</h1>
          {receipt.topic && receipt.topic !== receipt.title ? <p className="proof-topic">{receipt.topic}</p> : null}
          <p className="proof-summary">{metaDescription}</p>
          <div className="proof-meta-row">
            {receipt.archetypeLabel ? <span>{receipt.archetypeLabel}</span> : null}
            {published ? <span>Published {published}</span> : null}
            <span>Public-safe receipt</span>
          </div>
          <div className="cta-row">
            <button className="button primary" type="button" onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy proof link"}
            </button>
            <a className="button secondary" href={APP_URL}>
              Verify your AI work
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
        <aside className="proof-score-panel" aria-label="Proof scores">
          <div>
            <span>AI Leverage Score</span>
            <strong>{formatScore(receipt.aiLeverageScore)}</strong>
          </div>
          <div>
            <span>Evidence Confidence</span>
            <strong>{formatScore(receipt.evidenceConfidence)}</strong>
          </div>
          <div>
            <span>Output Multiplier</span>
            <strong>{formatMultiplier(receipt.outputMultiplier)}</strong>
          </div>
        </aside>
      </section>

      <section className="proof-section">
        <div className="proof-triad">
          {[
            ["Ownership", receipt.ownership, receipt.ownershipDetail],
            ["Execution", receipt.execution, receipt.executionDetail],
            ["Leverage", receipt.leverage, receipt.leverageDetail],
          ].map(([label, value, detail]) => (
            <div className="proof-triad-item" key={label as string}>
              <span>{label as string}</span>
              <strong>{formatScore(value as number | undefined)}</strong>
              {detail ? <p>{detail as string}</p> : <p>Public-safe scoring detail will appear when provided.</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-section-head">
          <div>
            <p className="eyebrow">Evidence summary</p>
            <h2>Public-safe evidence only.</h2>
          </div>
          <Share2 size={24} />
        </div>
        <p className="proof-summary wide">{metaDescription}</p>
        {receipt.evidenceCards.length > 0 ? (
          <div className="evidence-card-grid">
            {receipt.evidenceCards.map((card) => (
              <article className="evidence-card" key={card.id}>
                {card.kind ? <span>{card.kind}</span> : null}
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                {card.turns.length > 0 ? (
                  <div className="turn-list">
                    {card.turns.map((turn) => (
                      <code key={turn}>{turn}</code>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="soft-callout">
            <FileWarning size={22} />
            <h2>No public evidence cards are attached.</h2>
            <p>The receipt can still be public without exposing private transcript excerpts or private account data.</p>
          </div>
        )}
      </section>

      <section className="proof-section proof-hash">
        <Hash size={22} />
        <div>
          <span>Proof hash</span>
          <code>{receipt.proofHash ?? "Hash pending from public receipt endpoint"}</code>
        </div>
      </section>
    </article>
  );
}
