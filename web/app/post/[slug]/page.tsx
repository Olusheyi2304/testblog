import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// Force the page to check for new Sanity content every 60 seconds
export const revalidate = 60;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. In Next.js 15, we MUST await params to get the slug
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image
  }`;

  const post = await client.fetch(query, { slug });

  // 3. Safety check: If no post is found in Sanity
  if (!post) {
    return (
      <div className="container" style={{ padding: "100px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Post Not Found</h1>
        <Link href="/" style={{ color: "#a855f7", textDecoration: "underline" }}>← Back to Jollof Blog Feed</Link>
      </div>
    );
  }

  return (
    <article className="container animate-fade-in" style={{ paddingBottom: "100px" }}>
      {/* Navigation / Back Button */}
      <div style={{ padding: "20px 0" }}>
        <Link href="/" className="back-button" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Feed
        </Link>
      </div>

      {/* Main Image Section */}
      <header className="post-header">
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            className="full-post-image glass"
            style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', marginBottom: '40px' }}
          />
        ) : (
          <div style={{ height: '300px', background: '#111', borderRadius: '24px', marginBottom: '40px' }} />
        )}

        <h1 className="post-page-title" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "20px", lineHeight: "1.2" }}>
          {post.title}
        </h1>

        <div className="post-meta" style={{ display: "flex", gap: "15px", opacity: 0.7, marginBottom: "50px", fontSize: "1rem" }}>
          <span>By <strong>{post.authorName || "Jollof Author"}</strong></span>
          <span>•</span>
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
              : "Just Published"}
          </span>
        </div>
      </header>

      {/* The Article Content */}
      <section className="portable-text-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>This post content is empty. Add text in Sanity Studio!</p>
        )}
      </section>
    </article>
  );
}