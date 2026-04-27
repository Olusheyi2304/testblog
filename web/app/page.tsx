import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    slug,
    mainImage,
    "categoryName": categories[0]->title,
    "excerpt": pt::text(body)
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
              <div className="card-image" style={{ background: '#e5e7eb' }} />
            )}
            <div className="card-content">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-excerpt">
                {post.excerpt ? (post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt) : "Click to read more about this topic..."}
              </p>
              <div className="read-more-btn">
                Read More
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
