import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";
import * as d3 from "d3";

interface KnowledgeMapNode {
  id: string;
  title: string;
  turnCount: number;
  type: "design" | "implementation" | "debugging" | "research";
  timestamp: string;
}

interface KnowledgeMapEdge {
  source: string;
  target: string;
  strength: number; // 0-1
  type: "iteration" | "reference" | "merge";
}

interface KnowledgeMapData {
  nodes: KnowledgeMapNode[];
  edges: KnowledgeMapEdge[];
}

interface KnowledgeMapProps {
  projectId: string;
  data: KnowledgeMapData;
  onNodeClick?: (nodeId: string) => void;
}

export function KnowledgeMap({ projectId, data, onNodeClick }: KnowledgeMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const width = 1200;
    const height = 800;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Grid background (Bloomberg style)
    const gridSize = 40;
    const grid = svg.append("g").attr("class", "grid");

    for (let x = 0; x < width; x += gridSize) {
      grid
        .append("line")
        .attr("x1", x)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", height)
        .attr("stroke", "rgba(0,0,0,0.02)")
        .attr("stroke-width", 1);
    }

    for (let y = 0; y < height; y += gridSize) {
      grid
        .append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", width)
        .attr("y2", y)
        .attr("stroke", "rgba(0,0,0,0.02)")
        .attr("stroke-width", 1);
    }

    // Container for zoom/pan
    const container = svg.append("g");

    // Force simulation - organic, forensic feel
    const simulation = d3
      .forceSimulation(data.nodes as any)
      .force(
        "link",
        d3
          .forceLink(data.edges)
          .id((d: any) => d.id)
          .distance(150)  // Looser connections
          .strength(0.5)  // Weaker pull - let it breathe
      )
      .force("charge", d3.forceManyBody().strength(-500))  // Push apart harder
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05))  // Gentle center pull
      .force("collision", d3.forceCollide().radius(40));

    // Edges
    const links = container
      .append("g")
      .selectAll("line")
      .data(data.edges)
      .join("line")
      .attr("stroke", "#C0C0C5")
      .attr("stroke-width", (d) => d.strength * 3)
      .attr("stroke-opacity", 0.6);

    // Nodes
    const nodes = container
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(
        d3
          .drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Node circles
    nodes
      .append("circle")
      .attr("r", (d) => Math.max(15, Math.min(40, d.turnCount / 2)))
      .attr("fill", "white")
      .attr("stroke", (d) => {
        switch (d.type) {
          case "design":
            return "var(--score-hls)";
          case "implementation":
            return "var(--score-execution)";
          case "debugging":
            return "#E63946";
          case "research":
            return "#717182";
          default:
            return "#C0C0C5";
        }
      })
      .attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        onNodeClick?.(d.id);
      })
      .on("mouseenter", function () {
        d3.select(this).attr("stroke-width", 3);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-width", 2);
      });

    // Node labels
    nodes
      .append("text")
      .text((d) => {
        // Truncate title
        return d.title.length > 25 ? d.title.slice(0, 25) + "..." : d.title;
      })
      .attr("font-family", "monospace")
      .attr("font-size", 11)
      .attr("fill", "#3A3A3A")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => Math.max(15, Math.min(40, d.turnCount / 2)) + 15)
      .attr("pointer-events", "none");

    // Turn count badges
    nodes
      .append("text")
      .text((d) => d.turnCount)
      .attr("font-family", "monospace")
      .attr("font-size", 10)
      .attr("fill", "#717182")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("pointer-events", "none");

    // Simulation tick
    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag handlers
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, onNodeClick]);

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur"
          onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur"
          onClick={() => setZoom(1)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute left-4 top-4 z-10 rounded-md border border-[rgba(0,0,0,0.08)] bg-white/90 p-4 backdrop-blur">
        <div className="mb-3 text-[11px] uppercase tracking-wider text-[#717182]">
          Conversation Types
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2" style={{ borderColor: "var(--score-hls)" }}></div>
            <span className="text-[#717182]">Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2" style={{ borderColor: "var(--score-execution)" }}></div>
            <span className="text-[#717182]">Implementation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-[#E63946]"></div>
            <span className="text-[#717182]">Debugging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-[#717182]"></div>
            <span className="text-[#717182]">Research</span>
          </div>
        </div>
        <div className="mt-4 border-t border-[rgba(0,0,0,0.06)] pt-3 text-[11px] text-[#C0C0C5]">
          Node size = conversation depth
          <br />
          Edge width = connection strength
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 left-4 z-10 rounded-md border border-[rgba(0,0,0,0.08)] bg-white/90 p-4 backdrop-blur">
        <div className="space-y-1 text-[12px]">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#717182]">Conversations</span>
            <span className="font-mono text-[#3A3A3A]">{data.nodes.length}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#717182]">Connections</span>
            <span className="font-mono text-[#3A3A3A]">{data.edges.length}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#717182]">Avg. Depth</span>
            <span className="font-mono text-[#3A3A3A]">
              {Math.round(data.nodes.reduce((sum, n) => sum + n.turnCount, 0) / data.nodes.length)}
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="overflow-hidden rounded-md border border-[rgba(0,0,0,0.08)] bg-[#FAFAFA]">
        <svg ref={svgRef} className="w-full" style={{ transform: `scale(${zoom})` }}></svg>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-[12px] text-[#717182]">
        Click nodes to view conversation details • Drag nodes to reposition • Use controls to zoom
      </div>
    </div>
  );
}
