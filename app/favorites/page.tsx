import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/data/productService";
import FavoritesClientWrapper from "./FavoritesClient";

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <FavoritesClientWrapper products={products} />
      <Footer />
    </>
  );
}
