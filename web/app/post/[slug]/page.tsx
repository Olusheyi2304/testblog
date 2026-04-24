import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image
  }`;

  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div className="container">Post not found</div>;
  }

  return (
    <article className="fade-in" style={{ padding: '4rem 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="card-category">Editorial</span>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-2px', marginBottom: '2rem' }}>{post.title}</h1>
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1200).url()} 
            className="glass" 
            alt={post.title}
            style={{ width: '100%', borderRadius: '40px', maxHeight: '600px', objectFit: 'cover' }} 
          />
        )}
      </header>
      
      <div className="portable-text" style={{ maxWidth: '750px', margin: '0 auto' }}>
        <PortableText value={post.body} />
      </div>
    </article>
  );
}