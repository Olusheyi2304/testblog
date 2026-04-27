"use client";

import { useEffect, useState } from "react";

export default function PostExtras() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const share = (platform: string) => {
    const url = window.location.href;
    const title = document.title;
    let shareUrl = "";

    if (platform === "twitter") shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    if (platform === "linkedin") shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    if (shareUrl) window.open(shareUrl, "_blank");
  };

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scroll}%` }} />
      </div>

      <div className="social-share">
        <button className="share-btn" onClick={() => share("twitter")} title="Share on Twitter">𝕏</button>
        <button className="share-btn" onClick={() => share("linkedin")} title="Share on LinkedIn">in</button>
        <button className="share-btn" onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied!");
        }} title="Copy Link">🔗</button>
      </div>
    </>
  );
}
