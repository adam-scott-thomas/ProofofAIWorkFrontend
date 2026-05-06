import { ArrowRight, BarChart3, CheckCircle2, FileText, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { Link } from "react-router";
import { CtaButtons } from "../components/CtaButtons";
import { Section } from "../components/Section";
import { blogPosts } from "../content/blog";
import { useSeo } from "../hooks/useSeo";
import { APP_URL } from "../lib/constants";

const scoreSignals = [
  ["Ownership signal", 88],
  ["Execution signal", 84],
  ["Leverage signal", 91],
  ["Evidence quality", 79],
  ["Overall AI Work Score", 86],
] as const;

export default function HomePage() {
  useSeo(
    "Prove how well you work with AI",
    "ProofOfAIWork turns real AI usage into a verifiable work profile for hiring, portfolios, and skill assessment.",
    "",
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">ProofOfAIWork</p>
          <h1>Prove how well you work with AI.</h1>
          <p className="hero-subhead">
            ProofOfAIWork turns real AI usage into a verifiable work profile for hiring, portfolios, and skill
            assessment.
          </p>
          <CtaButtons />
        </div>
        <div className="hero-visual" aria-label="AI work score preview">
          <div className="visual-grid">
            {scoreSignals.map(([label, value]) => (
              <div className="signal-line" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <div className="meter" aria-hidden="true">
                  <span style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="proof-ribbon">
            <ShieldCheck size={18} />
            Verified transcript evidence
          </div>
        </div>
      </section>

      <Section
        eyebrow="The gap"
        title="Claims are easy. Work patterns are harder to fake."
        lead="ProofOfAIWork shows the decision trail behind AI-assisted work, not only the final artifact."
      >
        <div className="three-column problem-grid">
          <article>
            <FileText size={24} />
            <h3>Resumes claim skill.</h3>
            <p>They are useful for summaries, but weak evidence for how someone uses AI in real work.</p>
          </article>
          <article>
            <Sparkles size={24} />
            <h3>Portfolios show outputs.</h3>
            <p>Outputs matter, but they can hide whether the person directed, checked, and improved the work.</p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h3>ProofOfAIWork shows process.</h3>
            <p>Structured signals reveal how someone actually works with AI across decisions and evidence.</p>
          </article>
        </div>
      </Section>

      <Section eyebrow="Workflow" title="How it works" lead="A simple route from real AI usage to shareable proof.">
        <div className="steps">
          {[
            ["Upload or complete an AI work session.", Upload],
            ["The system analyzes decisions, execution, leverage, and evidence.", BarChart3],
            ["You receive a structured score and shareable proof page.", CheckCircle2],
          ].map(([text, Icon], index) => (
            <article className="step" key={text as string}>
              <span>{index + 1}</span>
              <Icon size={24} />
              <h3>{text as string}</h3>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Score preview"
        title="A clearer read on AI work quality"
        lead="Scores are designed to reward accountable, inspectable work patterns."
        className="score-preview-section"
      >
        <div className="score-preview">
          <div>
            <p className="large-score">86</p>
            <p className="muted">Overall AI Work Score</p>
          </div>
          <div className="score-list">
            {scoreSignals.map(([label, value]) => (
              <div className="score-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Who it serves" title="Built for people evaluating real AI fluency">
        <div className="four-column audience-grid">
          {[
            ["Job seekers", "Prove AI fluency with evidence that hiring teams can inspect."],
            ["Employers", "Evaluate real AI work patterns beyond claims and polished samples."],
            ["Builders", "Turn AI sessions into proof that travels with your work."],
            ["Educators", "Assess applied AI skill without reducing it to tool trivia."],
          ].map(([title, text]) => (
            <article className="audience-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Quiz funnel"
        title="Start with a directional AI work profile"
        lead="Public quizzes help users understand their current habits before verifying real transcript evidence."
      >
        <div className="quiz-strip">
          {["What kind of AI worker are you?", "Are you AI-native or AI-assisted?", "Could you outperform with AI?"].map(
            (question) => (
              <Link to="/quizzes/ai-native-score" key={question}>
                {question}
                <ArrowRight size={18} />
              </Link>
            ),
          )}
        </div>
      </Section>

      <Section eyebrow="Blog" title="Field notes on AI fluency and proof">
        <div className="post-grid">
          {blogPosts.map((post) => (
            <Link className="post-card" to={`/blog/${post.slug}`} key={post.slug}>
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <section className="final-cta">
        <p className="eyebrow">Verify real work</p>
        <h2>Ready to verify real AI work?</h2>
        <a className="button primary" href={APP_URL}>
          Get your verified AI Work Score
          <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
