import { Link } from "react-router";
import Seo from "../components/Seo";
import { BLOG_POSTS } from "../content/blog";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#121212]">
      <Seo
        title="AI Portfolio and Proof of AI Work Blog | ProofOfAIWork"
        description="Guides on verified AI portfolios, proof of AI work, hiring signal, and documenting AI-assisted projects credibly."
        canonical="https://proofofaiwork.com/blog"
      />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b66]">Blog</div>
          <h1 className="mt-4 text-5xl leading-[0.98] tracking-tight md:text-6xl">
            Proof, portfolios,
            <br />
            and AI-assisted work
          </h1>
          <p className="mt-6 text-[18px] leading-[1.7] text-[#3f3f3a]">
            Practical guidance for students, builders, and employers trying to make AI-assisted work more credible.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b66]">{post.eyebrow}</div>
              <h2 className="mt-3 text-2xl tracking-tight">{post.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#55554f]">{post.description}</p>
              <div className="mt-4 text-[12px] text-[#6b6b66]">{post.publishedAt}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
