import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@/types/post";

async function getPost(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

const components = {
  types: {
    image: ({ value }: { value: any }) => (
      <img
        src={urlFor(value).width(800).url()}
        alt="Blog content image"
        className="article-content-image"
      />
    ),
  },
};

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container animate-fade-in">
      <Link href="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        <ArrowLeft size={16} /> Back to feed
      </Link>

      <header className="article-header">
        {post.categories?.[0] && (
          <span className="post-category">{post.categories[0]}</span>
        )}
        <h1 className="article-title">{post.title}</h1>
        
        <div className="article-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}>
            <Calendar size={16} />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {post.mainImage && (
        <img 
          src={urlFor(post.mainImage).width(1200).url()} 
          alt={post.title} 
          className="article-main-image"
        />
      )}

      <div className="portable-text-content">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}
