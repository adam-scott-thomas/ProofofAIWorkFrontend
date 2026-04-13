import { useEffect, useRef, useState, useCallback, useId } from "react";
import { Button } from "./ui/button";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
  appId: string;
  locationId: string;
  onToken: (sourceId: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export default function SquarePaymentForm({
  appId,
  locationId,
  onToken,
  onCancel,
  submitLabel = "Pay",
  loading = false,
}: Props) {
  const cardRef = useRef<SquareCard | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [tokenizing, setTokenizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerId = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Dynamically inject Square SDK if not already loaded
      if (!window.Square) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector(
            'script[src="https://web.squarecdn.com/v1/square.js"]'
          );
          if (existing) {
            // Script tag already injected by a previous mount — wait for it
            existing.addEventListener("load", () => resolve());
            existing.addEventListener("error", () => reject(new Error("Square SDK failed to load")));
            return;
          }
          const script = document.createElement("script");
          script.src = "https://web.squarecdn.com/v1/square.js";
          script.type = "text/javascript";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Square SDK failed to load"));
          document.head.appendChild(script);
        }).catch((e: Error) => {
          if (!cancelled) setError(e.message);
          return Promise.reject(e);
        });
      }

      if (cancelled) return;

      if (!window.Square) {
        setError("Square SDK failed to load. Please refresh the page.");
        return;
      }

      // Wait for the container to be in the DOM
      const el = document.getElementById(`sq-card-${containerId}`);
      if (!el) {
        setError("Card container not found");
        return;
      }

      try {
        const payments = await window.Square.payments(appId, locationId);
        const card = await payments.card();
        if (cancelled) {
          card.destroy();
          return;
        }
        await card.attach(`#sq-card-${containerId}`);
        cardRef.current = card;
        setReady(true);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to initialize payment form");
      }
    }

    // Small delay to ensure DOM is ready after dialog animation
    const timer = setTimeout(init, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cardRef.current?.destroy();
      cardRef.current = null;
      // Note: do not remove the script tag — Square can be reused across mounts
    };
  }, [appId, locationId, containerId]);

  const handleSubmit = useCallback(async () => {
    if (!cardRef.current) return;
    setError(null);
    setTokenizing(true);

    try {
      const result = await cardRef.current.tokenize();
      if (result.status === "OK" && result.token) {
        onToken(result.token);
      } else {
        const msg = result.errors?.map((e) => e.message).join("; ") || "Card tokenization failed";
        setError(msg);
      }
    } catch (e: any) {
      setError(e.message || "Payment error");
    } finally {
      setTokenizing(false);
    }
  }, [onToken]);

  const busy = tokenizing || loading;

  return (
    <div className="space-y-4">
      <div
        id={`sq-card-${containerId}`}
        ref={containerRef}
        className="min-h-[44px] rounded-md border border-[rgba(0,0,0,0.12)] bg-white p-1"
      />

      {!ready && !error && (
        <div className="flex items-center gap-2 text-[13px] text-[#717182]">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Loading card form...
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        )}
        <Button size="sm" onClick={handleSubmit} disabled={!ready || busy}>
          {busy && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
