import { useEffect } from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  amount?: string;
  method?: string;
}

export default function UnlockSuccess({ open, onClose, amount = "$7.00", method = "Card" }: Props) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 2400);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm border-0 bg-white p-0 shadow-2xl">
        <div className="border-l-4 border-[var(--pro-green)] p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--pro-green-light)]">
              <Check className="h-4 w-4 text-[var(--pro-green)]" strokeWidth={3} />
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--pro-green)] font-medium">
              Payment received
            </div>
          </div>

          <div className="mb-1 text-3xl tracking-tight text-[#030213]">
            Pro unlocked
          </div>

          <div className="mb-6 text-[13px] text-[#717182]">
            {method} · {amount}
          </div>

          <div className="border-t border-[rgba(0,0,0,0.06)] pt-4 font-mono text-[11px] uppercase tracking-wider text-[#717182]">
            Verified {date} · Maelstrom LLC
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
