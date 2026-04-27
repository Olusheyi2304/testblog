import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import PostGrid from "@/components/PostGrid";

export const revalidate = 60;

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    slug,
    mainImage,
    featured,
    "categoryName": categories[0]->title,
    "excerpt": pt::text(body)
  }`);

  const featuredPost = posts.find((p: any) => p.featured) || posts[0];
  const regularPosts = posts.filter((p: any) => p.slug.current !== featuredPost?.slug.current);

  return (
    <main className="fade-in">
      <section className="hero">
        <h1 className="hero-title">Engineering the<br/>Future of Content<span>.</span></h1>
        <p className="hero-subtitle">Experience the next generation of blogging with Jollof. Built for speed, designed for luxury.</p>
      </section>

      {featuredPost && (
        <Link href={`/post/${featuredPost.slug.current}`} className="featured-hero">
          <div className="featured-image-container">
            {featuredPost.mainImage ? (
              <img 
                src={urlFor(featuredPost.mainImage).width(1200).height(800).url()} 
                alt={featuredPost.title}
                className="featured-image"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#eee' }} />
            )}
          </div>
          <div className="featured-content">
            <span className="featured-badge">Featured Story</span>
            <h2 className="featured-title">{featuredPost.title}</h2>
            <p className="card-excerpt" style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
              {featuredPost.excerpt?.substring(0, 200)}...
            </p>
            <div className="read-more-btn" style={{ maxWidth: '200px' }}>Read Full Story</div>
          </div>
        </Link>
      )}

      <PostGrid posts={regularPosts} />

      <Newsletter />
    </main>
  );
}
