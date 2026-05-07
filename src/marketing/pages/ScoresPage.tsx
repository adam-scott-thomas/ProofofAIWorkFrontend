import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { Section } from "../components/Section";
import { APP_URL } from "../lib/constants";
import { useSeo } from "../hooks/useSeo";

const evaluatedSignals = [
  {
    title: "Ownership",
    questions: [
      "Did the person direct the work clearly?",
      "Did they make decisions, handle tradeoffs, and stay accountable for the outcome?",
    ],
    summary:
      "Ownership measures whether the human stayed in control of the work instead of letting the model set the direction.",
  },
  {
    title: "Execution",
    questions: [
      "Did the session move coherently from idea to iteration to completion?",
      'Or did it wander into the digital wilderness humans call "vibing"?',
    ],
    summary: "Execution measures whether the work advanced through useful steps toward a finished outcome.",
  },
  {
    title: "AI leverage",
    questions: [
      "Did AI meaningfully increase capability, speed, exploration, or quality?",
      "Did the operator amplify their thinking instead of outsourcing it?",
    ],
    summary: "AI leverage measures whether AI made the person more capable while leaving judgment accountable.",
  },
  {
    title: "Evidence quality",
    questions: ["Can someone inspect how the result was produced?"],
    summary: "Evidence quality measures whether the work trail is clear enough to review, trust, and learn from.",
  },
];

const evidenceExamples = [
  "revision trails",
  "rationale",
  "transcript clarity",
  "references",
  "recoverable decision history",
];

const scoreBands = [
  {
    range: "0-40",
    title: "Early-stage usage",
    text: "Heavy prompting dependence, weak ownership, or low evidence quality.",
  },
  {
    range: "40-70",
    title: "Functional AI-assisted work",
    text: "Clear usefulness, moderate structure, and improving execution habits.",
  },
  {
    range: "70-85",
    title: "Strong operator signal",
    text: "Good judgment, clear direction, effective iteration, and inspectable process.",
  },
  {
    range: "85-95",
    title: "Exceptional AI leverage",
    text: "High-output workflows with strong reasoning, orchestration, and evidence discipline.",
  },
  {
    range: "95+",
    title: "Rare",
    text: "Usually reflects highly structured operators, advanced workflows, or unusually strong execution consistency.",
  },
];

const improvementMoves = [
  "structure goals more clearly",
  "review outputs critically",
  "iterate intentionally",
  "provide stronger evidence",
  "stop accepting first-pass AI sludge",
];

export default function ScoresPage() {
  useSeo(
    "AI Work Scores explained",
    "AI Work Scores measure ownership, execution, judgment, iteration quality, evidence strength, and how effectively AI was leveraged to produce real outcomes.",
    "/scores",
  );

  return (
    <>
      <section className="page-hero scores-hero">
        <p className="eyebrow">AI Work Scores</p>
        <h1>AI Work Scores measure how effectively someone works with AI.</h1>
        <p>
          The score is not about whether someone used AI at all. It looks at ownership, execution, judgment, iteration
          quality, evidence strength, and how well AI was leveraged to produce real outcomes.
        </p>
        <div className="cta-row">
          <a className="button primary" href={APP_URL}>
            Get your verified AI Work Score
            <ArrowRight size={18} />
          </a>
          <Link className="button secondary" to="/demo/proofs">
            Inspect proof examples
            <FileSearch size={18} />
          </Link>
        </div>
      </section>

      <Section eyebrow="What a high score means" title="Skilled operation, not manual purity">
        <div className="two-column">
          <article className="feature-panel">
            <ShieldCheck size={22} />
            <h3>A high score does not mean</h3>
            <p>You wrote every word manually, avoided AI, memorized trivia, or grinded for 14 hours.</p>
          </article>
          <article className="feature-panel">
            <CheckCircle2 size={22} />
            <h3>It means</h3>
            <p>You used AI like a skilled operator instead of a slot machine.</p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Evaluation model" title="What the system evaluates">
        <div className="signal-stack">
          {evaluatedSignals.map((signal) => (
            <article className="signal-explainer" key={signal.title}>
              <h2>{signal.title}</h2>
              <p>{signal.summary}</p>
              <ul className="score-question-list">
                {signal.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Evidence quality" title="Strong proof can be inspected">
        <div className="artifact-grid">
          {evidenceExamples.map((example) => (
            <article key={example}>
              <span>Evidence</span>
              <h3>{example}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Score bands" title="What scores actually mean">
        <div className="score-band-grid">
          {scoreBands.map((band) => (
            <article className="score-band" key={band.range}>
              <strong>{band.range}</strong>
              <h3>{band.title}</h3>
              <p>{band.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Improvement" title="Low scores are not permanent">
        <div className="soft-callout">
          <h2>The score is not an IQ test. It is not a verdict on human worth.</h2>
          <p>
            It reflects the quality and inspectability of a specific body of work. Most scores improve dramatically
            when people make the work easier to direct, review, and verify.
          </p>
        </div>
        <div className="artifact-grid score-improvement-grid">
          {improvementMoves.map((move) => (
            <article key={move}>
              <span>Improve</span>
              <h3>{move}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why this matters" title="Resumes describe claims. AI Work Scores inspect process.">
        <div className="soft-callout">
          <h2>Anyone can paste polished output into a PDF.</h2>
          <p>
            Very few people can show how they thought, how they directed AI, how they corrected mistakes, and how they
            reached the final result. That difference matters.
          </p>
        </div>
      </Section>

      <section className="home-cta-band">
        <div>
          <p className="eyebrow">Get your verified AI Work Score</p>
          <h2>Upload a session. Analyze your workflow.</h2>
          <p>See how effectively you actually work with AI.</p>
          <a className="button primary" href={APP_URL}>
            Get your verified AI Work Score
            <ArrowRight size={18} />
          </a>
        </div>
        <div>
          <p className="eyebrow">Evaluation context</p>
          <h2>Score the work trail, not the person.</h2>
          <p>Use scores to understand ownership, leverage, evidence, and execution in a specific body of work.</p>
          <Link className="button secondary" to="/enterprise/hiring-ai-capable-talent">
            Hiring evaluation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
