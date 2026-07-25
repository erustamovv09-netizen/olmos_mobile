import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: '60vh', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Ommaviy Oferta</h1>
        <div style={{ color: '#4b5563', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1rem' }}>Ushbu hujjat Olmos Mobile do'koni va xaridor o'rtasidagi elektron savdo-sotiq shartlarini belgilaydi.</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>1. Umumiy qoidalar</h2>
          <p style={{ marginBottom: '1rem' }}>Sayt orqali buyurtma berish orqali xaridor ushbu oferta shartlariga to'liq roziligini bildiradi.</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>2. Mahsulot va narxlar</h2>
          <p style={{ marginBottom: '1rem' }}>Saytdagi barcha narxlar milliy valyutada ko'rsatilgan. Do'kon narxlarni oldindan ogohlantirmasdan o'zgartirish huquqiga ega.</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem', color: '#111827' }}>3. Kafolat va qaytarish</h2>
          <p style={{ marginBottom: '1rem' }}>Kafolat shartlari va tovarlarni qaytarish tartibi O'zbekiston Respublikasi qonunchiligiga muvofiq amalga oshiriladi.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
