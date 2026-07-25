import { getProductById } from "@/data/productService";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return notFound();
  }

  return <ProductDetailClient product={product} />;
}
