import { KnowledgeMap } from "../components/KnowledgeMap";
import { useNavigate } from "react-router";
import { useProjects } from "../../hooks/useApi";

export default function KnowledgeMapPage() {
  const navigate = useNavigate();
  const { data: projectsData, isLoading } = useProjects();

  const handleNodeClick = (nodeId: string) => {
    navigate(`/app/conversations/${nodeId}`);
  };

  const projects: any[] = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items ?? projectsData?.data ?? [];

  const knowledgeMapData = {
    nodes: projects.map((p: any) => ({
      id: p.id,
      title: p.name ?? p.title ?? "Unnamed Project",
      turnCount: p.conversation_count ?? p.conversations?.length ?? 0,
      type: "implementation" as const,
      timestamp: p.updated_at ?? p.created_at ?? new Date().toISOString(),
    })),
    edges: [] as { source: string; target: string; strength: number; type: "reference" | "iteration" }[],
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Knowledge Map</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Network visualization of all conversations and their connections
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-32 text-[13px] text-[#717182]">
            Loading knowledge map...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[15px] text-[#717182]">No projects yet.</p>
            <p className="mt-2 text-[13px] text-[#717182]">
              Upload conversations and run AI Sort to see your knowledge map.
            </p>
          </div>
        ) : (
          <KnowledgeMap
            projectId="global"
            data={knowledgeMapData}
            onNodeClick={handleNodeClick}
          />
        )}
      </div>
    </div>
  );
}
