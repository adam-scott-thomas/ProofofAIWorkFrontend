import { Link } from "react-router";
import { useSeo } from "../hooks/useSeo";

export default function NotFoundPage() {
  useSeo("Page not found", "The requested ProofOfAIWork page was not found.", "/404");

  return (
    <section className="page-hero narrow">
      <p className="eyebrow">404</p>
      <h1>This page is not available.</h1>
      <p>The marketing site may have moved this resource. Start from the homepage or take the AI work quiz.</p>
      <div className="cta-row">
        <Link className="button primary" to="/">
          Go home
        </Link>
        <Link className="button secondary" to="/quizzes/ai-native-score">
          Take the free quiz
        </Link>
      </div>
    </section>
  );
}
