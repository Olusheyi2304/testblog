import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

export const revalidate = 60;

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch the page data from Sanity
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    content
  }`;

  const pageData = await client.fetch(query, { slug });

  if (!pageData) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
        <h1>404 - Page Not Found</h1>
        <Link href="/" style={{ color: "var(--accent)" }}>Back to Jollof.com</Link>
      </div>
    );
  }

  return (
    <main className="fade-in" style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>
          {pageData.title}
        </h1>
        
        <div className="portable-text" style={{ background: 'var(--glass)', padding: '40px', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
          <PortableText value={pageData.content} />
        </div>
      </div>
    </main>
  );
}
