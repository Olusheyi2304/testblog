import "./globals.css";
import Link from "next/link";
import { client } from "@/lib/sanity";

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch the dynamic menu links from Sanity
  const data = await client.fetch(`*[_type == "settings"][0]{ menuLinks }`);
  const navLinks = data?.menuLinks || [];

  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav-header fade-in">
            <Link href="/" className="logo">JOLLOF<span>.COM</span></Link>
            
            <div style={{ display: 'flex', gap: '25px' }}>
              {/* This is the dynamic part! */}
              {navLinks.map((link: any, index: number) => (
                <Link 
                  key={index} 
                  href={link.url} 
                  style={{ 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    opacity: 0.8
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
