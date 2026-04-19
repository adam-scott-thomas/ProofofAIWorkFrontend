import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  FolderKanban,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Search,
} from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useProjects } from "../../hooks/useApi";
import { apiFetch } from "../../lib/api";
import { asArray, isoDate } from "../lib/poaw";

type Conversation = {
  upload_id: string;
  title: string;
  source_format: string;
  model_slugs: string[];
  turn_count: number;
  user_turn_count: number;
  first_timestamp: number | null;
  project_id: string | null;
};

type ListResponse = {
  conversations: Conversation[];
  total: number;
  cursor: string | null;
  has_more: boolean;
};

export default function Conversations() {
  const { data: projectsData } = useProjects();
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const params: Record<string, string> = {};
  // "unassigned" is a UI-only pseudo-filter; the backend expects a UUID or
  // no filter, so we skip server-side project_id when showing unassigned.
  if (projectFilter !== "all" && projectFilter !== "unassigned") params.project_id = projectFilter;
  if (sourceFilter !== "all") params.source_format = sourceFilter;
  const listQuery = useQuery<ListResponse>({
    queryKey: ["conversations", params],
    queryFn: () => {
      const qs = new URLSearchParams(params);
      const querystring = qs.toString();
      return apiFetch<ListResponse>(`/conversations${querystring ? `?${querystring}` : ""}`);
    },
  });

  const projects = asArray<{ id: string; title: string }>(projectsData);
  const rawConversations = listQuery.data?.conversations ?? [];
  const conversations = projectFilter === "unassigned"
    ? rawConversations.filter((conversation) => !conversation.project_id)
    : rawConversations;
  const total = listQuery.data?.total ?? 0;

  const sourceFormats = useMemo(() => {
    const set = new Set<string>();
    for (const conversation of conversations) if (conversation.source_format) set.add(conversation.source_format);
    return Array.from(set).sort();
  }, [conversations]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return conversations;
    return conversations.filter((conversation) => {
      const haystack = [
        conversation.title,
        conversation.source_format,
        ...(conversation.model_slugs ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [conversations, query]);

  const projectTitleById = useMemo(() => {
    const map = new Map<string, string>();
    for (const project of projects) map.set(project.id, project.title);
    return map;
  }, [projects]);

  const assignedCount = conversations.filter((conversation) => conversation.project_id).length;

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#161616]">
      <header className="border-b border-[#D8D2C4] bg-[#FBF8F1]">
        <div className="px-8 py-7">
          <div className="text-[12px] uppercase tracking-[0.16em] text-[#6B6B66]">Conversations</div>
          <h1 className="mt-2 text-3xl tracking-tight">Every parsed transcript.</h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5C5C5C]">
            Indexed after parse. Open any row to read turns, tag specific moments, or verify what the evaluator
            saw. Assigned conversations live in their project; unassigned ones are still in the pool.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Tile label="Indexed" value={total} />
            <Tile label="On this page" value={conversations.length} />
            <Tile label="Assigned" value={`${assignedCount}/${conversations.length}`} />
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B6B66]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, format, model..."
                className="pl-7"
              />
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {sourceFormats.length > 1 ? (
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All formats</SelectItem>
                  {sourceFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
          </div>

          {listQuery.isLoading ? (
            <div className="flex items-center gap-2 p-8 text-[13px] text-[#6B6B66]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading conversations...
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border border-dashed border-[#D8D2C4] bg-[#FBF8F1] p-10 text-center text-[13px] text-[#5C5C5C]">
              {conversations.length === 0 ? (
                <>
                  No parsed conversations.{" "}
                  <Link to="/app/upload/new" className="underline">
                    Upload some files
                  </Link>{" "}
                  to get started.
                </>
              ) : (
                <>Nothing matches the current filter.</>
              )}
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((conversation) => (
                <ConversationRow
                  key={conversation.upload_id}
                  conversation={conversation}
                  projectTitle={conversation.project_id ? projectTitleById.get(conversation.project_id) ?? null : null}
                />
              ))}

              {listQuery.data?.has_more ? (
                <div className="pt-3 text-center text-[12px] text-[#6B6B66]">
                  More conversations available · {conversations.length} of {total} shown.
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="border border-[#D8D2C4] bg-white p-4">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[#6B6B66]">{label}</div>
      <div className="mt-1 text-2xl tracking-tight">{value}</div>
    </Card>
  );
}

function ConversationRow({
  conversation,
  projectTitle,
}: {
  conversation: Conversation;
  projectTitle: string | null;
}) {
  const assistantTurns = conversation.turn_count - conversation.user_turn_count;
  const ts = conversation.first_timestamp ? conversation.first_timestamp * 1000 : null;
  return (
    <Link to={`/app/conversations/${conversation.upload_id}`}>
      <Card className="group border border-[#D8D2C4] bg-white p-4 transition-colors hover:border-[#A88F5F] hover:bg-[#FBF8F1]">
        <div className="flex items-center gap-4">
          <MessageSquare className="h-4 w-4 shrink-0 text-[#315D8A]" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {conversation.project_id && projectTitle ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D3E9D9] px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[#1F6A3F]">
                  <FolderKanban className="h-2.5 w-2.5" />
                  {projectTitle}
                </span>
              ) : (
                <span className="rounded-full bg-[#F8E5C2] px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[#8A5F10]">
                  Unassigned
                </span>
              )}
              {conversation.source_format ? (
                <span className="rounded-full border border-[#D8D2C4] px-2 py-0.5 text-[10px] tracking-[0.08em] text-[#6B6B66]">
                  {conversation.source_format}
                </span>
              ) : null}
            </div>
            <div className="mt-1 truncate text-[14px] text-[#161616] group-hover:text-[#315D8A]">
              {conversation.title}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6B6B66]">
              <span className="inline-flex items-center gap-1">
                <MessagesSquare className="h-3 w-3" />
                {conversation.turn_count} turns · {conversation.user_turn_count}u / {assistantTurns}a
              </span>
              {conversation.model_slugs.length > 0 ? (
                <span>{conversation.model_slugs.slice(0, 3).join(", ")}</span>
              ) : null}
              {ts ? (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {isoDate(ts)}
                </span>
              ) : null}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-[#6B6B66] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Card>
    </Link>
  );
}
