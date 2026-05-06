import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { APP_URL, PRIMARY_CTA, SECONDARY_CTA } from "../lib/constants";

export function CtaButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "cta-row compact" : "cta-row"}>
      <a className="button primary" href={APP_URL}>
        {PRIMARY_CTA}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
      <Link className="button secondary" to="/quizzes/ai-native-score">
        {SECONDARY_CTA}
      </Link>
    </div>
  );
}
