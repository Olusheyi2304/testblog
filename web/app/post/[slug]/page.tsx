import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export const revalidate = 60;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15 requires us to await the params
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "categoryName": categories[0]->title
  }`;

  const post = await client.fetch(query, { slug });

  if (!post) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h1>Post Not Found</h1>
        <Link href="/" style={{ color: "var(--accent)" }}>Return to Home</Link>
      </div>
    );
  }

  return (
    <article className="fade-in" style={{ paddingBottom: "100px" }}>
      <header style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
        <span className="card-category" style={{ marginBottom: '1rem', display: 'block' }}>
           {post.categoryName || "Editorial"}
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '2rem', lineHeight: 1.1 }}>
          {post.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
          By <span style={{ color: '#fff' }}>{post.authorName || "Jollof Team"}</span> • {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1400).url()} 
            alt={post.title}
            className="glass" 
            style={{ width: '100%', borderRadius: '40px', maxHeight: '700px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} 
          />
        )}
      </header>
      
      <div className="portable-text" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <PortableText value={post.body} />
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
           <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>← Back to Jollof Feed</Link>
        </div>
      </div>
    </article>
  );
}