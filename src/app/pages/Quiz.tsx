import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import Seo from "../components/Seo";
import { QUIZ_QUESTIONS, computeQuizResult, getQuizResult } from "../content/quiz";

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
    return (
      <div className="min-h-screen bg-[#0f1116] text-white">
        <Seo
          title={`${result.name} | AI Work Style Quiz`}
          description={result.shareDescription}
          canonical={canonical}
        />
        <main className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <section className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(circle_at_top_left,rgba(79,124,255,0.24),transparent_35%),linear-gradient(180deg,#151823,#0f1116)] p-8 shadow-2xl">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[rgba(255,255,255,0.62)]">AI work style quiz</div>
              <h1 className="mt-4 text-5xl tracking-tight">{result.name}</h1>
              <p className="mt-5 max-w-2xl text-[20px] leading-[1.5] text-[rgba(255,255,255,0.88)]">{result.hook}</p>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-[rgba(255,255,255,0.72)]">{result.summary}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Strengths</div>
                  <ul className="mt-4 space-y-2 text-[14px] text-[rgba(255,255,255,0.86)]">
                    {result.strengths.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
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
              <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Share this result</div>
                <p className="mt-3 text-[15px] leading-[1.7] text-[rgba(255,255,255,0.76)]">
                  The quiz is the candy. The product is the spine. Share the result, then turn your actual workflow into a verified proof profile.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => shareCurrent(canonical, result.shareTitle, result.shareDescription)}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[14px] font-medium text-[#111114]"
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
                    className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.14)] px-4 py-2 text-[14px] text-white"
                  >
                    <Copy className="h-4 w-4" />
                    Copy link
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.5)]">Next step</div>
                <h2 className="mt-3 text-2xl tracking-tight">See your real proof profile.</h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-[rgba(255,255,255,0.76)]">
                  Quizzes are fun. Actual evidence is stronger. Upload your chats and projects to build a verified AI portfolio with public proof behind it.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to="/upload" className="rounded-lg bg-[#4F7CFF] px-4 py-2 text-[14px] font-medium text-white">
                    Build your proof
                  </Link>
                  <Link to="/explore" className="rounded-lg border border-[rgba(255,255,255,0.14)] px-4 py-2 text-[14px] text-white">
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
    <div className="min-h-screen bg-[#faf8f3] text-[#121212]">
      <Seo
        title="AI Work Style Quiz | Are You Leading AI or Letting It Lead You?"
        description="Take the AI Work Style Quiz to see whether you work like an Architect, Operator, Explorer, Synthesizer, or something more dangerous."
        canonical={canonical}
      />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b66]">Quiz</div>
          <h1 className="mt-4 text-5xl leading-[0.98] tracking-tight md:text-6xl">
            Are you leading AI,
            <br />
            or is it leading you?
          </h1>
          <p className="mt-6 text-[18px] leading-[1.7] text-[#3f3f3a]">
            This is acquisition candy, not a forensic verdict. Take the quiz, get your work-style archetype, then turn your actual workflow into proof.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {QUIZ_QUESTIONS.map((question, index) => (
            <section key={question.id} className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b66]">Question {index + 1}</div>
              <h2 className="mt-2 text-2xl tracking-tight">{question.prompt}</h2>
              <div className="mt-5 grid gap-2">
                {question.options.map((option) => {
                  const active = answers[question.id] === option.result;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.result }))}
                      className={`rounded-xl border px-4 py-3 text-left text-[14px] transition-colors ${
                        active
                          ? "border-[#315D8A] bg-[#EEF2F9] text-[#121212]"
                          : "border-[rgba(0,0,0,0.08)] bg-[#faf8f3] text-[#4a4a45] hover:border-[#A88F5F]"
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

        <section className="mt-10 rounded-3xl border border-[rgba(0,0,0,0.08)] bg-[#111114] px-8 py-10 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[rgba(255,255,255,0.58)]">Result</div>
              <h2 className="mt-3 text-3xl tracking-tight">
                {previewResult ? previewResult.name : "Answer the questions to reveal your result"}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-[rgba(255,255,255,0.74)]">
                {previewResult ? previewResult.hook : "The result page gets its own shareable URL so people can pass it around without losing the hook."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!previewResult}
                onClick={() => previewResult && navigate(`/quiz/${previewResult.slug}`)}
                className="rounded-lg bg-white px-4 py-2 text-[14px] font-medium text-[#111114] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reveal result
              </button>
              <Link to="/upload" className="rounded-lg border border-[rgba(255,255,255,0.16)] px-4 py-2 text-[14px] text-white">
                Build your verified profile
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
