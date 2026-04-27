import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import PostGrid from "@/components/PostGrid";

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await client.fetch(`{
    "category": *[_type == "category" && slug.current == $slug][0]{
      title,
      description
    },
    "posts": *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)]{
      title,
      slug,
      mainImage,
      "excerpt": pt::text(body)
    }
  }`, { slug });

  if (!data.category) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Category Not Found</h1>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="fade-in">
      <header className="hero" style={{ padding: '4rem 0' }}>
        <span className="featured-badge">Browsing Category</span>
        <h1 className="hero-title">{data.category.title}</h1>
        {data.category.description && (
          <p className="hero-subtitle">{data.category.description}</p>
        )}
      </header>

      <PostGrid posts={data.posts} />
    </main>
  );
}
