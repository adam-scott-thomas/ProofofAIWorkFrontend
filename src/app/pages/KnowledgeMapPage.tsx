import { KnowledgeMap } from "../components/KnowledgeMap";
import { useState } from "react";
import { useNavigate } from "react-router";

// Mock data - global knowledge map across all conversations
const mockGlobalKnowledgeMap = {
  nodes: [
    {
      id: "conv_1",
      title: "Mobile navigation redesign",
      turnCount: 42,
      type: "design" as const,
      timestamp: "2026-03-26T09:30:00Z",
    },
    {
      id: "conv_2",
      title: "Event-driven architecture patterns",
      turnCount: 38,
      type: "design" as const,
      timestamp: "2026-03-24T14:15:00Z",
    },
    {
      id: "conv_3",
      title: "PostgreSQL query optimization",
      turnCount: 27,
      type: "implementation" as const,
      timestamp: "2026-03-23T11:00:00Z",
    },
    {
      id: "conv_4",
      title: "Design system token architecture",
      turnCount: 31,
      type: "design" as const,
      timestamp: "2026-03-20T16:45:00Z",
    },
    {
      id: "conv_5",
      title: "Real-time analytics dashboard",
      turnCount: 19,
      type: "implementation" as const,
      timestamp: "2026-03-18T10:20:00Z",
    },
    {
      id: "conv_6",
      title: "API documentation overhaul",
      turnCount: 24,
      type: "research" as const,
      timestamp: "2026-03-15T14:30:00Z",
    },
    {
      id: "conv_7",
      title: "OAuth2 security implementation",
      turnCount: 35,
      type: "implementation" as const,
      timestamp: "2026-03-22T09:00:00Z",
    },
    {
      id: "conv_8",
      title: "Session authentication bug fix",
      turnCount: 18,
      type: "debugging" as const,
      timestamp: "2026-03-21T16:30:00Z",
    },
    {
      id: "conv_9",
      title: "Recommendation engine features",
      turnCount: 29,
      type: "research" as const,
      timestamp: "2026-03-12T15:45:00Z",
    },
  ],
  edges: [
    { source: "conv_1", target: "conv_4", strength: 0.8, type: "reference" as const },
    { source: "conv_2", target: "conv_7", strength: 0.9, type: "iteration" as const },
    { source: "conv_7", target: "conv_8", strength: 0.95, type: "iteration" as const },
    { source: "conv_3", target: "conv_5", strength: 0.7, type: "reference" as const },
    { source: "conv_4", target: "conv_5", strength: 0.6, type: "reference" as const },
    { source: "conv_6", target: "conv_2", strength: 0.5, type: "reference" as const },
  ],
};

export default function KnowledgeMapPage() {
  const navigate = useNavigate();

  const handleNodeClick = (nodeId: string) => {
    navigate(`/conversations/${nodeId}`);
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
        <KnowledgeMap
          projectId="global"
          data={mockGlobalKnowledgeMap}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
}
