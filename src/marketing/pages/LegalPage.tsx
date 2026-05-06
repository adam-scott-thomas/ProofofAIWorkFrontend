import { useSeo } from "../hooks/useSeo";

type LegalPageProps = {
  kind: "privacy" | "terms";
};

export default function LegalPage({ kind }: LegalPageProps) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";

  useSeo(title, `${title} for ProofOfAIWork.`, `/${kind}`);

  return (
    <article className="article legal">
      <p className="eyebrow">ProofOfAIWork</p>
      <h1>{title}</h1>
      <p className="article-description">Last updated May 5, 2026.</p>
      {isPrivacy ? (
        <div className="article-body">
          <p>
            ProofOfAIWork is designed around work evidence. The marketing site collects only the information needed to
            operate the site, understand aggregate usage, and route users to the application.
          </p>
          <p>
            Verified scoring, uploads, payments, authentication, and reports are handled by the app experience at
            app.proofofaiwork.com. Do not submit sensitive information through public quiz responses.
          </p>
          <p>
            We do not sell public quiz answers. Operational logs and analytics may be used to secure, maintain, and
            improve the service.
          </p>
        </div>
      ) : (
        <div className="article-body">
          <p>
            The public marketing site provides educational content and directional quizzes. Quiz results are not
            verified proof and should not be represented as transcript-backed scores.
          </p>
          <p>
            The verified app experience may include additional terms for uploads, payments, receipts, and shareable
            reports. Users are responsible for submitting work they have the right to share.
          </p>
          <p>
            ProofOfAIWork may update public content, quizzes, and score explanations as the product evolves.
          </p>
        </div>
      )}
    </article>
  );
}
