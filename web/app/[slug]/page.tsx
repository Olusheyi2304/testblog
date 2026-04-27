import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export default async function SimplePage({ params }: any) {
  const { slug } = await params;

  // This finds the page you just wrote in Sanity
  const pageData = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`, 
    { slug }
  );

  if (!pageData) return <div style={{padding: '100px', color: 'white'}}>Page Not Found</div>;

  return (
    <main className="container fade-in" style={{ padding: '100px 0' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '40px' }}>{pageData.title}</h1>
      <div className="portable-text glass" style={{ padding: '40px', borderRadius: '30px' }}>
        <PortableText value={pageData.content} />
      </div>
    </main>
  );
}
