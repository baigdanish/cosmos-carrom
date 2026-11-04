import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { ProductDetail } from "./product-detail";

export const generateStaticParams = () =>
  products.map((p) => ({ slug: p.slug }));
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  return { title: p?.name || "Product", description: p?.description };
}
export default function Page({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
