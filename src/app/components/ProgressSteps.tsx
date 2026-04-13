import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Step {
  label: string;
  /** Approximate duration in ms before advancing to the next step */
  duration: number;
}

interface Props {
  steps: Step[];
  /** When true, the stepper is actively running. When false, it's idle. */
  active: boolean;
  /** When true, all steps collapse to complete state immediately. */
  done?: boolean;
  /** Optional final line shown when done is true. */
  doneLabel?: string;
}

/**
 * Inline multi-step progress indicator.
 *
 * Advances through its steps on timers that roughly match the real backend
 * work. If `done` goes true before all steps finish, it fast-forwards to
 * complete.
 *
 * For the free clustering case, steps should feel snappy (2-3s each).
 * For parsing, steps should feel weighty (longer durations).
 */
export default function ProgressSteps({ steps, active, done, doneLabel }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) {
      setCurrent(0);
      return;
    }
    if (done) {
      setCurrent(steps.length);
      return;
    }
    if (current >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrent((i) => Math.min(i + 1, steps.length - 1));
    }, steps[current].duration);

    return () => clearTimeout(timer);
  }, [active, current, done, steps]);

  useEffect(() => {
    if (done) setCurrent(steps.length);
  }, [done, steps.length]);

  if (!active && !done) return null;

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const isComplete = done || i < current;
        const isActive = !done && i === current;
        const isPending = !done && i > current;

        return (
          <div key={step.label} className="flex items-center gap-3">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                isComplete
                  ? "bg-emerald-100 text-emerald-700"
                  : isActive
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {isComplete ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : isActive ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <span className="text-[10px] font-mono">{i + 1}</span>
              )}
            </div>
            <span
              className={`text-[13px] transition-colors duration-300 ${
                isComplete
                  ? "text-emerald-700"
                  : isActive
                  ? "text-[#030213] font-medium"
                  : isPending
                  ? "text-[#C0C0C5]"
                  : "text-[#717182]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
      {done && doneLabel && (
        <div className="mt-3 border-t border-[rgba(0,0,0,0.06)] pt-3 text-[13px] text-emerald-700 font-medium">
          {doneLabel}
        </div>
      )}
    </div>
  );
}
