"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function ProductDetailClient({
  product,
}: {
  product: Product | undefined;
}) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) {
    return notFound();
  }

  const favored = isFavorite(product.id);

  const categoryColors: Record<string, string> = {
    Apple: "#2563eb",
    Samsung: "#16a34a",
    Xiaomi: "#d97706",
    Aksessuarlar: "#7c3aed",
  };
  const accentColor = categoryColors[product.category] ?? "#2563eb";

  return (
    <>
      <Navbar />
      <main className="product-detail-main" style={{ backgroundColor: "#f8faff", minHeight: "80vh", padding: "2.5rem 0", overflowX: "hidden" }}>
        <style>{`
          .product-detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 3rem;
          }
          .product-detail-card {
            background: #fff;
            padding: 2.5rem 3rem;
            border-radius: 24px;
            border: 1px solid #eef2f7;
            box-shadow: 0 8px 40px rgba(0,0,0,0.07);
            position: relative;
            overflow: hidden;
          }
          .product-img-box {
            background: linear-gradient(145deg, #f8faff 0%, #eef2f7 100%);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 380px;
            position: relative;
            border: 1px solid #e2e8f0;
          }
          @media (max-width: 640px) {
            .product-detail-main { padding: 1rem 0 !important; }
            .product-detail-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .product-detail-card {
              padding: 0.875rem !important;
              border-radius: 14px !important;
            }
            .product-img-box {
              min-height: 220px !important;
              max-height: 240px !important;
              border-radius: 12px !important;
            }
          }
        `}</style>
        <div className="container">
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              fontSize: "0.875rem",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2563eb")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Bosh sahifa
            </Link>
            <span style={{ color: "#cbd5e1" }}>›</span>
            <span style={{ color: "#94a3b8" }}>{product.name}</span>
          </div>

          {/* Main Card */}
          <div className="product-detail-card product-detail-grid">
            {/* Subtle BG decoration */}
            <div
              style={{
                position: "absolute",
                top: "-150px",
                right: "-150px",
                width: "400px",
                height: "400px",
                background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* Product Image */}
            <div className="product-img-box">
              {/* Glow behind */}
              <div
                style={{
                  position: "absolute",
                  inset: "15%",
                  background: `radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 70%)`,
                  pointerEvents: "none",
                  filter: "blur(20px)",
                }}
              />
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: imgLoaded ? 1 : 0,
                  transform: imgLoaded ? "translateY(0)" : "translateY(10px)",
                  animation: imgLoaded ? "floatSlow 5s ease-in-out infinite" : "none",
                }}
              />
            </div>

            {/* Product Details */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
              {/* Top row: Category + Favorite */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}30`,
                    padding: "0.3rem 0.9rem",
                    borderRadius: "99px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {product.category}
                </span>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: favored ? "#fef2f2" : "#f8faff",
                    border: favored ? "1.5px solid #fecaca" : "1.5px solid #e2e8f0",
                    borderRadius: "99px",
                    padding: "0.45rem 1rem 0.45rem 0.75rem",
                    cursor: "pointer",
                    color: favored ? "#ef4444" : "#64748b",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    transition: "all 0.25s var(--ease-spring)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.boxShadow = favored
                      ? "0 4px 15px rgba(239,68,68,0.2)"
                      : "0 4px 15px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={favored ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {favored ? "Saqlangan" : "Saqlash"}
                </button>
              </div>

              {/* Product Name */}
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  color: "#0f172a",
                  marginBottom: "0.75rem",
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: "0.4rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}90)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {product.formattedPrice}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "#475569",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                  padding: "1rem 1.25rem",
                  backgroundColor: "#f8faff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  borderLeft: `3px solid ${accentColor}`,
                }}
              >
                {product.description}
              </p>

              {/* Specs Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  { label: "Xotira", value: product.specs.storage, icon: "💾" },
                  { label: "RAM", value: product.specs.ram, icon: "⚡" },
                  { label: "Ekran", value: product.specs.screen, icon: "📱" },
                  { label: "Rang", value: product.specs.color, icon: "🎨" },
                ].map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      background: "linear-gradient(145deg, #f8faff, #f1f5f9)",
                      padding: "1rem 1.1rem",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
                      e.currentTarget.style.borderColor = `${accentColor}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {spec.icon}
                    </div>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {spec.label}
                    </p>
                    <p style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {/* Phone Button */}
                <a
                  href="tel:+998973857766"
                  style={{
                    width: "100%",
                    padding: "1.1rem",
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    color: "#fff",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    textDecoration: "none",
                    boxShadow: "0 8px 25px rgba(15,23,42,0.25)",
                    transition: "all 0.3s var(--ease-spring)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,23,42,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(15,23,42,0.25)";
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "0.04em" }}>
                    TELEFON ORQALI BOG'LANISH
                  </span>
                </a>

                {/* Telegram + Instagram */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <a
                    href="https://t.me/buriyev_1201"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.9rem",
                      backgroundColor: "#fff",
                      color: "#374151",
                      borderRadius: "14px",
                      border: "1.5px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      transition: "all 0.3s var(--ease-spring)",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(37,99,235,0.15)";
                      e.currentTarget.style.borderColor = "#2563eb";
                      e.currentTarget.style.color = "#2563eb";
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#374151";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    TELEGRAM
                  </a>

                  <a
                    href="https://instagram.com/olmos_mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.9rem",
                      backgroundColor: "#fff",
                      color: "#374151",
                      borderRadius: "14px",
                      border: "1.5px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      transition: "all 0.3s var(--ease-spring)",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(236,72,153,0.15)";
                      e.currentTarget.style.borderColor = "#ec4899";
                      e.currentTarget.style.color = "#ec4899";
                      e.currentTarget.style.backgroundColor = "#fdf2f8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#374151";
                      e.currentTarget.style.backgroundColor = "#fff";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    INSTAGRAM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
