import { TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Link } from "react-router";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="mx-auto max-w-5xl px-8 py-12">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-4xl tracking-tight">Leaderboard</h1>
          </div>
          <p className="text-xl text-[#717182]">
            Top AI operators ranked by leadership, amplification, and proof
          </p>
        </div>
      </header>

      {/* Coming soon */}
      <div className="mx-auto max-w-5xl px-8 py-12">
        <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-16 text-center">
          <TrendingUp className="mx-auto mb-6 h-12 w-12 text-[#717182]" />
          <h2 className="mb-4 text-2xl tracking-tight">Coming soon</h2>
          <p className="mx-auto max-w-md text-[15px] text-[#717182]">
            Leaderboard — Coming soon. Upload conversations and run AI Sort to get ranked.
          </p>
          <Link
            to="/upload"
            className="mt-8 inline-block text-[15px] text-[#030213] underline underline-offset-4 hover:text-[#717182]"
          >
            Upload your conversations →
          </Link>
        </Card>
      </div>
    </div>
  );
}
