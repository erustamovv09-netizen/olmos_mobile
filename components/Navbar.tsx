"use client";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("olmos_user");
    if (stored) {
      try { setLoggedInUser(JSON.parse(stored)); } catch {}
    } else {
      setLoggedInUser(null);
    }
  }, [pathname]);

  // Menyu ochilganda scroll bloklansin
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  const categories = [
    { label: "Barcha smartfonlar", href: "/?category=Barchasi" },
    { label: "Apple iPhone", href: "/?category=Apple" },
    { label: "Samsung Galaxy", href: "/?category=Samsung" },
    { label: "Xiaomi", href: "/?category=Xiaomi" },
    { label: "Aksessuarlar", href: "/?category=Aksessuarlar" },
    { label: "♻️ Ishlatilgan", href: "/?category=Ishlatilgan" },
  ];

  return (
    <>
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
        backdropFilter: isScrolled ? "blur(20px) saturate(1.5)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid #f1f5f9",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: isScrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <style>{`
        .navbar-topbar { display: flex; }
        .navbar-main { display: flex; align-items: center; gap: 1.5rem; padding: 0.9rem 1.25rem; }
        .navbar-search { flex: 1; position: relative; max-width: 560px; }
        .navbar-actions { display: flex; gap: 1.25rem; align-items: center; flex-shrink: 0; }
        .navbar-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.4rem; border-radius: 8px; color: #374151; flex-shrink: 0; }
        .navbar-mobile-menu { display: none; }
        .navbar-cats { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; }
        .navbar-action-label { display: block; }
        .navbar-search-btn-text { display: inline; }
        .navbar-search-btn-icon { display: none !important; }

        @media (max-width: 768px) {
          .navbar-topbar { display: none !important; }
          .navbar-main { padding: 0.6rem 1rem; gap: 0.6rem; }
          .navbar-search { max-width: unset; }
          .navbar-actions { display: none !important; }
          .navbar-search-btn-text { display: none !important; }
          .navbar-search-btn-icon { display: block !important; }
          .navbar-hamburger { display: flex; align-items: center; justify-content: center; }
          .navbar-logo-wrap { width: 130px !important; height: 44px !important; background-size: 75% !important; }
          .navbar-cats { padding: 0 0.5rem; }
          .navbar-search input { padding: 0.6rem 0.75rem 0.6rem 2.5rem !important; font-size: 0.88rem !important; }
          .navbar-mobile-menu.open {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #fff;
            z-index: 1100;
            padding: 1.25rem 1rem;
            overflow-y: auto;
            gap: 0;
          }
        }
        @media (max-width: 480px) {
          .navbar-logo-wrap { width: 110px !important; background-size: 80% !important; }
          .navbar-main { gap: 0.5rem; padding: 0.5rem 0.75rem; }
        }
      `}</style>

      {/* Top info bar */}
      <div
        className="navbar-topbar"
        style={{
          background: "linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          padding: "0.45rem 0",
          fontSize: "0.8rem",
          color: "#94a3b8",
        }}
      >
        <div className="container flex justify-between items-center">
          <div className="flex gap-4">
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ color: "#3b82f6" }}>📍</span>
              Shahrisabz sh.
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ color: "#3b82f6" }}>📞</span>
              <a href="tel:+998973857766" style={{ color: "#cbd5e1", fontWeight: 600, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
                +998 97 385 77 66
              </a>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
            <span>Ish vaqti: 09:00 – 20:00</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="navbar-main container">
        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          <div
            className="navbar-logo-wrap"
            aria-label="Olmos Mobile"
            style={{
              width: "270px",
              height: "58px",
              flexShrink: 0,
              backgroundImage: "url('/logo.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "60%",
              backgroundPosition: "20% 47%",
              mixBlendMode: "multiply",
            }}
          />
        </Link>

        {/* Search Bar — desktop only */}
        <div className="navbar-search">
          <form onSubmit={handleSearch} style={{ display: "flex", width: "100%" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: searchFocused ? "#2563eb" : "#9ca3af", transition: "color 0.2s", pointerEvents: "none" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Mahsulotlarni qidirish..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                style={{ width: "100%", padding: "0.7rem 1rem 0.7rem 3rem", borderRadius: "12px 0 0 12px", border: `2px solid ${searchFocused ? "#2563eb" : "#e5e7eb"}`, borderRight: "none", outline: "none", fontSize: "0.95rem", backgroundColor: searchFocused ? "#f8faff" : "#f9fafb", color: "#111827", transition: "all 0.25s", boxSizing: "border-box" }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "2px solid #2563eb", padding: "0 1.25rem", borderRadius: "0 12px 12px 0", cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", transition: "all 0.25s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.4rem" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1d4ed8"; e.currentTarget.style.borderColor = "#1d4ed8"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.borderColor = "#2563eb"; }}>
              <svg className="navbar-search-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "none" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span className="navbar-search-btn-text">Qidirish</span>
            </button>
          </form>
        </div>

        {/* Action Icons — desktop only */}
        <div className="navbar-actions">
          <Link href="/favorites" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", color: "#374151", position: "relative", transition: "color 0.2s, transform 0.2s", textDecoration: "none" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.transform = "scale(1.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.transform = "scale(1)"; }}>
            <div style={{ position: "relative" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill={favorites.length > 0 ? "#ef4444" : "none"} stroke={favorites.length > 0 ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {favorites.length > 0 && (
                <span style={{ position: "absolute", top: "-6px", right: "-8px", backgroundColor: "#ef4444", color: "#fff", fontSize: "0.65rem", padding: "2px 5px", borderRadius: "9999px", fontWeight: 800, lineHeight: 1, minWidth: "18px", textAlign: "center", boxShadow: "0 2px 8px rgba(239,68,68,0.5)" }}>
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="navbar-action-label" style={{ fontSize: "0.7rem", fontWeight: 700 }}>Saqlanganlar</span>
          </Link>

          {loggedInUser ? (
            <Link href="/profile" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", color: "#2563eb", transition: "transform 0.2s", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 900 }}>
                {loggedInUser.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="navbar-action-label" style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2563eb" }}>Profilim</span>
            </Link>
          ) : (
            <Link href="/login" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", color: "#374151", transition: "color 0.2s, transform 0.2s", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2563eb"; e.currentTarget.style.transform = "scale(1.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.transform = "scale(1)"; }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span className="navbar-action-label" style={{ fontSize: "0.7rem", fontWeight: 700 }}>Kirish</span>
            </Link>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button className="navbar-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menyu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          {favorites.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-4px",
              backgroundColor: "#ef4444",
              color: "#fff",
              fontSize: "0.6rem",
              fontWeight: 900,
              minWidth: "18px",
              height: "18px",
              borderRadius: "99px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              lineHeight: 1,
              boxShadow: "0 0 0 2px #fff, 0 2px 8px rgba(239,68,68,0.5)",
              pointerEvents: "none",
              zIndex: 10,
            }}>
              {favorites.length}
            </span>
          )}
        </div>
      </div>

      {/* Categories Bar */}
      <div style={{ borderTop: "1px solid #f1f5f9", overflowX: "auto", scrollbarWidth: "none" }}>
        <div className="container navbar-cats">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href}
              style={{ whiteSpace: "nowrap", padding: "0.6rem 1rem", fontSize: "0.85rem", fontWeight: 600, color: "#4b5563", borderBottom: "2px solid transparent", transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.color = "#2563eb"; e.currentTarget.style.borderBottomColor = "#2563eb"; e.currentTarget.style.backgroundColor = "#f8faff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#4b5563"; e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.backgroundColor = "transparent"; }}>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay — OUTSIDE header to avoid backdrop-filter stacking context bug */}
    <div className={`navbar-mobile-menu${menuOpen ? " open" : ""}`}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
          <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0f172a" }}>📱 Olmos Mobile</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", borderRadius: "8px", color: "#374151" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>Kategoriyalar</p>
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href} onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", padding: "0.8rem 0.75rem", borderRadius: "10px", color: "#374151", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", transition: "all 0.15s", marginBottom: "0.25rem" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#374151"; }}>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Bottom actions */}
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/favorites" onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.8rem 0.75rem", borderRadius: "10px", color: "#374151", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={favorites.length > 0 ? "#ef4444" : "none"} stroke={favorites.length > 0 ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Saqlanganlar {favorites.length > 0 && <span style={{ backgroundColor: "#ef4444", color: "#fff", fontSize: "0.65rem", padding: "1px 6px", borderRadius: "99px", fontWeight: 800 }}>{favorites.length}</span>}
          </Link>

          <Link href={loggedInUser ? "/profile" : "/login"} onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.8rem 0.75rem", borderRadius: "10px", color: "#2563eb", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", backgroundColor: "#eff6ff" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            {loggedInUser ? `Profilim (${loggedInUser.name})` : "Kirish / Ro'yxatdan o'tish"}
          </Link>

          {/* Info */}
          <div style={{ padding: "0.75rem", backgroundColor: "#f8fafc", borderRadius: "10px", marginTop: "0.25rem" }}>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>📍 Shahrisabz sh., Ming xil buyum</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0.25rem 0 0" }}>📞 +998 97 385 77 66</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0.25rem 0 0" }}>🕐 09:00 – 20:00</p>
          </div>
        </div>
      </div>
    </>
  );
}
