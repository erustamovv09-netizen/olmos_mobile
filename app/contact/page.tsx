"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const MAP_URL = "https://maps.google.com/?q=39.047313,66.827189";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const contacts = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Telefon",
      value: "+998 97 385 77 66",
      href: "tel:+998973857766",
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
      description: "Istalgan vaqt qo'ng'iroq qiling",
    },
    
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      label: "Telegram",
      value: "Telegram orqali bog'lanish",
      href: "https://t.me/buriyev_1201",
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      description: "Tezkor javob uchun yozing",
    },

    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      value: "@olmos_mobile",
      href: "https://instagram.com/olmos_mobile",
      color: "#ec4899",
      bg: "rgba(236,72,153,0.1)",
      description: "Yangiliklar va aksiyalar uchun kuzating",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Manzil",
      value: "Shahrisabz, Ming xil buyum savdo majmuasi",
      href: MAP_URL,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      description: "Bevosita do'konimizga tashrif buyuring",
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", backgroundColor: "#f8fafc" }}>
      <style>{`
        .contact-hero { padding: 5rem 0 4rem; }
        .contact-bottom-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
        .contact-card {
          display: block;
          background-color: #fff;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        .contact-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 640px) {
          .contact-hero { padding: 2rem 0 1.5rem !important; }
          .contact-hero h1 { font-size: 1.6rem !important; margin-bottom: 0.5rem !important; }
          .contact-hero p { font-size: 0.88rem !important; line-height: 1.45 !important; }
          .contact-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
            margin-bottom: 1.5rem !important;
          }
          .contact-card {
            padding: 0.85rem !important;
            border-radius: 14px !important;
          }
          .contact-card-icon {
            width: 40px !important;
            height: 40px !important;
            border-radius: 10px !important;
            margin-bottom: 0.6rem !important;
          }
          .contact-card-icon svg {
            width: 20px !important;
            height: 20px !important;
          }
          .contact-card-label { font-size: 0.65rem !important; margin-bottom: 0.2rem !important; }
          .contact-card-value { font-size: 0.88rem !important; margin-bottom: 0.25rem !important; }
          .contact-card-desc { font-size: 0.75rem !important; line-height: 1.3 !important; }
          .contact-card-action { margin-top: 0.6rem !important; font-size: 0.75rem !important; }
          .contact-bottom-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .contact-map-header { flex-direction: column; align-items: flex-start !important; gap: 0.75rem !important; }
        }
      `}</style>

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
            padding: "5rem 0 4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative blobs */}
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", background: "rgba(59,130,246,0.12)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(139,92,246,0.1)", filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />

          <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                padding: "0.4rem 1rem",
                fontSize: "0.8rem",
                color: "#94a3b8",
                marginBottom: "2rem",
              }}
            >
              <Link href="/" style={{ color: "#60a5fa", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")} onMouseLeave={(e) => (e.currentTarget.style.color = "#60a5fa")}>
                Bosh sahifa
              </Link>
              <span>›</span>
              <span>Biz bilan aloqa</span>
            </div>

            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "1rem",
                }}
                
              >
                Biz bilan aloqa
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Savollaringiz bormi? Yoki mahsulot haqida ma'lumot olmoqchimisiz? Biz doim yordam berishga tayyormiz!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section
          style={{
            padding: "4rem 0",
          }}
        >
          <div className="container">
            <div
              className="contact-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.25rem",
                marginBottom: "3rem",
              }}
            >
              {contacts.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-card"
                  style={{
                    transition: "all 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${0.1 + i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.1), 0 0 0 2px ${item.color}33`;
                    e.currentTarget.style.borderColor = `${item.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="contact-card-icon"
                    style={{
                      backgroundColor: item.bg,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Label */}
                  <div className="contact-card-label" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>
                    {item.label}
                  </div>

                  {/* Value */}
                  <div className="contact-card-value" style={{ fontWeight: 800, color: "#0f172a" }}>
                    {item.value}
                  </div>

                  {/* Description */}
                  <div className="contact-card-desc" style={{ color: "#64748b" }}>
                    {item.description}
                  </div>

                  {/* Arrow */}
                  <div className="contact-card-action" style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: item.color, fontWeight: 700 }}>
                    Bog'lanish
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Working Hours + Map */}
            <div
              className="contact-bottom-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.5s",
              }}
            >
              {/* Working Hours Card */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  padding: "2rem",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "46px", height: "46px", borderRadius: "14px", backgroundColor: "rgba(99,102,241,0.1)", color: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#0f172a" }}>Ish vaqtlari</h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    { day: "Dushanba – Shanba", time: "08:00 – 18:00", open: true },
                    { day: "Yakshanba", time: "09:00 – 17:00", open: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.85rem 1rem",
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#374151", fontSize: "0.95rem" }}>{item.day}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#22c55e",
                            boxShadow: "0 0 6px #22c55e",
                            display: "inline-block",
                          }}
                        />
                        <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "rgba(34,197,94,0.07)",
                    borderRadius: "12px",
                    border: "1px solid rgba(34,197,94,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", boxShadow: "0 0 6px #22c55e", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", color: "#16a34a", fontWeight: 600 }}>
                    Hozir ochiq — qo'ng'iroq qilishingiz mumkin!
                  </span>
                </div>
              </div>

              {/* Map Card */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ padding: "1.5rem 1.5rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "14px", backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a", lineHeight: 1.2 }}>Bizni toping</h2>
                      <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.15rem" }}>Shahrisabz sh., Ming xil buyum</p>
                    </div>
                  </div>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      backgroundColor: "#f59e0b",
                      color: "#fff",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "0.45rem 0.85rem",
                      borderRadius: "999px",
                      transition: "all 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#d97706"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f59e0b"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    Xaritada ochish
                  </a>
                </div>
                {/* Xarita + ustidagi kliklanadigan overlay */}
                <div style={{ position: "relative", lineHeight: 0 }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d300!2d66.827189!3d39.047313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4c9b108a424aaf%3A0x1293fd2d8ea89b4a!2sLux!5e1!3m2!1suz!2suz!4v1700000000000!5m2!1suz!2suz"
                    width="100%"
                    height="280"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Olmos Mobile joylashuvi"
                  />
                  {/* Shaffof overlay — xaritaning istalgan joyini bossangiz xaritada ochiladi */}
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Xaritada ochish"
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 10,
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
