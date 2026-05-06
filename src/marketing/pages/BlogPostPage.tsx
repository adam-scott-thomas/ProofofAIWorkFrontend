import { Link, useParams } from "react-router";
import { getBlogPost } from "../content/blog";
import { useSeo } from "../hooks/useSeo";
import NotFoundPage from "./NotFoundPage";

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  useSeo(
    post?.seoTitle ?? "Article not found",
    post?.seoDescription ?? "The requested ProofOfAIWork article was not found.",
    `/blog/${slug}`,
  );

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <article className="article">
      <Link className="text-link" to="/blog">
        Back to blog
      </Link>
      <p className="eyebrow">{post.category}</p>
      <h1>{post.title}</h1>
      <p className="article-description">{post.description}</p>
      <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString()}</time>
      <div className="article-body">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
