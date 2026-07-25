import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGridClientWrapper from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { getProducts } from "@/data/productService";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const heroProduct = products.find(p => p.id === "iphone-15-pro-max") || null;
  return (
    <>
      <Navbar />
      <main>
        <Hero heroProduct={heroProduct} />
        <ProductGridClientWrapper products={products} />
      </main>
      <Footer />
    </>
  );
}

