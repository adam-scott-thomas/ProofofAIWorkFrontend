import { PUBLIC_API_BASE } from "./constants";

export type PublicReceiptEvidenceCard = {
  id: string;
  title: string;
  summary: string;
  kind?: string;
  turns: string[];
};

export type PublicReceipt = {
  slug: string;
  title: string;
  topic?: string;
  summary?: string;
  archetypeLabel?: string;
  aiLeverageScore?: number;
  evidenceConfidence?: number;
  outputMultiplier?: number;
  ownership?: number;
  ownershipDetail?: string;
  execution?: number;
  executionDetail?: string;
  leverage?: number;
  leverageDetail?: string;
  evidenceCards: PublicReceiptEvidenceCard[];
  proofHash?: string;
  publishedAt?: string;
  ogImageUrl?: string;
};

export type PublicReceiptListItem = {
  slug: string;
  title: string;
  summary?: string;
  archetypeLabel?: string;
};

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function pickRecord(source: AnyRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (isRecord(value)) return value;
  }
  return {};
}

function pickArray(source: AnyRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

function pickString(source: AnyRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function pickNumber(source: AnyRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  }
  return undefined;
}

function normalizeScore(value: number | undefined) {
  if (value == null) return undefined;
  if (value > 0 && value <= 1) return Math.round(value * 100);
  return Math.round(value);
}

function normalizeMultiplier(value: number | undefined) {
  if (value == null) return undefined;
  return Math.round(value * 10) / 10;
}

function normalizeTurns(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string | number => typeof item === "string" || typeof item === "number")
    .map((item) => String(item))
    .filter(Boolean)
    .slice(0, 5);
}

function normalizeEvidenceCards(receipt: AnyRecord): PublicReceiptEvidenceCard[] {
  const evidence = pickArray(receipt, ["evidence_cards", "evidenceCards", "receipt_evidence", "evidence"]);
  return evidence
    .filter(isRecord)
    .map((item, index) => ({
      id: pickString(item, ["id", "turn_id", "evidence_id"]) ?? `evidence-${index + 1}`,
      title: pickString(item, ["title", "label", "claim", "decision"]) ?? `Evidence ${index + 1}`,
      summary:
        pickString(item, ["summary", "description", "redacted_text", "excerpt", "annotation"]) ??
        "Public-safe evidence summary.",
      kind: pickString(item, ["kind", "type", "dimension"]),
      turns: normalizeTurns(item.turns ?? item.turn_ids ?? item.turn_references),
    }))
    .slice(0, 8);
}

export function normalizeReceipt(payload: unknown, fallbackSlug: string): PublicReceipt | null {
  if (!isRecord(payload)) return null;
  const receipt = isRecord(payload.receipt) ? payload.receipt : payload;
  const scores = pickRecord(receipt, ["scores", "public_scores", "score_summary", "scoreData"]);
  const metrics = pickRecord(receipt, ["metrics", "public_metrics"]);
  const archetype = pickRecord(receipt, ["archetype", "profile", "profile_archetype"]);

  const title =
    pickString(receipt, ["title", "topic", "project_title", "headline", "name"]) ??
    pickString(payload, ["title", "topic"]) ??
    "ProofOfAIWork receipt";
  const slug = pickString(receipt, ["slug", "public_slug"]) ?? fallbackSlug;

  return {
    slug,
    title,
    topic: pickString(receipt, ["topic", "project_title", "headline"]),
    summary: pickString(receipt, ["evidence_summary", "summary", "description", "narrative"]),
    archetypeLabel:
      pickString(receipt, ["archetype_label", "archetypeLabel"]) ??
      pickString(archetype, ["label", "primary", "name"]),
    aiLeverageScore: normalizeScore(pickNumber(scores, ["ai_leverage_score", "aiLeverageScore", "ai_leverage"])),
    evidenceConfidence: normalizeScore(
      pickNumber(scores, ["evidence_confidence", "evidenceConfidence", "confidence_score", "confidence"]),
    ),
    outputMultiplier: normalizeMultiplier(
      pickNumber(scores, ["output_multiplier", "outputMultiplier", "multiplier"]) ??
        pickNumber(metrics, ["output_multiplier", "outputMultiplier"]),
    ),
    ownership: normalizeScore(pickNumber(scores, ["ownership", "ownership_score"])),
    ownershipDetail: pickString(metrics, ["ownership_detail", "ownershipDetail", "decisions_detail"]),
    execution: normalizeScore(pickNumber(scores, ["execution", "execution_score"])),
    executionDetail: pickString(metrics, ["execution_detail", "executionDetail", "tasks_detail"]),
    leverage: normalizeScore(pickNumber(scores, ["leverage", "leverage_score"])),
    leverageDetail: pickString(metrics, ["leverage_detail", "leverageDetail", "outcomes_detail"]),
    evidenceCards: normalizeEvidenceCards(receipt),
    proofHash: pickString(receipt, ["proof_hash", "proofHash", "hash", "receipt_hash"]),
    publishedAt: pickString(receipt, ["published_at", "publishedAt", "created_at", "createdAt"]),
    ogImageUrl: pickString(receipt, ["og_image_url", "ogImageUrl", "share_image_url", "shareImageUrl"]),
  };
}

export async function fetchPublicReceipt(slug: string, signal?: AbortSignal) {
  const response = await fetch(`${PUBLIC_API_BASE}/receipts/by-slug/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) return null;
  return normalizeReceipt(await response.json(), slug);
}

export async function fetchPublicReceipts(signal?: AbortSignal): Promise<PublicReceiptListItem[] | null> {
  const response = await fetch(`${PUBLIC_API_BASE}/receipts/public`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) return null;
  const payload = await response.json();
  const items = Array.isArray(payload) ? payload : isRecord(payload) && Array.isArray(payload.items) ? payload.items : [];
  return items
    .filter(isRecord)
    .map((item) => ({
      slug: pickString(item, ["slug", "public_slug"]) ?? "",
      title: pickString(item, ["title", "topic", "project_title", "headline"]) ?? "Public proof",
      summary: pickString(item, ["summary", "evidence_summary", "description"]),
      archetypeLabel: pickString(item, ["archetype_label", "archetypeLabel"]),
    }))
    .filter((item) => item.slug);
}
