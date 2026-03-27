import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";
import { useMemorySearch } from "../../hooks/useApi";

export default function Search() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { mutate: search, data: results, isPending } = useMemorySearch();

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search({ q: query.trim(), limit: 50 });
    }
  };

  const conversations: any[] = results?.conversations ?? [];
  const projects: any[] = results?.projects ?? [];
  const proofPages: any[] = results?.proof_pages ?? results?.proofPages ?? [];
  const total = conversations.length + projects.length + proofPages.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Search</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Search across conversations, projects, and proof pages
              </p>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Search Bar */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#717182]" />
              <Input
                placeholder="Search by keyword, project, tag, or content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 pl-12 text-[15px] border-none bg-transparent focus-visible:ring-0"
              />
            </div>
          </form>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[rgba(0,0,0,0.06)] pt-4">
              <span className="text-[13px] text-[#717182]">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="bg-[#F5F5F7] pr-1"
                >
                  {filter}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-[11px]"
                onClick={() => setActiveFilters([])}
              >
                Clear all
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-[13px] text-[#717182]">Quick filters:</span>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => setActiveFilters([...activeFilters, "Last 30 days"])}
          >
            Last 30 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => setActiveFilters([...activeFilters, "Has assessment"])}
          >
            Has assessment
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => setActiveFilters([...activeFilters, "Published"])}
          >
            Published
          </Button>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="py-12 text-center text-[13px] text-[#717182]">Searching...</div>
        )}

        {/* No results / empty state before first search */}
        {!isPending && !results && (
          <div className="py-12 text-center text-[13px] text-[#717182]">
            Enter a search query above to get started.
          </div>
        )}

        {/* Results Tabs */}
        {!isPending && results && (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                All Results <Badge variant="secondary" className="ml-2 bg-[#F5F5F7]">{total}</Badge>
              </TabsTrigger>
              <TabsTrigger value="conversations">
                Conversations <Badge variant="secondary" className="ml-2 bg-[#F5F5F7]">{conversations.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="projects">
                Projects <Badge variant="secondary" className="ml-2 bg-[#F5F5F7]">{projects.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="proofs">
                Proof Pages <Badge variant="secondary" className="ml-2 bg-[#F5F5F7]">{proofPages.length}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* All Results */}
            <TabsContent value="all" className="space-y-6">
              {projects.length > 0 && (
                <div>
                  <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">Projects</div>
                  <div className="space-y-3">
                    {projects.map((project: any) => (
                      <Card key={project.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-3">
                              <h3 className="text-[14px]">{project.name}</h3>
                              {project.relevance != null && (
                                <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                                  {Math.round(project.relevance * 100)}% match
                                </div>
                              )}
                            </div>
                            {project.description && (
                              <p className="mb-2 text-[13px] text-[#717182]">{project.description}</p>
                            )}
                            {project.conversation_count != null && (
                              <div className="text-[13px] text-[#717182]">
                                {project.conversation_count} conversations
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">View Project</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {conversations.length > 0 && (
                <div>
                  <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">Conversations</div>
                  <div className="space-y-3">
                    {conversations.map((conv: any) => (
                      <Card key={conv.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-3">
                              <h3 className="text-[14px]">{conv.title}</h3>
                              {conv.relevance != null && (
                                <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                                  {Math.round(conv.relevance * 100)}% match
                                </div>
                              )}
                            </div>
                            {conv.snippet && (
                              <p className="mb-2 text-[13px] text-[#717182] italic">{conv.snippet}</p>
                            )}
                            {conv.project && (
                              <Badge variant="secondary" className="bg-[#F5F5F7]">{conv.project}</Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm">View Conversation</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {proofPages.length > 0 && (
                <div>
                  <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">Proof Pages</div>
                  <div className="space-y-3">
                    {proofPages.map((proof: any) => (
                      <Card key={proof.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-[14px]">{proof.project_name ?? proof.projectName}</h3>
                              {proof.relevance != null && (
                                <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                                  {Math.round(proof.relevance * 100)}% match
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              {proof.cai != null && (
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                                  <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>{proof.cai}</span>
                                </div>
                              )}
                              {proof.hls != null && (
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                                  <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>{proof.hls}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Proof Page</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {total === 0 && (
                <div className="py-8 text-center text-[13px] text-[#717182]">
                  No results found for "{query}"
                </div>
              )}
            </TabsContent>

            <TabsContent value="conversations" className="space-y-3">
              {conversations.map((conv: any) => (
                <Card key={conv.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="text-[14px]">{conv.title}</h3>
                        {conv.relevance != null && (
                          <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                            {Math.round(conv.relevance * 100)}% match
                          </div>
                        )}
                      </div>
                      {conv.snippet && <p className="mb-2 text-[13px] text-[#717182] italic">{conv.snippet}</p>}
                      {conv.project && <Badge variant="secondary" className="bg-[#F5F5F7]">{conv.project}</Badge>}
                    </div>
                    <Button variant="outline" size="sm">View Conversation</Button>
                  </div>
                </Card>
              ))}
              {conversations.length === 0 && (
                <div className="py-8 text-center text-[13px] text-[#717182]">No conversations matched.</div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="space-y-3">
              {projects.map((project: any) => (
                <Card key={project.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="text-[14px]">{project.name}</h3>
                        {project.relevance != null && (
                          <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                            {Math.round(project.relevance * 100)}% match
                          </div>
                        )}
                      </div>
                      {project.description && <p className="mb-2 text-[13px] text-[#717182]">{project.description}</p>}
                      {project.conversation_count != null && (
                        <div className="text-[13px] text-[#717182]">{project.conversation_count} conversations</div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">View Project</Button>
                  </div>
                </Card>
              ))}
              {projects.length === 0 && (
                <div className="py-8 text-center text-[13px] text-[#717182]">No projects matched.</div>
              )}
            </TabsContent>

            <TabsContent value="proofs" className="space-y-3">
              {proofPages.map((proof: any) => (
                <Card key={proof.id} className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm hover:border-[rgba(0,0,0,0.15)] transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-[14px]">{proof.project_name ?? proof.projectName}</h3>
                        {proof.relevance != null && (
                          <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-mono text-blue-700">
                            {Math.round(proof.relevance * 100)}% match
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {proof.cai != null && (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                            <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>{proof.cai}</span>
                          </div>
                        )}
                        {proof.hls != null && (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                            <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>{proof.hls}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Proof Page</Button>
                  </div>
                </Card>
              ))}
              {proofPages.length === 0 && (
                <div className="py-8 text-center text-[13px] text-[#717182]">No proof pages matched.</div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
