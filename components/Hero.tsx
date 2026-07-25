"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/data/products";

interface HeroProps {
  heroProduct?: Product | null;
}

export default function Hero({ heroProduct }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <section
      ref={heroRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem 0 2.5rem",
        borderBottom: "1px solid #f1f5f9",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        .hero-banner {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 420px;
          background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #1a1040 70%, #0a0f1e 100%);
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 3rem 3.5rem;
          flex: 1;
          max-width: 55%;
        }
        .hero-image-wrap {
          position: absolute;
          right: 3%;
          top: 50%;
          transform: translateY(-50%);
          width: 42%;
          max-width: 380px;
          height: 88%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .hero-image-card {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          position: relative;
          z-index: 1;
        }
        .hero-price-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }
        .hero-btn-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .hero-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .hero-banner {
            min-height: unset;
            flex-direction: column;
            align-items: stretch;
            border-radius: 16px;
          }
          .hero-content {
            max-width: 100%;
            padding: 2rem 1.5rem 1.5rem;
            order: 2;
          }
          .hero-image-wrap {
            position: relative;
            right: unset;
            top: unset;
            transform: none;
            width: 100%;
            max-width: 100%;
            height: 220px;
            order: 1;
          }
          .hero-image-card {
            border-radius: 16px 16px 0 0;
            height: 220px;
            padding: 0.75rem;
          }
          .hero-info-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .hero-price-row { gap: 0.75rem; margin-bottom: 1.5rem; }
        }

        @media (max-width: 480px) {
          .hero-content { padding: 1.25rem 1rem 1rem; }
          .hero-image-wrap { height: 200px; }
          .hero-image-card { height: 200px; }
          .hero-btn-row { flex-direction: column; align-items: stretch; }
          .hero-btn-row a { justify-content: center; text-align: center; }
          .hero-info-grid { grid-template-columns: 1fr; gap: 0.6rem; }
        }
      `}</style>

      <div className="container">
        {/* ═══ MAIN HERO BANNER ═══ */}
        <div className="hero-banner">
          {/* Animated Orbs */}
          <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)", borderRadius: "50%", animation: "orb-move 12s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-100px", left: "30%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", borderRadius: "50%", animation: "orb-move 15s ease-in-out infinite reverse", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "20%", right: "15%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", borderRadius: "50%", animation: "orb-move 10s ease-in-out infinite", animationDelay: "3s", pointerEvents: "none" }} />

          {/* Grid Pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

          {/* Phone Image */}
          <div className="hero-image-wrap">
            <div style={{ position: "absolute", inset: "10%", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.35) 0%, transparent 70%)", filter: "blur(30px)", animation: "pulse-glow 4s ease-in-out infinite" }} />
            <div className="hero-image-card animate-float">
              <img
                src={heroProduct?.image || "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800"}
                alt="iPhone 15 Pro Max"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="hero-content">
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: "99px", padding: "0.35rem 1rem", marginBottom: "1.25rem", backdropFilter: "blur(10px)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", display: "block", boxShadow: "0 0 8px #3b82f6" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#93c5fd", letterSpacing: "0.08em", textTransform: "uppercase" }}>Eng yangi model</span>
            </div>

            <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.875rem", color: "#fff", letterSpacing: "-0.03em" }}>
              iPhone 15{" "}
              <span style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200%", animation: "gradient-shift 3s ease infinite" }}>
                Pro Max
              </span>
            </h1>

            <p style={{ fontSize: "clamp(0.88rem, 2vw, 1.05rem)", color: "#94a3b8", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: "380px" }}>
              Titanium korpus, A17 Pro chip va professional kamera tizimi. Eng kuchli iPhone — qulay narxda.
            </p>

            {/* Price */}
            <div className="hero-price-row">
              <div>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.1rem" }}>Narxi</p>
                <p style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  $ {heroProduct ? heroProduct.price.toLocaleString() : "1,199"}
                </p>
              </div>
              <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.1rem" }}>Xotira</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0" }}>{heroProduct?.specs?.storage || "256 GB"}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "0.1rem" }}>RAM</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0" }}>{heroProduct?.specs?.ram || "8 GB"}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="hero-btn-row">
              <Link href="/product/iphone-15-pro-max"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#2563eb", color: "#fff", padding: "0.85rem 1.75rem", borderRadius: "14px", fontWeight: 700, fontSize: "0.92rem", transition: "all 0.3s", boxShadow: "0 8px 25px rgba(37,99,235,0.4)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(37,99,235,0.5)"; e.currentTarget.style.backgroundColor = "#3b82f6"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,99,235,0.4)"; e.currentTarget.style.backgroundColor = "#2563eb"; }}>
                Batafsil ko&apos;rish
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="tel:+998973857766"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(255,255,255,0.07)", color: "#e2e8f0", padding: "0.85rem 1.5rem", borderRadius: "14px", fontWeight: 600, fontSize: "0.92rem", transition: "all 0.3s", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Qo&apos;ng&apos;iroq
              </Link>
            </div>
          </div>

          {/* Shimmer line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent 0%, #2563eb 30%, #7c3aed 60%, #06b6d4 80%, transparent 100%)", opacity: 0.8 }} />
        </div>

        {/* ═══ BOTTOM INFO CARDS ═══ */}
        <div className="hero-info-grid">
          {[
            { icon: "🚚", title: "Tez yetkazib berish", desc: "O'zbekiston bo'ylab xavfsiz va tezkor yetkazib berish xizmati", color: "#dbeafe", iconBg: "#eff6ff", accent: "#2563eb" },
            { icon: "🎁", title: "Chegirmalar", desc: "Aksessuarlar uchun 50% gacha bayram chegirmalari", color: "#fee2e2", iconBg: "#fef2f2", accent: "#dc2626" },
            { icon: "🛡️", title: "Rasmiy Kafolat", desc: "Barcha mahsulotlar uchun 1 yillik ishonchli kafolat", color: "#dcfce7", iconBg: "#f0fdf4", accent: "#16a34a" },
          ].map((item, i) => (
            <div key={i}
              style={{ background: `linear-gradient(145deg, #fff, ${item.iconBg})`, borderRadius: "16px", padding: "1.5rem", border: `1px solid ${item.color}`, display: "flex", alignItems: "flex-start", gap: "1rem", transition: "all 0.35s", cursor: "default", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}`; e.currentTarget.style.borderColor = item.accent + "40"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = item.color; }}>
              <div style={{ fontSize: "1.6rem", width: "48px", height: "48px", borderRadius: "14px", backgroundColor: item.iconBg, border: `1px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#111827", marginBottom: "0.3rem" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
