"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function PostGrid({ posts }: { posts: any[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ margin: '40px 0', display: 'flex', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Search Jollof articles..." 
          className="newsletter-input" 
          style={{ maxWidth: '600px', border: '2px solid black', boxShadow: '4px 4px 0px black' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
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
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '100px 0' }}>
             <h2 style={{ fontSize: '2rem', opacity: 0.5 }}>No results found for "{search}"</h2>
          </div>
        )}
      </div>
    </div>
  );
}
