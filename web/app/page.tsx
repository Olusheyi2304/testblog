import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { User } from "lucide-react";
import { Post } from "@/types/post";

export const revalidate = 60; // This tells the site to check for updates every 60 seconds

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    mainImage,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container">
      <section className="hero animate-fade-in">
        <h1 className="hero-title">
          Explore the <br />
          <span className="logo">Future of Content</span>
        </h1>
        <p className="hero-subtitle">
          A premium blogging experience powered by Sanity and Next.js. 
          Discover insights, stories, and the latest in technology.
        </p>
      </section>

      <div className="post-grid">
        {posts.map((post) => (
          <Link 
            key={post.slug.current} 
            href={`/post/${post.slug.current}`}
            className="post-card glass animate-fade-in"
          >
            <div className="post-image-container">
              {post.mainImage ? (
                <img 
                  src={urlFor(post.mainImage).width(600).url()} 
                  alt={post.title} 
                  className="post-image"
                />
              ) : (
                <div className="post-image" style={{ background: 'linear-gradient(45deg, #1e1e24, #2a2a30)' }} />
              )}
            </div>
            <div className="post-content">
              {post.categories?.[0] && (
                <span className="post-category">{post.categories[0]}</span>
              )}
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">
                Click to read more about this fascinating topic and dive into the details.
              </p>
              <div className="post-footer">
                {post.authorImage ? (
                  <img 
                    src={urlFor(post.authorImage).width(100).url()} 
                    alt={post.authorName} 
                    className="author-avatar"
                  />
                ) : (
                  <div className="author-avatar"><User size={16} /></div>
                )}
                <span className="author-name">{post.authorName}</span>
                <span className="post-date">
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
