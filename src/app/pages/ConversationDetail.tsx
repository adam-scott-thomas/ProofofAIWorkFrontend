import { ArrowLeft, Tag, Copy, Download, MoreVertical } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link, useParams } from "react-router";
import { useConversation } from "../../hooks/useApi";
import { toast } from "sonner";

export default function ConversationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: conversation, isLoading } = useConversation(id ?? "");

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center text-[13px] text-[#717182]">Loading...</div>
  );

  const turns: any[] = Array.isArray(conversation?.turns) ? conversation.turns : [];
  const tags: string[] = Array.isArray(conversation?.tags) ? conversation.tags : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="mb-4">
            <Link to="/app/conversations">
              <Button variant="ghost" size="sm" className="-ml-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Conversations
              </Button>
            </Link>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="mb-2 text-xl tracking-tight">
                {conversation?.title ?? conversation?.filename ?? "Conversation"}
              </h1>
              <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                {conversation?.created_at && (
                  <span className="font-mono">
                    {new Date(conversation.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
                {conversation?.model && <span>{conversation.model}</span>}
                {(conversation?.project_id ?? conversation?.project) && (
                  <Badge variant="secondary" className="bg-[#F5F5F7]">
                    {conversation?.project ?? conversation?.project_id}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = turns.map((t: any) => `${t.role === 'user' ? 'You' : 'Assistant'}: ${t.content ?? t.text ?? ""}`).join("\n\n");
                  navigator.clipboard.writeText(text);
                  toast.success("Conversation copied to clipboard");
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.info("Export coming soon")}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toast.info("More options coming soon")}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-[#717182]" />
              <div className="flex items-center gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-mono"
                  >
                    {tag}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]" onClick={() => toast.info("Tag editing coming soon")}>
                  + Add tag
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Conversation Transcript */}
      <div className="mx-auto max-w-4xl px-8 py-8">
        {turns.length === 0 ? (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 text-center shadow-sm">
            <p className="text-[13px] text-[#717182]">No turns found in this conversation.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {turns.map((turn: any, index: number) => (
              <div key={turn.id ?? index}>
                {/* Turn */}
                <div className={`flex gap-6 ${turn.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                  {/* Role Label */}
                  <div className={`w-24 flex-shrink-0 pt-1 ${turn.role === 'assistant' ? 'text-right' : ''}`}>
                    <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                      {turn.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    {turn.timestamp && (
                      <div className="mt-0.5 font-mono text-[11px] text-[#717182]">
                        {new Date(turn.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <Card
                    className={`flex-1 border p-5 shadow-sm ${
                      turn.is_opening ?? turn.isOpening
                        ? 'border-amber-200 bg-amber-50/30'
                        : turn.role === 'user'
                        ? 'border-[rgba(0,0,0,0.08)] bg-white'
                        : 'border-[rgba(0,0,0,0.08)] bg-[#FAFAFA]'
                    }`}
                  >
                    {(turn.is_opening ?? turn.isOpening) && (
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                          OPENING TURN
                        </Badge>
                        <span className="text-[11px] text-[#717182]">
                          Cognitive baseline indicator
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#3A3A3A]">
                      {turn.content ?? turn.text ?? ""}
                    </div>
                    {(turn.has_code ?? turn.hasCode) && (
                      <div className="mt-3 rounded-sm bg-[#F5F5F7] px-3 py-2 font-mono text-[11px] text-[#717182]">
                        Code block detected
                      </div>
                    )}
                  </Card>
                </div>

                {/* Turn Actions */}
                <div className={`mt-2 flex gap-2 ${turn.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-24 flex-shrink-0" />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]" onClick={() => toast.info("Turn tagging coming soon")}>
                      <Tag className="mr-1 h-3 w-3" />
                      Tag turn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[11px]"
                      onClick={() => {
                        const text = turn.content ?? turn.text ?? "";
                        navigator.clipboard.writeText(text);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conversation Metadata Footer */}
        <Card className="mt-12 border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">
            Conversation Metadata
          </div>
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="text-[#717182]">Total Turns</div>
              <div className="font-mono">{turns.length}</div>
            </div>
            <div>
              <div className="text-[#717182]">Upload ID</div>
              <div className="font-mono text-[12px]">{conversation?.upload_id ?? conversation?.id ?? "—"}</div>
            </div>
            <div>
              <div className="text-[#717182]">Project</div>
              <div>{conversation?.project ?? conversation?.project_id ?? "—"}</div>
            </div>
            <div>
              <div className="text-[#717182]">Model</div>
              <div>{conversation?.model ?? "—"}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
