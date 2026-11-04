"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { formatINR } from "@/lib/format";
import { useStore } from "@/providers/store-provider";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
export function ProductDetail({ product: p }: { product: Product }) {
  const [image, setImage] = useState(0),
    [variant, setVariant] = useState(p.variants?.[0]?.id),
    [qty, setQty] = useState(1),
    { add, toggleWish, wishlist } = useStore(),
    router = useRouter(),
    v = p.variants?.find((x) => x.id === variant),
    price = v?.price ?? p.price,
    liked = wishlist.includes(p.id);
  const addNow = () => add(p.id, variant, qty);
  return (
    <>
      <div className="container py-8 pb-28 md:py-12">
        <nav className="mb-8 text-xs text-ink/55">
          <Link href="/">Home</Link> / <Link href="/shop/">Shop</Link> /{" "}
          {p.name}
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid gap-3 md:grid-cols-[90px_1fr]">
            <div className="order-2 flex gap-3 md:order-1 md:flex-col">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImage(i)}
                  className={`relative aspect-square w-20 border ${image === i ? "border-forest" : "border-transparent"}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
            <div
              style={{ width: "600px", height: " 600px" }}
              className="relative order-1 aspect-square bg-[#ede2ce] md:order-2"
            >
              <Image
                src={p.images[image]}
                alt={p.name}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="lg:pl-8">
            <p className="eyebrow">{p.category}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              {p.name}
            </h1>
            <p className="mt-5 text-2xl font-semibold">
              {formatINR(price)}{" "}
              {(v?.originalPrice ?? p.originalPrice) && (
                <del className="ml-2 text-base font-normal text-ink/35">
                  {formatINR(v?.originalPrice ?? p.originalPrice!)}
                </del>
              )}
            </p>
            <p className="mt-6 leading-7 text-ink/65">{p.description}</p>
            {p.variants && (
              <fieldset className="mt-8">
                <legend className="text-sm font-bold">Choose option</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.variants.map((x) => (
                    <label
                      key={x.id}
                      className={`cursor-pointer border px-4 py-3 text-sm ${variant === x.id ? "border-forest bg-forest text-white" : "border-black/20"}`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="variant"
                        value={x.id}
                        checked={variant === x.id}
                        onChange={() => setVariant(x.id)}
                      />
                      {x.label} · {formatINR(x.price)}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <div className="mt-8 flex gap-3">
              <div className="flex h-12 items-center border border-black/20">
                <button
                  className="icon-btn"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  className="icon-btn"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={addNow} className="btn btn-primary flex-1">
                Add to Cart
              </button>
              <button
                onClick={() => toggleWish(p.id)}
                className="icon-btn border border-black/20"
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={liked ? "fill-queen text-queen" : ""} />
              </button>
            </div>
            <button
              onClick={() => {
                addNow();
                router.push("/checkout/");
              }}
              className="btn btn-secondary mt-3 w-full"
            >
              Buy Now
            </button>
            <p className="mt-4 text-center text-xs text-ink/50">
              Shipping calculated at checkout
            </p>
            <div className="mt-10">
              <h2 className="font-serif text-2xl">Specifications</h2>
              <dl className="mt-4">
                {Object.entries({
                  ...p.specifications,
                  ...(v?.size ? { "Selected size": v.size } : {}),
                  ...(v?.thickness ? { "Selected ply": v.thickness } : {}),
                }).map(([a, b]) => (
                  <div
                    key={a}
                    className="grid grid-cols-2 border-t border-black/10 py-3 text-sm"
                  >
                    <dt className="text-ink/55">{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="mt-20 grid gap-8 border-t border-black/10 pt-12 md:grid-cols-3">
          {[
            ["Description", p.description],
            ["Care instructions", p.care],
            ["Delivery information", p.delivery],
          ].map(([a, b]) => (
            <section key={a}>
              <h2 className="font-serif text-xl">{a}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/60">{b}</p>
            </section>
          ))}
        </div>
        <section className="mt-24">
          <p className="eyebrow">You may also like</p>
          <h2 className="section-title mt-3">Complete the table</h2>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products
              .filter((x) => x.id !== p.id)
              .slice(0, 4)
              .map((x) => (
                <ProductCard key={x.id} product={x} />
              ))}
          </div>
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-black/10 bg-ivory p-3 shadow-2xl md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs">{p.name}</p>
          <p className="font-bold">{formatINR(price)}</p>
        </div>
        <button onClick={addNow} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </>
  );
}
