import { useCallback, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileJson,
  FileText,
  Loader2,
  ShieldCheck,
  Upload as UploadIcon,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { apiPost } from "../../lib/api";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

type Provenance = "self_submitted" | "file_export" | "api_export" | "verified";

type FileEntry = {
  localId: string;
  file: File;
  status: "queued" | "uploading" | "complete" | "error";
  progress: number;
  uploadId?: string;
  fileHash?: string;
  error?: string;
  predictedClass: "A" | "B" | "C" | "D";
};

const PROVENANCE_OPTIONS: Array<{ value: Provenance; label: string; help: string }> = [
  { value: "self_submitted", label: "Self-submitted", help: "You pasted or assembled this. No external verification." },
  { value: "file_export", label: "Platform file export", help: "Downloaded straight from ChatGPT / Claude / etc." },
  { value: "api_export", label: "API export", help: "Pulled via an AI platform's API." },
  { value: "verified", label: "Third-party verified", help: "Signed off by a collaborator or integration." },
];

const ACCEPTED_EXTS = ["txt", "json", "jsonl", "pdf", "md", "zip", "csv", "yaml", "yml", "log", "html"];
const ACCEPT_ATTR = ACCEPTED_EXTS.map((ext) => `.${ext}`).join(",");

function predictClass(name: string): FileEntry["predictedClass"] {
  const lower = name.toLowerCase();
  if (lower.endsWith(".json") || lower.endsWith(".jsonl") || lower.endsWith(".zip")) return "A";
  if (lower.endsWith(".txt") || lower.endsWith(".md") || lower.endsWith(".log")) return "C";
  if (lower.endsWith(".csv") || lower.endsWith(".html") || lower.endsWith(".yaml") || lower.endsWith(".yml")) return "C";
  if (lower.endsWith(".pdf")) return "D";
  return "D";
}

const CLASS_STYLE: Record<FileEntry["predictedClass"], string> = {
  A: "bg-[#1F6A3F] text-white",
  B: "bg-[#486E9B] text-white",
  C: "bg-[#C18A2E] text-white",
  D: "bg-[#8B2F2F] text-white",
};

function uuidish() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function bytesLabel(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [taskContext, setTaskContext] = useState("");
  const [provenance, setProvenance] = useState<Provenance>("self_submitted");
  const [consentShare, setConsentShare] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: File[]) => {
    const next = incoming
      .filter((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
        return ACCEPTED_EXTS.includes(ext);
      })
      .map<FileEntry>((file) => ({
        localId: uuidish(),
        file,
        status: "queued",
        progress: 0,
        predictedClass: predictClass(file.name),
      }));
    if (next.length === 0) {
      toast.error("No supported files in that drop.");
      return;
    }
    setFiles((current) => [...current, ...next]);
  }, []);

  const removeFile = (localId: string) => setFiles((current) => current.filter((entry) => entry.localId !== localId));

  const onBrowse = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = () => setIsDragging(false);

  const uploadEntry = async (entry: FileEntry): Promise<FileEntry> => {
    const ext = entry.file.name.split(".").pop()?.toLowerCase() ?? "txt";
    setFiles((current) => current.map((f) => (f.localId === entry.localId ? { ...f, status: "uploading", progress: 0 } : f)));

    const presign = await apiPost<{ upload_id: string }>("/uploads/presign", {
      file_name: entry.file.name,
      file_type: ext,
      file_size_bytes: entry.file.size,
      allow_data_use: consentShare,
    });

    const token = useAuthStore.getState().token;
    const apiHost = import.meta.env.VITE_API_URL || "";
    const apiBase = apiHost ? `${apiHost.replace(/\/$/, "")}/api/v1` : "/api/v1";

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${apiBase}/uploads/${presign.upload_id}/file`);
      if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        const pct = Math.round((event.loaded / event.total) * 100);
        setFiles((current) =>
          current.map((f) => (f.localId === entry.localId ? { ...f, progress: pct } : f)),
        );
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`Upload failed (${xhr.status})`));
      };
      xhr.onerror = () => reject(new Error("Network error"));
      const body = new FormData();
      body.append("file", entry.file);
      xhr.send(body);
    });

    const complete = await apiPost<{ upload_id: string; file_hash: string }>("/uploads/complete", {
      upload_id: presign.upload_id,
      task_context: taskContext || undefined,
    });

    return {
      ...entry,
      status: "complete",
      progress: 100,
      uploadId: complete.upload_id,
      fileHash: complete.file_hash,
    };
  };

  const submit = async () => {
    if (files.length === 0 || submitting) return;
    setSubmitting(true);
    try {
      for (const entry of files) {
        if (entry.status === "complete") continue;
        try {
          const next = await uploadEntry(entry);
          setFiles((current) => current.map((f) => (f.localId === entry.localId ? next : f)));
        } catch (err: any) {
          setFiles((current) =>
            current.map((f) =>
              f.localId === entry.localId ? { ...f, status: "error", error: err?.message ?? "Upload failed" } : f,
            ),
          );
          toast.error(`${entry.file.name}: ${err?.message ?? "upload failed"}`);
        }
      }
      const anyOk = files.some((f) => f.status !== "error");
      if (anyOk) {
        toast.success(`${files.length} file${files.length === 1 ? "" : "s"} uploaded to pool`);
        navigate("/app/upload");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const ready = files.length > 0 && !submitting;
  const total = useMemo(() => files.reduce((sum, entry) => sum + entry.file.size, 0), [files]);
  const completedCount = files.filter((entry) => entry.status === "complete").length;

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#161616]">
      <header className="border-b border-[#D8D2C4] bg-[#FBF8F1]">
        <div className="px-8 py-7">
          <Link to="/app/upload" className="inline-flex items-center gap-2 text-[13px] text-[#5C5C5C] hover:text-[#161616]">
            <ArrowLeft className="h-4 w-4" />
            Back to pool
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#6B6B66]">Upload</div>
              <h1 className="mt-2 text-3xl tracking-tight">Add conversation exports.</h1>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5C5C5C]">
                Drop in every file for this project. Each upload goes to the pool, gets parsed, and gets an
                evidence class. Assessments come later once the project is ready.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left column — dropzone + file list */}
          <div className="space-y-5">
            <Card className="border border-[#D8D2C4] bg-white p-5">
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
                  isDragging
                    ? "border-[#315D8A] bg-[#EEF2F9]"
                    : "border-[#D8D2C4] bg-[#FBF8F1] hover:bg-[#F3EEE2]"
                }`}
                onClick={onBrowse}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
              >
                <UploadIcon className={`mb-3 h-8 w-8 ${isDragging ? "text-[#315D8A]" : "text-[#6B6B66]"}`} />
                <div className="text-[16px] text-[#161616]">
                  {isDragging ? "Drop to queue" : "Drop files here or click to browse"}
                </div>
                <div className="mt-1 text-[12px] text-[#6B6B66]">
                  {ACCEPTED_EXTS.map((ext) => ext.toUpperCase()).join(" · ")} · up to 500 MB per file
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept={ACCEPT_ATTR}
                  className="hidden"
                  onChange={(event) => {
                    addFiles(Array.from(event.target.files ?? []));
                    event.target.value = "";
                  }}
                />
              </div>

              {files.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {files.map((entry) => {
                    const FileIcon = entry.file.name.endsWith(".json") || entry.file.name.endsWith(".jsonl") ? FileJson : FileText;
                    return (
                      <div key={entry.localId} className="rounded-lg border border-[#D8D2C4] bg-[#FBF8F1] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileIcon className="h-4 w-4 shrink-0 text-[#315D8A]" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px]">{entry.file.name}</div>
                            <div className="mt-0.5 flex gap-3 text-[11px] text-[#6B6B66]">
                              <span>{bytesLabel(entry.file.size)}</span>
                              {entry.fileHash ? <span>hash {entry.fileHash.slice(0, 8)}…</span> : null}
                              {entry.error ? <span className="text-[#8B2F2F]">{entry.error}</span> : null}
                            </div>
                          </div>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] ${CLASS_STYLE[entry.predictedClass]}`}>
                            est. {entry.predictedClass}
                          </span>
                          {entry.status === "complete" ? (
                            <Check className="h-4 w-4 text-[#1F6A3F]" />
                          ) : entry.status === "uploading" ? (
                            <Loader2 className="h-4 w-4 animate-spin text-[#315D8A]" />
                          ) : !submitting ? (
                            <button type="button" onClick={() => removeFile(entry.localId)}>
                              <X className="h-4 w-4 text-[#6B6B66] hover:text-[#8B2F2F]" />
                            </button>
                          ) : null}
                        </div>
                        {entry.status === "uploading" ? (
                          <div className="mt-2">
                            <Progress value={entry.progress} className="h-1" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </Card>

            {/* Submit */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-[12px] text-[#6B6B66]">
                {files.length === 0 ? (
                  <>No files queued.</>
                ) : (
                  <>
                    {files.length} file{files.length === 1 ? "" : "s"} · {bytesLabel(total)}
                    {submitting ? <> · {completedCount}/{files.length} complete</> : null}
                  </>
                )}
              </div>
              <Button size="lg" onClick={submit} disabled={!ready}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    Upload to pool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right column — context / provenance / guidance */}
          <div className="space-y-5">
            <Card className="border border-[#D8D2C4] bg-white p-5">
              <div className="text-[12px] uppercase tracking-[0.14em] text-[#6B6B66]">Context</div>
              <label className="mt-2 block text-[12px] text-[#6B6B66]">What was this work about?</label>
              <textarea
                value={taskContext}
                onChange={(event) => setTaskContext(event.target.value)}
                placeholder="Optional. A sentence or two helps the evaluator frame the observations."
                rows={4}
                className="mt-1 w-full rounded-md border border-[#D8D2C4] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#315D8A]"
              />
            </Card>

            <Card className="border border-[#D8D2C4] bg-white p-5">
              <div className="text-[12px] uppercase tracking-[0.14em] text-[#6B6B66]">Provenance</div>
              <div className="mt-2 text-[12px] text-[#6B6B66]">Where did these files come from?</div>
              <div className="mt-2">
                <Select value={provenance} onValueChange={(v) => setProvenance(v as Provenance)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVENANCE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-2 text-[11px] leading-relaxed text-[#6B6B66]">
                {PROVENANCE_OPTIONS.find((option) => option.value === provenance)?.help}
              </div>
            </Card>

            <Card className="border border-[#D8D2C4] bg-white p-5">
              <div className="text-[12px] uppercase tracking-[0.14em] text-[#6B6B66]">Data use</div>
              <label className="mt-3 flex items-start gap-3 text-[13px] text-[#161616]">
                <input
                  type="checkbox"
                  checked={consentShare}
                  onChange={(event) => setConsentShare(event.target.checked)}
                  className="mt-1"
                />
                <span>
                  Allow these uploads to train the engine in anonymized form.
                  <span className="mt-1 block text-[11px] text-[#6B6B66]">
                    Off by default. Uploads are private to you regardless.
                  </span>
                </span>
              </label>
            </Card>

            <Card className="border border-[#D8D2C4] bg-[#FBF8F1] p-5">
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#6B6B66]">
                <ShieldCheck className="h-3.5 w-3.5" />
                What happens next
              </div>
              <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-[#5C5C5C]">
                <li>→ Files land in your pool as parse jobs.</li>
                <li>→ Parsers extract task type, iteration, constraints — no LLM.</li>
                <li>→ You cluster or manually assign files to a project.</li>
                <li>→ Run an assessment from the project when you're ready.</li>
                <li>→ Review results, curate a proof page, publish at the excerpt level.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
