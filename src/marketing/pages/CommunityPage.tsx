import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSeo } from "../hooks/useSeo";
import { APP_URL } from "../lib/constants";
import { fetchPublicReceipts, type PublicReceiptListItem } from "../lib/publicReceipts";

export default function CommunityPage() {
  const [items, setItems] = useState<PublicReceiptListItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useSeo(
    "Community proof board",
    "Browse public ProofOfAIWork receipts when authors choose to publish them.",
    "/community",
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchPublicReceipts(controller.signal)
      .then((receipts) => setItems(receipts))
      .catch(() => setItems(null))
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="page-hero">
      <p className="eyebrow">Community</p>
      <h1>Public AI work receipts will live here.</h1>
      <p>
        This board is reserved for real public receipts only. When the public list endpoint is available, published
        proofs will appear here automatically.
      </p>

      {loading ? (
        <div className="community-state">
          <Loader2 className="spin" size={22} />
          <p>Checking for public receipts...</p>
        </div>
      ) : items && items.length > 0 ? (
        <div className="community-grid">
          {items.map((item) => (
            <Link className="feature-panel" to={`/proof/${item.slug}`} key={item.slug}>
              {item.archetypeLabel ? <span className="proof-card-label">{item.archetypeLabel}</span> : null}
              <h2>{item.title}</h2>
              {item.summary ? <p>{item.summary}</p> : <p>Public proof receipt.</p>}
              <span className="text-link">
                View proof <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="community-state ready">
          <h2>Waiting on the public receipt list endpoint.</h2>
          <p>
            Individual canonical proof links are live at <code>/proof/:slug</code>. The community board will stay empty
            until the backend exposes a public receipt list without falling through to receipt-id parsing.
          </p>
        </div>
      )}

      <div className="cta-row">
        <a className="button primary" href={APP_URL}>
          Upload and analyze your work
          <ArrowRight size={18} />
        </a>
        <Link className="button secondary" to="/scores">
          How scoring works
        </Link>
      </div>
    </section>
  );
}
