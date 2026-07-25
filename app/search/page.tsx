import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/data/productService";
import SearchPageClientWrapper from "./SearchClient";

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <SearchPageClientWrapper products={products} />
      <Footer />
    </>
  );
}
