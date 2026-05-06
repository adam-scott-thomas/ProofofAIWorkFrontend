import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Section } from "../components/Section";
import { quizzes } from "../data/quiz";
import { useSeo } from "../hooks/useSeo";

export default function QuizzesPage() {
  useSeo("AI work quizzes", "Take lightweight ProofOfAIWork quizzes before verifying real AI work.", "/quizzes");

  return (
    <section className="page-hero narrow">
      <p className="eyebrow">Quizzes</p>
      <h1>Find your current AI work profile.</h1>
      <p>
        These quizzes are directional, not verified proof. They help you see which AI work habits are already strong and
        which are ready for more structure.
      </p>
      <Section title="Available quizzes">
        <div className="two-column">
          {quizzes.map((quiz) => (
            <Link className="feature-panel" to={`/quizzes/${quiz.slug}`} key={quiz.slug}>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <span className="text-link">
                Start quiz <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </section>
  );
}
