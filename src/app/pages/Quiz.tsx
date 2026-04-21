import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowRight, CheckCircle2, Copy, Share2, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import Seo from "../components/Seo";
import { QUIZ_QUESTIONS, computeQuizResult, getQuizResult } from "../content/quiz";

const RESULT_TONES: Record<string, { accent: string; glow: string; chip: string }> = {
  architect: { accent: "#7ca6ff", glow: "rgba(124,166,255,0.3)", chip: "Strategic" },
  operator: { accent: "#67ddb4", glow: "rgba(103,221,180,0.28)", chip: "Execution-first" },
  explorer: { accent: "#ffb45c", glow: "rgba(255,180,92,0.28)", chip: "Discovery-heavy" },
  synthesizer: { accent: "#d58cff", glow: "rgba(213,140,255,0.28)", chip: "Editorial" },
  "ghostwriter-addict": { accent: "#ff7e7e", glow: "rgba(255,126,126,0.26)", chip: "High-risk" },
};

export default function Quiz() {
  const { result: resultSlug } = useParams<{ result?: string }>();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const result = getQuizResult(resultSlug);
  const completed = QUIZ_QUESTIONS.every((question) => answers[question.id]);
  const previewResult = useMemo(() => (completed ? computeQuizResult(answers) : null), [answers, completed]);

  const shareCurrent = async (url: string, title: string, text: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ url, title, text });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Share link copied");
      }
    } catch {
      // user cancelled
    }
  };

  if (result) {
    const canonical = `https://proofofaiwork.com/quiz/${result.slug}`;
    const tone = RESULT_TONES[result.slug] ?? RESULT_TONES.architect;
    return (
      <div className="min-h-screen overflow-hidden bg-[#07111f] text-white">
        <Seo
          title={`${result.name} | AI Work Style Quiz`}
          description={result.shareDescription}
          canonical={canonical}
        />
        <AmbientBackdrop tone={tone} />
        <main className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <section className="rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.62)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI work style quiz
                </div>
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#07111f]"
                  style={{ background: tone.accent }}
                >
                  {tone.chip}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1 className="text-5xl tracking-tight md:text-6xl">{result.name}</h1>
                  <p className="mt-5 max-w-2xl text-[22px] leading-[1.45] text-[rgba(255,255,255,0.9)]">{result.hook}</p>
                </div>
                <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.46)]">Share angle</div>
                  <div className="mt-2 max-w-[220px] text-[14px] leading-[1.7] text-[rgba(255,255,255,0.76)]">
                    Clean enough to repost. Sharp enough to click. Strong enough to lead into the real product.
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[rgba(255,255,255,0.72)]">{result.summary}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.18)] p-5">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Strengths</div>
                  <ul className="mt-4 space-y-2 text-[14px] text-[rgba(255,255,255,0.86)]">
                    {result.strengths.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.18)] p-5">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Watch-outs</div>
                  <ul className="mt-4 space-y-2 text-[14px] text-[rgba(255,255,255,0.86)]">
                    {result.risks.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Share this result</div>
                <p className="mt-3 text-[15px] leading-[1.7] text-[rgba(255,255,255,0.76)]">
                  The quiz is the candy. The product is the spine. Share the result, then turn your actual workflow into a verified proof profile.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => shareCurrent(canonical, result.shareTitle, result.shareDescription)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[14px] font-medium text-[#07111f]"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(canonical);
                      toast.success("Quiz result link copied");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-[14px] text-white"
                  >
                    <Copy className="h-4 w-4" />
                    Copy link
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#eef6ff,#dff3eb_48%,#fff0d3)] p-6 text-[#07111f]">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(7,17,31,0.56)]">Next step</div>
                <h2 className="mt-3 text-3xl tracking-tight">See your real proof profile.</h2>
                <p className="mt-3 text-[15px] leading-[1.8] text-[rgba(7,17,31,0.72)]">
                  Quizzes are fun. Actual evidence is stronger. Upload your chats and projects to build a verified AI portfolio with public proof behind it.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to="/upload" className="inline-flex items-center gap-2 rounded-xl bg-[#07111f] px-4 py-2 text-[14px] font-medium text-white">
                    Build your proof
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/explore" className="rounded-xl border border-[rgba(7,17,31,0.12)] px-4 py-2 text-[14px] text-[#07111f]">
                    Explore public proof
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  const canonical = "https://proofofaiwork.com/quiz";

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <Seo
        title="AI Work Style Quiz | Are You Leading AI or Letting It Lead You?"
        description="Take the AI Work Style Quiz to see whether you work like an Architect, Operator, Explorer, Synthesizer, or something more dangerous."
        canonical={canonical}
      />
      <AmbientBackdrop tone={RESULT_TONES.architect} />
      <main className="relative mx-auto max-w-6xl px-6 py-16">
        <section className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.62)]">
              <Sparkles className="h-3.5 w-3.5" />
              Quiz
            </div>
            <h1 className="mt-5 text-5xl leading-[0.96] tracking-tight md:text-7xl">
              Are you leading AI,
              <br />
              or is it leading you?
            </h1>
            <p className="mt-6 max-w-3xl text-[19px] leading-[1.75] text-[rgba(255,255,255,0.76)]">
              This is acquisition candy, not a forensic verdict. Take the quiz, get your work-style archetype, then turn your actual workflow into proof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-[13px] text-[rgba(255,255,255,0.8)]">
                <CheckCircle2 className="h-4 w-4 text-[#73e0bf]" />
                Shareable result page
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-2 text-[13px] text-[rgba(255,255,255,0.8)]">
                <Zap className="h-4 w-4 text-[#ffcb6b]" />
                Built to drive people into the product
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.54)]">How it plays</div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.16)] p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.5)]">1. Hook</div>
                <div className="mt-2 text-[22px] tracking-tight">Fast result, strong identity</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-[rgba(255,255,255,0.72)]">
                  Architect. Operator. Explorer. Something riskier. The result should feel postable instantly.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.16)] p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.5)]">2. Conversion</div>
                <div className="mt-2 text-[22px] tracking-tight">Push them into proof</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-[rgba(255,255,255,0.72)]">
                  The quiz gets the click. The product closes the argument with evidence, scores, and public proof.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 space-y-6">
          {QUIZ_QUESTIONS.map((question, index) => (
            <section
              key={question.id}
              className="rounded-[28px] border border-[rgba(255,255,255,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Question {index + 1}</div>
              <h2 className="mt-3 text-3xl tracking-tight text-white">{question.prompt}</h2>
              <div className="mt-5 grid gap-2">
                {question.options.map((option) => {
                  const active = answers[question.id] === option.result;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.result }))}
                      className={`rounded-2xl border px-4 py-4 text-left text-[14px] transition-colors ${
                        active
                          ? "border-[#8bb6ff] bg-[rgba(139,182,255,0.14)] text-white"
                          : "border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.14)] text-[rgba(255,255,255,0.76)] hover:border-[rgba(255,255,255,0.22)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[32px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#eef6ff,#dff3eb_48%,#fff0d3)] px-8 py-10 text-[#07111f] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(7,17,31,0.56)]">Result</div>
              <h2 className="mt-3 text-4xl tracking-tight">
                {previewResult ? previewResult.name : "Answer the questions to reveal your result"}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-[rgba(7,17,31,0.74)]">
                {previewResult ? previewResult.hook : "The result page gets its own shareable URL so people can pass it around without losing the hook."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!previewResult}
                onClick={() => previewResult && navigate(`/quiz/${previewResult.slug}`)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#07111f] px-5 py-3 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reveal result
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/upload" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(7,17,31,0.14)] px-5 py-3 text-[14px] text-[#07111f]">
                Build your verified profile
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function AmbientBackdrop({ tone }: { tone: { glow: string } }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-[-8%] top-[5%] h-[420px] w-[420px] rounded-full blur-3xl" style={{ background: tone.glow }} />
      <div className="absolute right-[-12%] top-[-8%] h-[380px] w-[380px] rounded-full bg-[rgba(212,140,255,0.18)] blur-3xl" />
      <div className="absolute bottom-[-10%] left-[22%] h-[340px] w-[340px] rounded-full bg-[rgba(255,187,94,0.14)] blur-3xl" />
    </div>
  );
}
