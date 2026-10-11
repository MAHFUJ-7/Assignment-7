import { notFound } from "next/navigation";
import { ProductDetailsView } from "@/app/productDetails/[id]/page";

const PRODUCTS_URL = "https://openapi.programming-hero.com/api/bazardor/products";

async function fetchProductBySlug(slug) {
  const response = await fetch(`${PRODUCTS_URL}?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) return null;

  const data = await response.json();
  const products = Array.isArray(data) ? data : data?.value;
  return Array.isArray(products)
    ? products.find((product) => product.slug === slug) ?? null
    : null;
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailsView product={product} />;
}
