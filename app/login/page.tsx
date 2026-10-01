"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Foydalanuvchi ma'lumotlarini saqlash
    const user = {
      name: isLogin ? (phone.replace("+998", "").trim() || "Foydalanuvchi") : name,
      phone,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem("olmos_user", JSON.stringify(user));
    router.push("/profile");
  };

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.9rem 1rem 0.9rem 2.75rem",
    borderRadius: "12px",
    border: `1.5px solid ${focused === field ? "#2563eb" : "#e5e7eb"}`,
    outline: "none",
    fontSize: "0.95rem",
    color: "#0f172a",
    backgroundColor: focused === field ? "#f8faff" : "#f9fafb",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 3px rgba(37,99,235,0.1)" : "none",
  });


  return (
    <div className="login-page-wrap">
      <style>{`
        .login-page-wrap {
          min-height: 100vh;
          display: flex;
          font-family: inherit;
        }
        .login-left-panel {
          width: 42%;
          background: linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }
        .login-right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #fff;
        }
        @media (max-width: 768px) {
          .login-page-wrap {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .login-left-panel {
            width: 100% !important;
            padding: 1.5rem 1.25rem !important;
            gap: 1rem;
          }
          .login-left-panel h2 {
            font-size: 1.4rem !important;
            margin-bottom: 0.5rem !important;
          }
          .login-left-panel p {
            font-size: 0.82rem !important;
            margin-bottom: 0.75rem !important;
          }
          .login-left-features, .login-left-quote {
            display: none !important;
          }
          .login-right-panel {
            padding: 1.5rem 1.25rem !important;
          }
        }
      `}</style>

      {/* ===== LEFT PANEL — Brend ===== */}
      <div className="login-left-panel">
        {/* Background decorative orbs */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", background: "rgba(59,130,246,0.12)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "250px", height: "250px", background: "rgba(139,92,246,0.1)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Logo */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", position: "relative", zIndex: 1 }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #2563eb, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>Olmos Mobile</span>
        </Link>

        {/* Main text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
            Eng yaxshi<br />
            <span style={{ background: "linear-gradient(135deg, #60a5fa, #93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              smartfonlar
            </span><br />
            bir joyda
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "2rem" }}>
            Tanish bilishdan ham arzon narxlarda iPhone, Samsung, Xiaomi va boshqa brendlar.
          </p>

          {/* Features */}
          <div className="login-left-features">
            {[
              { icon: "✅", text: "Tekshirilgan va kafolatlangan mahsulotlar" },
              { icon: "🚀", text: "Tez yetkazib berish xizmati" },
              { icon: "🔒", text: "Xavfsiz to'lov tizimi" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
                <span style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="login-left-quote" style={{ position: "relative", zIndex: 1, padding: "1.25rem", background: "rgba(255,255,255,0.05)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.6, fontStyle: "italic" }}>
            "Shahrisabzning eng ishonchli mobil texnologiyalar do'koni"
          </p>
          <p style={{ color: "#60a5fa", fontSize: "0.78rem", fontWeight: 700, marginTop: "0.5rem" }}>— Olmos Mobile</p>
        </div>
      </div>

      {/* ===== RIGHT PANEL — Forma ===== */}
      <div className="login-right-panel">
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Tab switch */}
          <div style={{ display: "flex", backgroundColor: "#f1f5f9", borderRadius: "12px", padding: "4px", marginBottom: "2rem" }}>
            {["Kirish", "Ro'yxatdan o'tish"].map((label, i) => (
              <button
                key={i}
                onClick={() => setIsLogin(i === 0)}
                style={{
                  flex: 1,
                  padding: "0.65rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "all 0.25s ease",
                  backgroundColor: (i === 0) === isLogin ? "#fff" : "transparent",
                  color: (i === 0) === isLogin ? "#0f172a" : "#94a3b8",
                  boxShadow: (i === 0) === isLogin ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", marginBottom: "0.4rem" }}>
              {isLogin ? "Xush kelibsiz 👋" : "Hisob yarating"}
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              {isLogin ? "Kabinetingizga kirish uchun ma'lumot kiriting" : "Bir necha soniyada ro'yxatdan o'ting"}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Ism — faqat ro'yxatdan o'tishda */}
            {!isLogin && (
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focused === "name" ? "#2563eb" : "#9ca3af", pointerEvents: "none" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input
                  type="text" required
                  placeholder="Ism va Familiya"
                  value={name} onChange={e => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={inputBase("name")}
                />
              </div>
            )}

            {/* Telefon */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focused === "phone" ? "#2563eb" : "#9ca3af", pointerEvents: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <input
                type="tel" required
                placeholder="+998 90 123 45 67"
                value={phone} onChange={e => setPhone(e.target.value)}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                style={inputBase("phone")}
              />
            </div>

            {/* Parol */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focused === "password" ? "#2563eb" : "#9ca3af", pointerEvents: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input
                type={showPassword ? "text" : "password"} required
                placeholder={isLogin ? "Parolingiz" : "Yangi parol (min. 6 belgi)"}
                value={password} onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                style={{ ...inputBase("password"), paddingRight: "3rem" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, display: "flex" }}>
                {showPassword
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>

            {/* Parolni unutdingizmi */}
            {isLogin && (
              <div style={{ textAlign: "right", marginTop: "-0.25rem" }}>
                <button type="button" style={{ background: "none", border: "none", color: "#2563eb", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", padding: 0 }}>
                  Parolni unutdingizmi?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #1e40af, #2563eb)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "0.5rem",
                boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(37,99,235,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(37,99,235,0.3)"; }}
            >
              {isLogin ? "Kirish →" : "Hisob yaratish →"}
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#f1f5f9" }} />
            <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>yoki</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#f1f5f9" }} />
          </div>

          {/* Telegram login */}
          <a href="https://t.me/buriyev_1201" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", width: "100%", padding: "0.85rem", backgroundColor: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "12px", color: "#374151", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s", boxSizing: "border-box" as const }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#2AABEE"; e.currentTarget.style.backgroundColor = "#f0f9ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.backgroundColor = "#f8fafc"; }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#2AABEE"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.02 9.52c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.883.7z"/></svg>
            Telegram orqali bog'lanish
          </a>



          {/* Switch mode */}
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.875rem", marginTop: "1.5rem" }}>
            {isLogin ? "Akkauntingiz yo'qmi? " : "Allaqachon akkauntigiz bormi? "}
            <button onClick={() => setIsLogin(!isLogin)}
              style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: "0.875rem" }}>
              {isLogin ? "Ro'yxatdan o'ting" : "Kiring"}
            </button>
          </p>

          {/* Back link */}
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link href="/" style={{ color: "#94a3b8", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              ← Bosh sahifaga qaytish
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
