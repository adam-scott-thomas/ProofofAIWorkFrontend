import { MessageSquare, Search, Filter, Tag, Calendar } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useState } from "react";
import { useConversations } from "../../hooks/useApi";

export default function Conversations() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useConversations();

  const allConversations: any[] = Array.isArray(data) ? data : (data?.items ?? []);
  const conversations = searchQuery
    ? allConversations.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.preview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allConversations;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Conversations</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Search and browse your AI conversation history
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Search Bar */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]" />
            <Input
              placeholder="Search conversations by content, tags, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-none bg-transparent focus-visible:ring-0"
            />
          </div>
        </Card>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-4 text-[13px] text-[#717182]">
            {conversations.length} conversation{conversations.length !== 1 ? "s" : ""} found
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center text-[13px] text-[#717182]">
            Loading conversations...
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-[13px] text-red-800">Failed to load conversations. Check your connection and try again.</p>
          </Card>
        )}

        {/* Conversations List */}
        {!isLoading && !isError && (
          <div className="space-y-3">
            {conversations.length === 0 ? (
              <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm text-center">
                <MessageSquare className="mx-auto mb-3 h-8 w-8 text-[#717182]" />
                <p className="text-[14px]">No conversations yet</p>
                <p className="mt-1 text-[13px] text-[#717182]">Upload your AI conversations to get started.</p>
              </Card>
            ) : (
              conversations.map((conversation: any) => (
                <Link key={conversation.id} to={`/conversations/${conversation.id}`}>
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                    <div className="flex gap-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5F5F7] flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-[#717182]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="text-[14px] line-clamp-1">{conversation.title ?? "Untitled"}</h3>
                          <div className="text-[13px] text-[#717182] whitespace-nowrap font-mono">
                            {new Date(conversation.created_at ?? conversation.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                        {conversation.preview && (
                          <p className="mb-3 text-[13px] text-[#717182] line-clamp-2">
                            {conversation.preview}
                          </p>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {conversation.project && (
                              <Badge variant="secondary" className="bg-[#F5F5F7] text-[#030213]">
                                {conversation.project}
                              </Badge>
                            )}
                            {conversation.model && (
                              <span className="text-[13px] text-[#717182]">{conversation.model}</span>
                            )}
                            {(conversation.turn_count ?? conversation.turnCount) != null && (
                              <span className="text-[13px] text-[#717182]">
                                {conversation.turn_count ?? conversation.turnCount} turns
                              </span>
                            )}
                          </div>
                          {conversation.tags?.length > 0 && (
                            <div className="ml-auto flex items-center gap-1.5">
                              {conversation.tags.slice(0, 3).map((tag: string) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-mono"
                                >
                                  <Tag className="mr-1 h-2.5 w-2.5" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
