import { ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { getQuiz } from "../data/quiz";
import { useSeo } from "../hooks/useSeo";
import { APP_URL } from "../lib/constants";
import { calculateQuizScore, getProfile, isQuizComplete } from "../lib/quiz";

type QuizPageProps = {
  quizSlug: string;
};

export default function QuizPage({ quizSlug }: QuizPageProps) {
  const quiz = getQuiz(quizSlug) ?? getQuiz("ai-native-score");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useSeo(
    quiz?.title ?? "AI-Native Score",
    quiz?.description ?? "A directional AI work score quiz from ProofOfAIWork.",
    `/quizzes/${quizSlug}`,
  );

  const score = useMemo(() => (quiz ? calculateQuizScore(quiz, answers) : 0), [answers, quiz]);
  const profile = getProfile(score);
  const complete = quiz ? isQuizComplete(quiz, answers) : false;

  if (!quiz) {
    return null;
  }

  if (submitted) {
    return (
      <section className="page-hero quiz-result">
        <p className="eyebrow">Directional quiz result</p>
        <h1>{profile.label}</h1>
        <div className="result-score">
          <strong>{score}</strong>
          <span>/100</span>
        </div>
        <p>{profile.summary}</p>
        <p className="notice">
          This quiz is a directional self-assessment. It is not verified proof. A verified AI Work Score uses real
          transcript evidence and structured analysis.
        </p>
        <div className="two-column result-columns">
          <div className="feature-panel">
            <h2>Strengths</h2>
            <ul>
              {profile.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="feature-panel">
            <h2>Improvement areas</h2>
            <ul>
              {profile.improvements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cta-row">
          <a className="button primary" href={APP_URL}>
            Verify with a real transcript
            <ArrowRight size={18} />
          </a>
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
          >
            <RotateCcw size={18} />
            Retake quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero quiz-page">
      <p className="eyebrow">Free quiz</p>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <div className="quiz-progress" aria-label={`${Object.keys(answers).length} of ${quiz.questions.length} answered`}>
        <span style={{ width: `${(Object.keys(answers).length / quiz.questions.length) * 100}%` }} />
      </div>
      <form
        className="quiz-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (complete) setSubmitted(true);
        }}
      >
        {quiz.questions.map((question, index) => (
          <fieldset className="question-block" key={question.id}>
            <legend>
              <span>{index + 1}</span>
              {question.prompt}
            </legend>
            <div className="choice-grid">
              {question.choices.map((choice, choiceIndex) => (
                <label className="choice" key={choice.label}>
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === choiceIndex}
                    onChange={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="quiz-submit">
          <button className="button primary" type="submit" disabled={!complete}>
            See my score
            <ArrowRight size={18} />
          </button>
          <Link className="text-link" to="/quizzes">
            View all quizzes
          </Link>
        </div>
      </form>
    </section>
  );
}
