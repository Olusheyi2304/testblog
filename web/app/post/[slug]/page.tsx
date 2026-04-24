import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// This makes the page update when you edit in Sanity
export const revalidate = 60;

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 1. Fetch the data for THIS specific slug
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  // 2. If no post is found, show this
  if (!post) {
    return <div className="container">Post not found</div>;
  }

  return (
    <article className="container animate-fade-in">
      {/* Back Button */}
      <Link href="/" className="back-button">← Back to Feed</Link>

      {/* Main Image */}
      <div className="post-header">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            className="full-post-image glass"
          />
        )}
        
        <h1 className="post-page-title">{post.title}</h1>
        
        <div className="post-meta">
          <span>By {post.authorName}</span> •
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* The Actual Content (The Story) */}
      <div className="portable-text-content">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
