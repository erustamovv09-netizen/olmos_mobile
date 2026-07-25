"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFavorites } from "@/context/FavoritesContext";

type User = {
  name: string;
  phone: string;
  loggedInAt: string;
};

type Product = {
  id: string;
  name: string;
  formattedPrice: string;
  image: string;
  category: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const [user, setUser] = useState<User | null>(null);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"saved" | "info">("saved");

  useEffect(() => {
    const stored = localStorage.getItem("olmos_user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => setAllProducts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const saved = allProducts.filter(p => favorites.includes(p.id));
    setSavedProducts(saved);
  }, [favorites, allProducts]);

  const handleLogout = () => {
    localStorage.removeItem("olmos_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.loggedInAt).toLocaleDateString("uz-UZ", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#f1f5f9", minHeight: "80vh", padding: "2.5rem 0 4rem" }}>
        <div className="container">

          {/* Profile Header Card */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
            borderRadius: "20px",
            padding: "2.5rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative orb */}
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", background: "rgba(59,130,246,0.15)", filter: "blur(60px)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", position: "relative", zIndex: 1 }}>
              {/* Avatar */}
              <div style={{
                width: "72px", height: "72px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", fontWeight: 900, color: "#fff",
                boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
                flexShrink: 0,
              }}>
                {initials || "👤"}
              </div>
              <div>
                <h1 style={{ color: "#fff", fontWeight: 900, fontSize: "1.4rem", marginBottom: "0.2rem" }}>{user.name}</h1>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{user.phone}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.4rem" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e", display: "inline-block" }} />
                  <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Kirgan: {joinDate}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "1.5rem", position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff" }}>{favorites.length}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Saqlangan</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {[
              { key: "saved", label: `❤️ Saqlangan (${favorites.length})` },
              { key: "info", label: "👤 Ma'lumotlarim" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "saved" | "info")}
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "10px",
                  border: "1.5px solid",
                  borderColor: activeTab === tab.key ? "#2563eb" : "#e2e8f0",
                  backgroundColor: activeTab === tab.key ? "#eff6ff" : "#fff",
                  color: activeTab === tab.key ? "#1d4ed8" : "#64748b",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "saved" && (
            <div>
              {savedProducts.length === 0 ? (
                <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "4rem 2rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>❤️</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>Hozircha saqlangan yo'q</h3>
                  <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>Yoqtirgan mahsulotlaringizni yurak belgisi bilan saqlang</p>
                  <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #1e40af, #2563eb)", color: "#fff", borderRadius: "12px", fontWeight: 700, textDecoration: "none" }}>
                    Mahsulotlarni ko'rish →
                  </Link>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                  {savedProducts.map(product => (
                    <div key={product.id} style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "all 0.3s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; }}>
                      <Link href={`/product/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                      </Link>
                      <div style={{ padding: "1rem" }}>
                        <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                          <h3 style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem", marginBottom: "0.3rem" }}>{product.name}</h3>
                        </Link>
                        <p style={{ color: "#2563eb", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.75rem" }}>{product.formattedPrice}</p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link href={`/product/${product.id}`} style={{ flex: 1, padding: "0.5rem", backgroundColor: "#eff6ff", color: "#2563eb", borderRadius: "8px", fontWeight: 700, fontSize: "0.8rem", textAlign: "center", textDecoration: "none" }}>
                            Ko'rish
                          </Link>
                          <button onClick={() => toggleFavorite(product.id)}
                            style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef2f2", color: "#ef4444", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "info" && (
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #f1f5f9" }}>
                <h2 style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.1rem" }}>Shaxsiy ma'lumotlar</h2>
              </div>
              <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "Ism", value: user.name, icon: "👤" },
                  { label: "Telefon", value: user.phone, icon: "📞" },
                  { label: "Kirgan vaqt", value: joinDate, icon: "📅" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{item.value}</div>
                    </div>
                  </div>
                ))}

                {/* Quick links */}
                <div style={{ marginTop: "0.5rem" }}>
                  <h3 style={{ fontWeight: 700, color: "#374151", fontSize: "0.9rem", marginBottom: "0.75rem" }}>Tezkor havolalar</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { label: "Biz bilan aloqa", href: "/contact", icon: "📍" },
                      { label: "Barcha mahsulotlar", href: "/", icon: "📱" },
                      { label: "Maxfiylik siyosati", href: "/privacy", icon: "🔒" },
                    ].map((link, i) => (
                      <Link key={i} href={link.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #f1f5f9", color: "#374151", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#f8fafc"; e.currentTarget.style.borderColor = "#f1f5f9"; }}>
                        <span>{link.icon}</span> {link.label}
                        <span style={{ marginLeft: "auto", color: "#94a3b8" }}>›</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Logout */}
                <button onClick={handleLogout}
                  style={{ width: "100%", padding: "0.9rem", backgroundColor: "#fef2f2", color: "#ef4444", border: "1.5px solid #fecaca", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem", marginTop: "0.5rem", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fef2f2"; e.currentTarget.style.color = "#ef4444"; }}>
                  🚪 Chiqish
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
