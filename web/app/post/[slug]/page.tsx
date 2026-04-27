import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PostExtras from "@/components/PostExtras";

export const revalidate = 60;

function calculateReadingTime(blocks: any[]) {
  const wordsPerMinute = 200;
  const text = blocks
    .map((block: any) =>
      block._type !== 'block' || !block.children
        ? ''
        : block.children.map((child: any) => child.text).join('')
    )
    .join(' ');
  const wordCount = text.split(/\s+/g).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "categoryName": categories[0]->title,
    "categoryId": categories[0]->_id,
    "relatedPosts": *[_type == "post" && categories[0]->_id == ^.categories[0]->_id && slug.current != $slug][0...3]{
       title,
       slug,
       mainImage
    }
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

  const readingTime = calculateReadingTime(post.body || []);

  return (
    <article className="fade-in" style={{ paddingBottom: "100px" }}>
      <PostExtras />
      
      <header style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
        <span className="card-category" style={{ marginBottom: '1rem', display: 'block' }}>
           {post.categoryName || "Editorial"}
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          {post.title}
        </h1>
        
        <div className="reading-time" style={{ justifyContent: 'center' }}>
          <span>⏱️ {readingTime} min read</span>
          <span>•</span>
          <span>By {post.authorName || "Jollof Team"}</span>
          <span>•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
        
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1400).url()} 
            alt={post.title}
            className="featured-hero" 
            style={{ width: '100%', borderRadius: '40px', maxHeight: '700px', objectFit: 'cover', border: '2px solid var(--border-color)', boxShadow: '15px 15px 0px var(--border-color)', marginTop: '2rem' }} 
          />
        )}
      </header>
      
      <div className="portable-text" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <PortableText value={post.body} />
        
        <div style={{ marginTop: '5rem', borderTop: '2px solid var(--border-color)', paddingTop: '4rem' }}>
           <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>More from {post.categoryName || "Editorial"}</h3>
           <div className="related-grid">
             {post.relatedPosts?.map((rp: any) => (
               <Link key={rp.slug.current} href={`/post/${rp.slug.current}`} className="post-card">
                 {rp.mainImage && (
                   <img src={urlFor(rp.mainImage).width(400).height(250).url()} alt={rp.title} className="card-image" />
                 )}
                 <div className="card-content" style={{ padding: '15px' }}>
                   <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{rp.title}</h4>
                 </div>
               </Link>
             ))}
           </div>
           
           <div style={{ marginTop: '5rem', textAlign: 'center' }}>
             <Link href="/" style={{ display: 'inline-block', background: 'var(--border-color)', color: 'white', padding: '15px 40px', borderRadius: '12px', fontWeight: 800, textDecoration: 'none' }}>
               ← BACK TO FEED
             </Link>
           </div>
        </div>
      </div>
    </article>
  );
}