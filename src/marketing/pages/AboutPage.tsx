import { CtaButtons } from "../components/CtaButtons";
import { useSeo } from "../hooks/useSeo";

export default function AboutPage() {
  useSeo("About", "ProofOfAIWork helps people turn real AI usage into structured, verifiable work profiles.", "/about");

  return (
    <section className="page-hero narrow">
      <p className="eyebrow">About</p>
      <h1>We believe AI skill should be evaluated through real work.</h1>
      <p>
        ProofOfAIWork exists because AI fluency is becoming central to modern work, but most evaluation still depends on
        claims, screenshots, and vibes. The product turns AI sessions into structured signals that people can inspect,
        share, and improve from.
      </p>
      <p>
        The public site is the education layer. The app at app.proofofaiwork.com handles uploads, parsing, scoring,
        receipts, payments, and shareable reports.
      </p>
      <CtaButtons />
    </section>
  );
}
