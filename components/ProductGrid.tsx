"use client";
import Link from "next/link";
import { Product } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Apple: { bg: "#f0f4ff", text: "#1e40af", border: "#bfdbfe" },
  Samsung: { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  Xiaomi: { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa" },
  Aksessuarlar: { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" },
  Ishlatilgan: { bg: "#fefce8", text: "#854d0e", border: "#fde68a" },
};

function ProductCard({ phone }: { phone: Product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favored = isFavorite(phone.id);
  const catStyle = categoryColors[phone.category] ?? {
    bg: "#f9fafb",
    text: "#374151",
    border: "#e5e7eb",
  };

  return (
    <>
    <style>{`
      .card-badge {
        position: absolute;
        top: 0.85rem;
        left: 0.85rem;
        z-index: 2;
      }
      .card-fav-btn {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        z-index: 2;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.25s;
      }
      @media (max-width: 640px) {
        .card-badge {
          top: 0.4rem;
          left: 0.4rem;
          font-size: 0.58rem !important;
          padding: 0.12rem 0.4rem !important;
          gap: 0.15rem !important;
        }
        .card-fav-btn {
          top: 0.4rem;
          right: 0.4rem;
          width: 26px !important;
          height: 26px !important;
        }
        .card-fav-btn svg { width: 12px !important; height: 12px !important; }
      }
    `}</style>
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        border: "1px solid #eef2f7",
      }}
    >
      {/* Image Area */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f8faff",
          borderRadius: "14px 14px 0 0",
        }}
      >
        <Link
          href={`/product/${phone.id}`}
          className="product-img-link"
          style={{ display: "block", height: "240px" }}
        >
          <img
            src={phone.image}
            alt={phone.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.07)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
          {/* Dark overlay on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(15,23,42,0.15) 0%, transparent 60%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
            className="card-overlay"
          />
        </Link>

        {/* Category Badge */}
        <div
          className="card-badge"
          style={{
            backgroundColor: catStyle.bg,
            color: catStyle.text,
            border: `1px solid ${catStyle.border}`,
            padding: "0.25rem 0.65rem",
            borderRadius: "99px",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.03em",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {phone.condition === "ishlatilgan" && <span>♻️</span>}
          {phone.category}
        </div>

        {/* Favorite Button */}
        <button
          className="card-fav-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(phone.id);
          }}
          style={{
            backgroundColor: favored ? "#fef2f2" : "rgba(255,255,255,0.95)",
            border: favored ? "1.5px solid #fecaca" : "1.5px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: favored ? "#ef4444" : "#9ca3af",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label={favored ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={favored ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div
        className="card-info"
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Link href={`/product/${phone.id}`} style={{ flex: 1 }}>
          <h3
            className="card-title"
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "0.5rem",
              lineHeight: 1.3,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
          >
            {phone.name}
          </h3>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #1e40af, #2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              {phone.formattedPrice}
            </span>
          </div>

          {/* Mini specs */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {[phone.specs.storage, phone.specs.ram].map((spec, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </Link>

        <Link
          href={`/product/${phone.id}`}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "0.9rem",
            borderRadius: "12px",
            textAlign: "center",
            letterSpacing: "0.01em",
          }}
        >
          Batafsil ma'lumot
        </Link>
      </div>
    </div>
    </>
  );
}

function ProductGridContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  let filteredProducts = products;
  if (categoryFilter && categoryFilter !== "Barchasi") {
    filteredProducts = products.filter((p) => p.category === categoryFilter);
  }

  return (
    <section
      id="products"
      style={{ padding: "4rem 0 5rem", backgroundColor: "#f8faff" }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.35rem",
              }}
            >
              Olmos Mobile
            </p>
            <h2
              style={{
                fontSize: "1.85rem",
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.025em",
              }}
            >
              {categoryFilter && categoryFilter !== "Barchasi"
                ? categoryFilter === "Ishlatilgan"
                  ? "Ishlatilgan telefonlar"
                  : `${categoryFilter} smartfonlari`
                : "Ommabop mahsulotlar"}
            </h2>
          </div>
          <span
            style={{
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
              borderRadius: "99px",
              padding: "0.35rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            {filteredProducts.length} ta mahsulot
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              backgroundColor: "#fff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
              Ushbu ruknda hozircha mahsulotlar yo'q.
            </p>
          </div>
        ) : (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredProducts.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductGridClientWrapper({
  products,
}: {
  products: Product[];
}) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: "5rem 0",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "1rem",
          }}
        >
          Yuklanmoqda...
        </div>
      }
    >
      <ProductGridContent products={products} />
    </Suspense>
  );
}
