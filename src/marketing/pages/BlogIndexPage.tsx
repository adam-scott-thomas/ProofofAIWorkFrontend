import { Link } from "react-router";
import { blogPosts } from "../content/blog";
import { useSeo } from "../hooks/useSeo";

export default function BlogIndexPage() {
  useSeo("Blog", "Essays and guides on AI fluency, AI-assisted work, hiring, and proof.", "/blog");

  return (
    <section className="page-hero">
      <p className="eyebrow">Blog</p>
      <h1>Proof, fluency, and the changing shape of work.</h1>
      <div className="post-list">
        {blogPosts.map((post) => (
          <Link className="post-row" to={`/blog/${post.slug}`} key={post.slug}>
            <span>{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString()}</time>
          </Link>
        ))}
      </div>
    </section>
  );
}
