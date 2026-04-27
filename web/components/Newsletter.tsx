"use client";
import { toast } from "sonner";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing to Jollof! 🌶️");
  };

  return (
    <section className="newsletter-section fade-in">
      <h2 className="newsletter-title">Join the Jollof Insiders</h2>
      <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Get the hottest engineering and design insights delivered to your inbox.</p>

      <form onSubmit={handleSubmit} className="newsletter-input-group">
        <input
          type="email"
          placeholder="your@email.com"
          className="newsletter-input"
          required
        />
        <button type="submit" className="newsletter-btn">
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
}
