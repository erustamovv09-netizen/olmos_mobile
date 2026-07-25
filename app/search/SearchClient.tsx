"use client";

import { Product } from "@/data/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { Suspense } from "react";

function SearchContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { toggleFavorite, isFavorite } = useFavorites();

  const searchResults = products.filter(product => {
    const q = query.toLowerCase();
    return product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
  });

  return (
    <main style={{ backgroundColor: '#f9fafb', minHeight: '80vh', padding: '3rem 0' }}>
      <div className="container">
        <h1 className="font-bold" style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827' }}>
          Qidiruv natijalari: "{query}"
        </h1>

        {searchResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
            <h2 className="font-bold text-xl" style={{ marginBottom: '1rem' }}>Hech narsa topilmadi</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Boshqa so'z bilan qidirib ko'ring yoki bosh sahifaga qayting.</p>
            <Link href="/" className="btn-primary" style={{ backgroundColor: '#111827', color: '#fff', padding: '0.8rem 2rem' }}>
              Bosh sahifaga o'tish
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {searchResults.map((phone) => (
              <div key={phone.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #eaeaea', backgroundColor: '#fff' }}>
                <div style={{ position: 'relative' }}>
                  <Link href={`/product/${phone.id}`} style={{ display: 'block', height: '260px', backgroundColor: '#f9f9f9' }}>
                    <img src={phone.image} alt={phone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(phone.id);
                    }}
                    style={{ 
                      position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: isFavorite(phone.id) ? '#ef4444' : '#9ca3af', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite(phone.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Link href={`/product/${phone.id}`} style={{ flex: 1 }}>
                    <h3 className="font-semibold hover:text-primary transition-colors" style={{ fontSize: '1.125rem', color: '#111827', marginBottom: '0.5rem' }}>{phone.name}</h3>
                    <p className="font-bold text-xl" style={{ color: '#000000', marginBottom: '1rem' }}>{phone.formattedPrice}</p>
                  </Link>
                  <Link href={`/product/${phone.id}`} className="btn-primary" style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', marginTop: '1rem' }}>
                    Batafsil ma'lumot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPageClientWrapper({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div style={{ padding: '5rem 0', textAlign: 'center' }}>Qidirilmoqda...</div>}>
      <SearchContent products={products} />
    </Suspense>
  );
}
