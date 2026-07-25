"use client";

import { useState, useRef } from "react";
import { Product } from "@/data/products";
import Link from "next/link";

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "1.5px solid #e5e7eb",
  outline: "none",
  fontSize: "0.9rem",
  color: "#111827",
  backgroundColor: "#f9fafb",
  transition: "border-color 0.2s",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 700 as const,
  color: "#374151",
  marginBottom: "0.4rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Apple");
  const [condition, setCondition] = useState("yangi");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [color, setColor] = useState("");
  const [screen, setScreen] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        setUploadError(data.error || "Yuklashda xatolik");
      }
    } catch {
      setUploadError("Server bilan bog'lanishda xatolik");
    } finally {
      setUploading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "olmosadmin") {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setError("Parol noto'g'ri");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const id = editingProductId || name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const productData = {
      id, name,
      price: Number(price),
      formattedPrice: `$ ${Number(price).toLocaleString()}`,
      category, condition,
      description: description || "Mahsulot haqida ma'lumot.",
      image: image || "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80",
      specs: {
        storage: storage || "128 GB",
        ram: ram || "6 GB",
        color: color || "Black",
        screen: screen || "6.1\" Display",
      },
    };
    try {
      const res = await fetch("/api/products", {
        method: editingProductId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        fetchProducts();
        setEditingProductId(null);
        setName(""); setPrice(""); setCategory("Apple"); setCondition("yangi");
        setImage(""); setDescription(""); setStorage(""); setRam("");
        setColor(""); setScreen("");
        setSuccessMsg(editingProductId ? "Mahsulot yangilandi! ✅" : "Mahsulot qo'shildi! ✅");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      console.error(editingProductId ? "Failed to update product" : "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product: Product) => {
    try {
      setEditingProductId(product.id);
      setName(product.name || "");
      setPrice(product.price?.toString() || "");
      setCategory(product.category || "Apple");
      setCondition(product.condition || "yangi");
      setDescription(product.description || "");
      setImage(product.image || "");
      setStorage(product.specs?.storage || "");
      setRam(product.specs?.ram || "");
      setColor(product.specs?.color || "");
      setScreen(product.specs?.screen || "");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error setting edit product:", err);
      alert("Tahrirlashda xatolik yuz berdi. Iltimos sahifani yangilang.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Rostdan ham bu mahsulotni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch {
      console.error("Failed to delete product");
    }
  };

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "2.5rem 2rem", borderRadius: "20px", maxWidth: "420px", width: "100%", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
            <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 900 }}>Admin Panel</h1>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.5rem" }}>Kirish uchun parolni kiriting</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <input
                type="password"
                placeholder="Parol..."
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: error ? "1.5px solid #ef4444" : "1.5px solid #334155", backgroundColor: "#0f172a", color: "#fff", outline: "none", fontSize: "1rem", boxSizing: "border-box" }}
              />
              {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.5rem" }}>❌ {error}</p>}
            </div>
            <button type="submit" style={{ padding: "1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 800, cursor: "pointer", fontSize: "1rem" }}>
              Kirish →
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link href="/" style={{ color: "#475569", fontSize: "0.875rem" }}>← Saytga qaytish</Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "inherit" }}>

      {/* Responsive styles */}
      <style>{`
        .admin-topbar {
          background-color: #0f172a;
          padding: 0.875rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          flex-wrap: wrap;
        }
        .admin-topbar-title { font-size: 1.05rem; }
        .admin-topbar-sub { font-size: 0.72rem; }
        .admin-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
        }
        .admin-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 1.5rem;
          align-items: start;
        }
        .admin-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .admin-price-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .product-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          background-color: #fafafa;
          transition: all 0.2s;
          gap: 0.5rem;
        }
        .product-card-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex: 1;
          min-width: 0;
        }
        .product-card-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .admin-topbar { padding: 0.75rem 1rem; }
          .admin-topbar-title { font-size: 0.95rem; }
          .admin-topbar-sub { display: none; }
          .admin-container { padding: 1rem 0.75rem; }
          .admin-main-grid { grid-template-columns: 1fr; }
          .admin-specs-grid { grid-template-columns: 1fr 1fr; }
          .admin-price-cat-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .admin-topbar-title { font-size: 0.88rem; }
          .admin-container { padding: 0.75rem 0.5rem; }
          .admin-specs-grid { grid-template-columns: 1fr; }
          .admin-price-cat-grid { grid-template-columns: 1fr; }
          .product-card { flex-wrap: wrap; }
          .product-card-actions { width: 100%; justify-content: flex-end; }
        }
      `}</style>

      {/* Top bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.4rem" }}>⚙️</span>
          <div>
            <h1 className="admin-topbar-title" style={{ color: "#fff", fontWeight: 900, margin: 0 }}>Olmos Mobile — Admin</h1>
            <p className="admin-topbar-sub" style={{ color: "#64748b", margin: 0 }}>Boshqaruv paneli</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/" style={{ padding: "0.45rem 1rem", backgroundColor: "#1e293b", color: "#94a3b8", borderRadius: "8px", fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap" }}>
            🌐 Sayt
          </Link>
          <button onClick={() => setIsAuthenticated(false)} style={{ padding: "0.45rem 1rem", backgroundColor: "#ef4444", color: "#fff", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
            🔒 Chiqish
          </button>
        </div>
      </div>

      <div className="admin-container">

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Jami mahsulot", value: products.length, icon: "📦", color: "#3b82f6" },
            { label: "Yangi telefonlar", value: products.filter(p => p.condition !== "ishlatilgan").length, icon: "✨", color: "#10b981" },
            { label: "Ishlatilgan", value: products.filter(p => p.condition === "ishlatilgan").length, icon: "♻️", color: "#f59e0b" },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: "#fff", borderRadius: "14px", padding: "1rem 1.25rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{stat.icon}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, marginTop: "0.25rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main grid: Form + List */}
        <div className="admin-main-grid">

          {/* ===== FORM ===== */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", padding: "1.1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", margin: 0 }}>{editingProductId ? "✏️ Mahsulotni tahrirlash" : "➕ Yangi mahsulot qo'shish"}</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", marginTop: "0.2rem", marginBottom: 0 }}>Barcha maydonlarni to&apos;ldiring</p>
              </div>
              {editingProductId && (
                <button type="button" onClick={() => {
                  setEditingProductId(null);
                  setName(""); setPrice(""); setCategory("Apple"); setCondition("yangi");
                  setImage(""); setDescription(""); setStorage(""); setRam("");
                  setColor(""); setScreen("");
                }} style={{ padding: "0.35rem 0.7rem", backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.72rem", transition: "all 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"}>
                  Bekor qilish
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>

              {/* Mahsulot nomi */}
              <div>
                <label style={labelStyle}>📱 Mahsulot nomi</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Masalan: iPhone 15 Pro" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
              </div>

              {/* Narx va Kategoriya */}
              <div className="admin-price-cat-grid">
                <div>
                  <label style={labelStyle}>💵 Narxi ($)</label>
                  <input required type="number" min="1" value={price} onChange={e => setPrice(e.target.value)}
                    placeholder="800" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <div>
                  <label style={labelStyle}>🏷️ Kategoriya</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="Apple">Apple iPhone</option>
                    <option value="Samsung">Samsung Galaxy</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Aksessuarlar">Aksessuarlar</option>
                    <option value="Ishlatilgan">Ishlatilgan</option>
                  </select>
                </div>
              </div>

              {/* Holat */}
              <div>
                <label style={labelStyle}>🔄 Holati</label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {["yangi", "ishlatilgan"].map(c => (
                    <label key={c} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.6rem", borderRadius: "10px", border: `2px solid ${condition === c ? "#3b82f6" : "#e5e7eb"}`, backgroundColor: condition === c ? "#eff6ff" : "#f9fafb", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", color: condition === c ? "#1d4ed8" : "#6b7280", transition: "all 0.2s" }}>
                      <input type="radio" name="condition" value={c} checked={condition === c} onChange={() => setCondition(c)} style={{ display: "none" }} />
                      {c === "yangi" ? "✨ Yangi" : "♻️ Ishlatilgan"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tavsif */}
              <div>
                <label style={labelStyle}>📝 Tavsif</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Mahsulot haqida batafsil ma'lumot..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.5 }}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
              </div>

              {/* Specs */}
              <div>
                <label style={{ ...labelStyle, marginBottom: "0.65rem" }}>⚙️ Texnik xususiyatlar</label>
                <div className="admin-specs-grid">
                  {[
                    { label: "Xotira", val: storage, set: setStorage, ph: "256 GB" },
                    { label: "RAM", val: ram, set: setRam, ph: "8 GB" },
                    { label: "Rang", val: color, set: setColor, ph: "Space Black" },
                    { label: "Ekran", val: screen, set: setScreen, ph: '6.1" OLED' },
                  ].map(({ label, val, set, ph }) => (
                    <div key={label}>
                      <label style={{ ...labelStyle, fontSize: "0.72rem" }}>{label}</label>
                      <input value={val} onChange={e => set(e.target.value)}
                        placeholder={ph} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rasm — Galereya yoki URL */}
              <div>
                <label style={labelStyle}>🖼️ Mahsulot rasmi</label>

                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{ flex: 1, padding: "0.65rem 0.75rem", borderRadius: "10px", border: "2px dashed #3b82f6", backgroundColor: "#eff6ff", color: "#2563eb", fontWeight: 700, fontSize: "0.82rem", cursor: uploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", transition: "all 0.2s", opacity: uploading ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!uploading) { e.currentTarget.style.backgroundColor = "#dbeafe"; e.currentTarget.style.borderColor = "#1d4ed8"; } }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#eff6ff"; e.currentTarget.style.borderColor = "#3b82f6"; }}
                  >
                    {uploading ? (
                      <>
                        <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid #93c5fd", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Yuklanmoqda...
                      </>
                    ) : (
                      <><span style={{ fontSize: "1.1rem" }}>🖼️</span> Galereyaddan tanlash</>
                    )}
                  </button>

                  {image && (
                    <button
                      type="button"
                      onClick={() => { setImage(""); setUploadError(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      style={{ padding: "0.65rem 0.75rem", borderRadius: "10px", border: "1.5px solid #fca5a5", backgroundColor: "#fef2f2", color: "#ef4444", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fee2e2"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}
                    >
                      ✕ O&apos;chirish
                    </button>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }}
                  onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }} />

                {uploadError && (
                  <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                    ❌ {uploadError}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
                  <span style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 600 }}>yoki URL orqali</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
                </div>

                <input
                  value={image}
                  onChange={e => { setImage(e.target.value); setUploadError(""); }}
                  placeholder="https://images.unsplash.com/..."
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#3b82f6"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />

                {image && (
                  <div
                    id="img-preview-wrapper"
                    style={{ marginTop: "0.6rem", borderRadius: "10px", overflow: "hidden", border: "2px solid #e0e7ff", backgroundColor: "#f1f5f9", position: "relative", minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      key={image}
                      src={image}
                      alt="preview"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      style={{ width: "100%", height: "140px", objectFit: "contain", display: "block", padding: "0.5rem" }}
                      onError={e => {
                        e.currentTarget.style.display = "none";
                        const fallback = document.getElementById("img-preview-fallback");
                        if (fallback) fallback.style.display = "flex";
                      }}
                      onLoad={e => {
                        e.currentTarget.style.display = "block";
                        const fallback = document.getElementById("img-preview-fallback");
                        if (fallback) fallback.style.display = "none";
                      }}
                    />
                    <div id="img-preview-fallback" style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem", color: "#94a3b8", fontSize: "0.8rem", textAlign: "center" }}>
                      <span style={{ fontSize: "2rem" }}>🖼️</span>
                      <span>Rasm yuklanmadi — URL to&apos;g&apos;ri ekanligini tekshiring</span>
                    </div>
                    <div style={{ position: "absolute", bottom: "6px", right: "8px", backgroundColor: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "99px", fontWeight: 600 }}>Preview</div>
                  </div>
                )}
              </div>

              {successMsg && (
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", color: "#166534", fontWeight: 600, fontSize: "0.875rem" }}>
                  {successMsg}
                </div>
              )}

              <button type="submit" disabled={submitting} style={{ padding: "1rem", background: submitting ? "#94a3b8" : "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", fontSize: "1rem", marginTop: "0.25rem", transition: "all 0.2s" }}>
                {submitting ? "Saqlanmoqda..." : (editingProductId ? "💾 O'zgarishlarni saqlash" : "✅ Mahsulot qo'shish")}
              </button>
            </form>
          </div>

          {/* ===== PRODUCTS LIST ===== */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "1.1rem 1.25rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontWeight: 900, fontSize: "1rem", color: "#0f172a", margin: 0 }}>📦 Barcha mahsulotlar ({products.length})</h2>
              <button onClick={fetchProducts} style={{ padding: "0.4rem 0.85rem", backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                🔄 Yangilash
              </button>
            </div>

            <div style={{ padding: "0.75rem 1rem", maxHeight: "75vh", overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Yuklanmoqda...</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {products.map(product => (
                    <div key={product.id} className="product-card"
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#f8faff"; e.currentTarget.style.borderColor = "#e0e7ff"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fafafa"; e.currentTarget.style.borderColor = "#f1f5f9"; }}>
                      <div className="product-card-info">
                        <img src={product.image} alt={product.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "10px", border: "1px solid #e5e7eb", flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem", flexWrap: "wrap" }}>
                            <h3 style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.88rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>{product.name}</h3>
                            {product.condition === "ishlatilgan" && (
                              <span style={{ fontSize: "0.62rem", backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", padding: "0.1rem 0.35rem", borderRadius: "99px", fontWeight: 700, whiteSpace: "nowrap" }}>♻️ Ishlatilgan</span>
                            )}
                          </div>
                          <p style={{ color: "#64748b", fontSize: "0.78rem", margin: 0 }}>{product.formattedPrice} · {product.category}</p>
                          <p style={{ color: "#94a3b8", fontSize: "0.7rem", margin: 0 }}>{product.specs.storage} · {product.specs.ram}</p>
                        </div>
                      </div>
                      <div className="product-card-actions">
                        <button onClick={() => handleEditClick(product)} style={{ padding: "0.38rem 0.7rem", backgroundColor: "#fef3c7", color: "#d97706", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.72rem", whiteSpace: "nowrap" }}>
                          ✏️ Tahrirlash
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} style={{ padding: "0.38rem 0.7rem", backgroundColor: "#fef2f2", color: "#ef4444", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.72rem", whiteSpace: "nowrap" }}>
                          🗑️ O&apos;chirish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
