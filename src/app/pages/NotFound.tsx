import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F7]">
            <FileQuestion className="h-10 w-10 text-[#717182]" />
          </div>
        </div>
        <h1 className="mb-2 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>404</h1>
        <p className="mb-6 text-[15px] text-[#717182]">
          This page doesn't exist in the evidence chain.
        </p>
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
