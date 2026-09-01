import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Maxfiylik Siyosati — Olmos Mobile",
  description: "Olmos Mobile do'konining maxfiylik siyosati va shaxsiy ma'lumotlarni himoya qilish shartlari.",
};

const sections = [
  {
    num: "1",
    title: "Ma'lumotlarni yig'ish",
    content: [
      "Olmos Mobile veb-sayti mijozlarining maxfiyligini hurmat qiladi. Saytimizdan foydalanish uchun hech qanday majburiy ro'yxatdan o'tish talab qilinmaydi.",
      "Saytimizga tashrif buyurganingizda, mahsulotlarni ko'rish va narxlar bilan tanishish uchun hech qanday shaxsiy ma'lumot kiritishingiz shart emas.",
      "Agar siz ixtiyoriy ravishda biz bilan Telegram, Instagram yoki telefon orqali bog'lansangiz, faqat muloqot uchun zarur bo'lgan ma'lumotlar (ism, telefon raqam) saqlanadi va uchinchi shaxslarga berilmaydi.",
    ],
  },
  {
    num: "2",
    title: "Ma'lumotlardan foydalanish",
    content: [
      "Siz tomonidan ixtiyoriy taqdim etilgan ma'lumotlar faqat quyidagi maqsadlarda ishlatiladi:",
      "• Buyurtmangizni tasdiqlash va yetkazib berish",
      "• Savol va muammolaringizga javob berish",
      "• Yangi mahsulotlar va maxsus takliflar haqida xabar berish (faqat roziligingiz asosida)",
      "Sizning shaxsiy ma'lumotlaringiz marketing maqsadlarida, reklama agentliklari yoki boshqa tashkilotlarga mutlaqo berilmaydi.",
    ],
  },
  {
    num: "3",
    title: "Xavfsizlik",
    content: [
      "Olmos Mobile mijozlar ma'lumotlarini himoya qilishni ustuvor vazifa deb biladi.",
      "Saytimiz orqali hech qanday to'lov amalga oshirilmaydi — barcha moliyaviy operatsiyalar yuzma-yuz yoki ishonchli to'lov tizimlari orqali bajariladi.",
      "Agar sizning ma'lumotlaringiz noto'g'ri ishlatilayotganini sezsangiz, darhol biz bilan bog'laning: +998 97 385 77 66.",
    ],
  },
  {
    num: "4",
    title: "Cookie fayllari",
    content: [
      "Saytimiz foydalanuvchi tajribasini yaxshilash maqsadida minimal cookie fayllaridan foydalanadi.",
      "Cookie fayllar faqat saytning to'g'ri ishlashi uchun zarur texnik ma'lumotlarni saqlaydi (masalan, saqlangan mahsulotlar ro'yxati).",
      "Brauzeringiz sozlamalaridan cookie fayllarni o'chirib qo'yishingiz mumkin, ammo bu saytning ayrim funksiyalarini cheklashi mumkin.",
    ],
  },
  {
    num: "5",
    title: "Uchinchi tomon xizmatlari",
    content: [
      "Saytimizda Unsplash (rasmlar) va Google Maps (manzil xaritasi) kabi uchinchi tomon xizmatlaridan foydalaniladi. Ushbu xizmatlar o'zlarining alohida maxfiylik siyosatiga ega.",
      "Telegramga havola bosilganda Telegram ilovasi ochiladi va uning maxfiylik siyosati qo'llaniladi.",
      "Biz ushbu uchinchi tomon platformalardagi sizning xatti-harakatingiz uchun mas'uliyat zimmasiga olmaymiz.",
    ],
  },
  {
    num: "6",
    title: "Sizning huquqlaringiz",
    content: [
      "Siz istalgan vaqt quyidagi huquqlarga egasiz:",
      "• Biz saqlab qo'ygan ma'lumotlaringizni so'rash va ko'rish",
      "• Noto'g'ri ma'lumotlarni to'g'rilashni talab qilish",
      "• Ma'lumotlaringizni o'chirishni talab qilish",
      "Ushbu huquqlardan foydalanish uchun: +998 97 385 77 66 yoki Instagram: @olmos_mobile orqali bog'laning.",
    ],
  },
  {
    num: "7",
    title: "Siyosatga o'zgartirishlar",
    content: [
      "Olmos Mobile ushbu maxfiylik siyosatini zaruriyat tug'ilganda yangilash huquqini o'z zimmasiga oladi.",
      "Katta o'zgartirishlar bo'lgan taqdirda, saytimizda tegishli e'lon joylashtiriladi.",
      "Saytdan foydalanishni davom ettirishingiz ushbu siyosatning yangilangan shartlari bilan rozi ekanligingizni bildiradi.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#f8fafc", minHeight: "80vh" }}>

        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          padding: "4rem 0 3rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", background: "rgba(59,130,246,0.12)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "0.35rem 0.9rem", fontSize: "0.78rem", color: "#94a3b8", marginBottom: "1.25rem" }}>
              🔒 Olmos Mobile
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              Maxfiylik Siyosati
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "500px", lineHeight: 1.7 }}>
              Sizning shaxsiy ma'lumotlaringiz bizga ishonib topshiriladi. Ularni qanday himoya qilishimiz haqida to'liq ma'lumot.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "3rem 0 5rem" }}>
          <div className="container" style={{ maxWidth: "800px" }}>

            {/* Intro card */}
            <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "14px", padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>ℹ️</span>
              <p style={{ color: "#1e40af", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Ushbu siyosat Olmos Mobile (Shahrisabz sh., Ming xil buyum savdo majmuasi) tomonidan taqdim etilgan veb-saytga taalluqli bo'lib, sizning shaxsiy hayotingizga hurmat asosida tuzilgan.
              </p>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {sections.map((section) => (
                <div key={section.num} style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #1e40af, #2563eb)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.875rem", flexShrink: 0 }}>
                      {section.num}
                    </div>
                    <h2 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>{section.title}</h2>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {section.content.map((line, i) => (
                      <p key={i} style={{ color: line.startsWith("•") ? "#374151" : "#4b5563", fontSize: "0.9rem", lineHeight: 1.75, paddingLeft: line.startsWith("•") ? "0.75rem" : 0 }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
  

            {/* Contact block */}
            <div style={{ marginTop: "2rem", backgroundColor: "#0f172a", borderRadius: "16px", padding: "2rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.3rem" }}>Savollaringiz bormi?</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Maxfiylik haqida har qanday savol uchun biz bilan bog'laning</p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href="tel:+998973857766" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.1rem", backgroundColor: "#1e293b", color: "#fff", borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.08)" }}>
                  📞 +998 97 385 77 66
                </a>
                <a href="https://t.me/buriyev_1201" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
                  ✈️ Telegram
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
