import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  // We fetch title, slug, image, and the title of the first category
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    slug,
    mainImage,
    "categoryName": categories[0]->title,
    publishedAt
  }`);

  return (
    <main className="fade-in">
      <section className="hero">
        <h1 className="hero-title">Engineering the<br/>Future of Content<span>.</span></h1>
        <p className="hero-subtitle">Experience the next generation of blogging with Jollof. Built for speed, designed for luxury.</p>
      </section>

      <div className="post-grid">
        {posts.map((post: any) => (
          <Link 
            key={post.slug.current} 
            href={`/post/${post.slug.current}`} 
            className="post-card"
          >
            {post.mainImage ? (
              <img 
                src={urlFor(post.mainImage).width(600).height(400).url()} 
                alt={post.title} 
                className="card-image" 
              />
            ) : (
              <div className="card-image" style={{ background: '#111' }} />
            )}
            <div className="card-content">
              <span className="card-category">{post.categoryName || "Editorial"}</span>
              <h2 className="card-title">{post.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '600' }}>Read Article —</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
