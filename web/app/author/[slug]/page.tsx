import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import PostGrid from "@/components/PostGrid";

export const revalidate = 60;

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await client.fetch(`{
    "author": *[_type == "author" && slug.current == $slug][0]{
      name,
      bio,
      image
    },
    "posts": *[_type == "post" && author->slug.current == $slug]{
      title,
      slug,
      mainImage,
      "excerpt": pt::text(body)
    }
  }`, { slug });

  if (!data.author) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Author Not Found</h1>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="fade-in">
      <header className="hero" style={{ padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.author.image && (
          <img 
            src={urlFor(data.author.image).width(200).height(200).url()} 
            alt={data.author.name}
            style={{ borderRadius: '50%', border: '4px solid black', marginBottom: '20px', boxShadow: '8px 8px 0px black' }}
          />
        )}
        <span className="featured-badge">Author Profile</span>
        <h1 className="hero-title">{data.author.name}</h1>
        {data.author.bio && (
          <div style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
             <p>{data.author.bio[0]?.children[0]?.text}</p>
          </div>
        )}
      </header>

      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '40px' }}>Articles by {data.author.name}</h2>
        <PostGrid posts={data.posts} />
      </section>
    </main>
  );
}
