import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav-header fade-in">
            <Link href="/" className="logo">JOLLOF<span>.COM</span></Link>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}>Articles</Link>
              <Link href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>About</Link>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
