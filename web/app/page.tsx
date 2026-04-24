import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    title, slug, mainImage, "cat": categories[0]->title
  }`);

  return (
    <main>
      <section className="hero fade-in">
        <h1 className="hero-title">Engineering the<br/>Future of Content.</h1>
        <p className="hero-subtitle">Experience the next generation of blogging with Jollof. Built for speed, designed for luxury.</p>
      </section>

      <div className="post-grid">
        {posts.map((post: any) => (
          <Link key={post.slug.current} href={`/post/${post.slug.current}`} className="post-card fade-in">
            {post.mainImage && (
              <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} className="card-image" />
            )}
            <div className="card-content">
              <span className="card-category">{post.cat || "Technology"}</span>
              <h2 className="card-title">{post.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>Read Article →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
