import { useMemo, useState } from "react";
import { ArrowRight, Clock, Filter, Globe, Loader2, Search, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { apiFetch } from "../../lib/api";

type DirectoryEntry = {
  public_token: string;
  slug: string | null;
  headline: string | null;
  summary: string | null;
  signals: Array<{ id?: string; label?: string; strength?: number; category?: string }>;
  url: string;
};

type DirectoryOpen = {
  enabled: true;
  total_published: number;
  entries: DirectoryEntry[];
  signal_clusters: Record<string, number>;
  filters: { signal: string | null; limit: number; offset: number };
};

type DirectoryGated = {
  enabled: false;
  total_published: number;
  threshold: number;
  message?: string;
};

type DirectoryResponse = DirectoryOpen | DirectoryGated;

export default function Explore() {
  const [signalFilter, setSignalFilter] = useState("");
  const [query, setQuery] = useState("");

  const listQuery = useQuery<DirectoryResponse>({
    queryKey: ["directory-public", signalFilter],
    queryFn: () =>
      apiFetch<DirectoryResponse>(`/directory${signalFilter ? `?signal=${encodeURIComponent(signalFilter)}` : ""}`),
  });

  const data = listQuery.data;
  const entries = data && data.enabled ? data.entries : [];
  const clusters = data && data.enabled ? data.signal_clusters : {};
  const signalKeys = useMemo(
    () => Object.keys(clusters).sort((a, b) => (clusters[b] ?? 0) - (clusters[a] ?? 0)),
    [clusters],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const haystack = [
        entry.headline,
        entry.summary,
        ...(entry.signals || []).map((signal) => signal.label || signal.id),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [entries, query]);

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#161616]">
      <header className="border-b border-[#D8D2C4] bg-[#FBF8F1]">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <div className="flex items-start gap-3">
            <Globe className="mt-1 h-6 w-6 text-[#315D8A]" />
            <div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#6B6B66]">Directory</div>
              <h1 className="mt-1 text-3xl tracking-tight">Browse published proof pages.</h1>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5C5C5C]">
                Proof pages published with public visibility and opted into the directory show up here.
                Each card links to a viewer-facing page with observations, evidence, and trust metadata.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-8 py-8">
        {listQuery.isLoading ? (
          <div className="flex items-center gap-2 p-8 text-[13px] text-[#6B6B66]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading directory...
          </div>
        ) : !data ? (
          <Card className="border border-[#D8D2C4] bg-white p-5 text-[14px] text-[#5C5C5C]">
            Could not reach the directory. Try again in a moment.
          </Card>
        ) : data.enabled === false ? (
          <GatedView data={data} />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B6B66]" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search headlines, summaries, signals..."
                  className="pl-7"
                />
              </div>
              <div className="text-[12px] text-[#6B6B66]">
                {filtered.length} of {entries.length} shown · {data.total_published} total published
              </div>
            </div>

            {signalKeys.length > 0 ? (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-[#6B6B66]">
                  <Filter className="h-3 w-3" />
                  Filter by signal
                </span>
                <button
                  type="button"
                  onClick={() => setSignalFilter("")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
                    !signalFilter
                      ? "border-[#315D8A] bg-[#EEF2F9] text-[#161616]"
                      : "border-[#D8D2C4] bg-white text-[#5C5C5C] hover:bg-[#FBF8F1]"
                  }`}
                >
                  All
                </button>
                {signalKeys.map((signal) => {
                  const active = signalFilter === signal;
                  return (
                    <button
                      key={signal}
                      type="button"
                      onClick={() => setSignalFilter(signal)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] transition-colors ${
                        active
                          ? "border-[#315D8A] bg-[#EEF2F9] text-[#161616]"
                          : "border-[#D8D2C4] bg-white text-[#5C5C5C] hover:bg-[#FBF8F1]"
                      }`}
                    >
                      {signal}
                      <span className="rounded-full bg-[#F3EEE2] px-1.5 py-0.5 text-[10px] text-[#6B6B66]">
                        {clusters[signal]}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {filtered.length === 0 ? (
              <Card className="border border-dashed border-[#D8D2C4] bg-[#FBF8F1] p-10 text-center text-[13px] text-[#5C5C5C]">
                {entries.length === 0
                  ? "No proof pages opted into the directory yet."
                  : "Nothing matches the current filter."}
              </Card>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {filtered.map((entry) => (
                  <Link key={entry.slug ?? entry.public_token} to={entry.url}>
                    <Card className="group h-full border border-[#D8D2C4] bg-white p-5 transition-colors hover:border-[#A88F5F] hover:bg-[#FBF8F1]">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-[16px] tracking-tight text-[#161616]">
                          {entry.headline || "Untitled proof page"}
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#6B6B66] opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      {entry.summary ? (
                        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#5C5C5C]">
                          {entry.summary}
                        </p>
                      ) : (
                        <p className="mt-2 text-[12px] text-[#A88F5F]">No summary provided.</p>
                      )}
                      {Array.isArray(entry.signals) && entry.signals.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {entry.signals.slice(0, 5).map((signal, index) => (
                            <span
                              key={`${signal.id ?? signal.label ?? index}`}
                              className="inline-flex items-center gap-1 rounded-full border border-[#D8D2C4] px-2 py-0.5 text-[10px] tracking-[0.06em] text-[#6B6B66]"
                            >
                              {signal.label || signal.id || "signal"}
                              {signal.strength != null ? (
                                <span className="text-[#A88F5F]">{Math.round(signal.strength * 100)}%</span>
                              ) : null}
                            </span>
                          ))}
                          {entry.signals.length > 5 ? (
                            <span className="inline-flex items-center rounded-full bg-[#F3EEE2] px-2 py-0.5 text-[10px] text-[#6B6B66]">
                              +{entry.signals.length - 5}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GatedView({ data }: { data: DirectoryGated }) {
  const pct = Math.min(100, Math.round((data.total_published / Math.max(data.threshold, 1)) * 100));
  const remaining = Math.max(0, data.threshold - data.total_published);
  return (
    <Card className="border border-[#D8D2C4] bg-white p-8">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#6B6B66]">
        <Clock className="h-3 w-3" />
        Gated
      </div>
      <h2 className="mt-2 text-2xl tracking-tight">Directory opens soon.</h2>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#5C5C5C]">
        {data.message ||
          `Publicly listing proof pages makes sense once there's a critical mass worth browsing. ${remaining} more to go.`}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <div className="text-4xl tracking-tight">{data.total_published}</div>
        <div className="text-[13px] text-[#6B6B66]">of {data.threshold} published needed</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EAE3CF]">
        <div className="h-full bg-[#1F6A3F]" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Hint icon={Sparkles} title="Publish a proof" body="Every new publication moves the needle." />
        <Hint icon={Filter} title="Opt into the directory" body="Publishing is not enough — list it too." />
        <Hint icon={Globe} title="Share your link" body="Link-visibility pages are already viewable via /p/{slug}." />
      </div>
    </Card>
  );
}

function Hint({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-md border border-[#EAE3CF] bg-[#FBF8F1] p-3">
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <div className="mt-1 text-[12px] leading-relaxed text-[#5C5C5C]">{body}</div>
    </div>
  );
}
