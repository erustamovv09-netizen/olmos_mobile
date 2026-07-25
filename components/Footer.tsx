"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '4rem 0 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)' }}></div>
      <div className="footer-glow" style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.12)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
      <div className="footer-glow" style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'rgba(139, 92, 246, 0.08)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

      <style>{`
        .footer-inner { padding: 4rem 0 2rem; }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          color: #64748b;
          font-size: 0.85rem;
        }
        @media (max-width: 640px) {
          .footer-inner { padding: 2.5rem 0 1.5rem; }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="container footer-inner">

        <div className="footer-grid">

          {/* Brand Column */}
          <div className={`slide-up-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <Link href="/" className="footer-float" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em', background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Olmos Mobile
              </h3>
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Tanish bilishdan ham arzon. Eng so'nggi smartfonlar uchun ishonchli do'koningiz.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <a href="https://instagram.com/olmos_mobile" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', color: '#fff', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ec4899'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(236,72,153,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://t.me/olmos_mobile" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', color: '#fff', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(59,130,246,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`slide-up-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: '#e2e8f0', display: 'inline-block', position: 'relative' }}>
              Tezkor havolalar
              <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40%', height: '2px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {['Bosh sahifa', 'Barcha smartfonlar', 'Saqlanganlar', 'Shaxsiy kabinet'].map((item, idx) => {
                const links = ['/', '/?category=Barchasi', '/favorites', '/login'];
                return (
                  <li key={idx}>
                    <Link href={links[idx]} style={{ color: '#94a3b8', transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.transform = 'translateX(6px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)' }}>
                      <span style={{ marginRight: '6px', fontSize: '0.7rem', opacity: 0.5 }}>›</span> {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div className={`slide-up-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: '#e2e8f0', display: 'inline-block', position: 'relative' }}>
              Ma'lumot
              <div style={{ position: 'absolute', bottom: '-4px', left: 0, width: '40%', height: '2px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Biz bilan aloqa', href: '/contact' },
                { label: 'Maxfiylik siyosati', href: '/privacy' },
                { label: 'Ommaviy oferta', href: '/terms' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} style={{ color: '#94a3b8', transition: 'all 0.25s ease', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.transform = 'translateX(6px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)' }}>
                    <span style={{ marginRight: '6px', fontSize: '0.7rem', opacity: 0.5 }}>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Phone quick link */}
            <a href="tel:+998973857766"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: '#fff', fontWeight: 700, fontSize: '1rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#93c5fd'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +998 97 385 77 66
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`footer-bottom slide-up-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <p>&copy; {new Date().getFullYear()} Olmos Mobile. Barcha huquqlar himoyalangan.</p>

          <button
            onClick={scrollToTop}
            style={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)' }}
            title="Tepaga qaytish"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
