import { CtaButtons } from "../components/CtaButtons";
import { Section } from "../components/Section";
import { useSeo } from "../hooks/useSeo";

const signals = [
  {
    title: "Ownership signal",
    text: "How clearly the worker frames the goal, controls decisions, handles tradeoffs, and remains accountable for the result.",
  },
  {
    title: "Execution signal",
    text: "How effectively the session moves from intent to useful output through coherent steps, revisions, and completion habits.",
  },
  {
    title: "Leverage signal",
    text: "How well AI expands capability, speed, exploration, and quality without replacing human judgment.",
  },
  {
    title: "Evidence quality",
    text: "How inspectable the work is: transcript clarity, sources, rationale, revision trail, and support for final claims.",
  },
  {
    title: "Overall AI Work Score",
    text: "A structured synthesis of the signals. Lower scores are early-stage signal, not a personal verdict or fixed label.",
  },
];

export default function ScoresPage() {
  useSeo(
    "AI Work Score explained",
    "Understand ProofOfAIWork ownership, execution, leverage, evidence quality, and overall score signals.",
    "/scores",
  );

  return (
    <section className="page-hero">
      <p className="eyebrow">Scores</p>
      <h1>AI Work Scores explain how the work happened.</h1>
      <p>
        ProofOfAIWork scores are designed to make real AI work easier to understand. They reward clear ownership,
        thoughtful execution, useful leverage, and inspectable evidence.
      </p>
      <Section title="Score signals">
        <div className="signal-stack">
          {signals.map((signal) => (
            <article className="signal-explainer" key={signal.title}>
              <h2>{signal.title}</h2>
              <p>{signal.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <div className="soft-callout">
        <h2>Low scores are not insults.</h2>
        <p>
          Early-stage scores usually mean the session needs clearer framing, stronger review, or better evidence. The
          goal is to help people improve and help evaluators trust what they see.
        </p>
      </div>
      <CtaButtons />
    </section>
  );
}
