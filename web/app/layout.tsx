import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jollof Blog | Premium Insights",
  description: "A premium blogging platform built with Sanity and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="navbar glass">
          <div className="container nav-content">
            <Link href="/" className="logo">JOLLOF BLOG</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ padding: '4rem 0', textAlign: 'center', opacity: 0.3, fontSize: '0.875rem' }}>
          <div className="container">
            © {new Date().getFullYear()} Jollof Media. Powered by Sanity.
          </div>
        </footer>
      </body>
    </html>
  );
}
