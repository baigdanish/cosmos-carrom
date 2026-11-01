import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { BoardArt } from "@/components/ui/board-art";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { FAQ } from "@/components/ui/faq";
const cats = [
  [
    "Carrom Boards",
    "A board for first games through match play.",
    "/images/board-walnut.svg",
  ],
  [
    "Strikers & Coins",
    "Balanced pieces for a clean, confident shot.",
    "/images/detail-red.svg",
  ],
  [
    "Stands",
    "Set a comfortable, steady playing height.",
    "/images/detail-forest.svg",
  ],
  [
    "Care & Accessories",
    "Keep every match smooth and neatly stored.",
    "/images/detail-honey.svg",
  ],
];
export default function Home() {
  return (
    <>
      <section className="overflow-hidden border-b border-black/10">
        <div className="container grid min-h-[680px] items-center gap-8 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">The table is ready</p>
            <h1 className="mt-5 max-w-xl font-serif text-[clamp(3.2rem,7vw,6.2rem)] leading-[.92] tracking-[-.045em] text-forest">
              Bring Home the Perfect Carrom Game.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-ink/70">
              From first flicks to exacting match play, find a board built for
              the way your home gathers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop/?category=Carrom%20Boards"
                className="btn btn-primary"
              >
                Shop Carrom Boards <ArrowRight className="ml-2" size={17} />
              </Link>
              <Link
                href="/shop/?category=Care%20%26%20Accessories"
                className="btn btn-secondary"
              >
                Explore Accessories
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-14 rounded-full bg-[#dfd0b3] blur-3xl" />
            <BoardArt className="relative mx-auto w-full max-w-[650px] rotate-[-2deg]" />
          </div>
        </div>
      </section>
      <section className="container py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Find your game</p>
            <h2 className="section-title mt-3">Made for every match</h2>
          </div>
          <Link href="/shop/" className="hidden text-sm font-bold md:block">
            View all products →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cats.map(([n, d, i]) => (
            <Link
              href={`/shop/?category=${encodeURIComponent(n)}`}
              key={n}
              className="group border border-black/10 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={i}
                  fill
                  alt=""
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl">{n}</h3>
              <p className="mt-2 hidden text-sm leading-6 text-ink/60 sm:block">
                {d}
              </p>
              <p className="mt-5 text-xs font-bold text-queen">EXPLORE →</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#eee5d4] py-24">
        <div className="container">
          <p className="eyebrow">House favourites</p>
          <h2 className="section-title mt-3">Boards worth gathering around</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-7">
            {products
              .filter((p) => p.featured)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </section>
      <section className="container grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[5/4] bg-[#e5d7bc]">
          <Image
            src="/images/detail-walnut.svg"
            fill
            alt="Close-up illustration of a carrom board playing surface"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">The craft of good play</p>
          <h2 className="section-title mt-3">Surface. Frame. Feel.</h2>
          <div className="mt-8 grid gap-7">
            {[
              [
                "Playing surface",
                "Thicker plywood stays flatter and feels more assured under faster shots.",
              ],
              [
                "Frame quality",
                "A deep, seasoned frame gives the board stability and a satisfying rebound.",
              ],
              [
                "Your right board",
                "Choose compact for easy storage, full-size for family play, and 12–16 mm for serious practice.",
              ],
            ].map(([a, b], i) => (
              <div
                key={a}
                className="grid grid-cols-[40px_1fr] gap-4 border-t border-black/15 pt-5"
              >
                <span className="font-serif text-queen">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-xl">{a}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-forest py-24 text-white">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-[#d59b90]">
              Featured professional board
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-tight">
              Atelier Sixteen
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-white/70">
              Dense 16 mm plywood, a deep hardwood frame, and a hand-finished
              surface for players who notice every rebound.
            </p>
            <ul className="mt-8 grid gap-3 text-sm">
              {[
                "29 × 29 inch playing area",
                "16 mm plywood surface",
                "Seasoned hardwood frame",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <Check size={17} className="text-[#d59b90]" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              href="/products/atelier-sixteen/"
              className="btn mt-9 bg-white text-forest"
            >
              View the board <ArrowRight className="ml-2" size={17} />
            </Link>
          </div>
          <div className="relative aspect-square">
            <Image
              src="/images/board-ebony.svg"
              fill
              alt="Atelier Sixteen professional carrom board illustration"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="container py-24">
        <p className="eyebrow">Quick guide</p>
        <h2 className="section-title mt-3">Choose by how you play</h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="border-y border-black/15">
                <th className="py-5">Level</th>
                <th>Best for</th>
                <th>Suggested ply</th>
                <th>Starting from</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Beginner",
                  "Learning control & compact rooms",
                  "4–6 mm",
                  "₹1,890",
                ],
                [
                  "Family",
                  "Regular games & full-size play",
                  "6–8 mm",
                  "₹4,790",
                ],
                [
                  "Tournament",
                  "Fast practice & precise rebound",
                  "12–16 mm",
                  "₹8,990",
                ],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-black/10">
                  {r.map((x, i) => (
                    <td
                      key={x}
                      className={`py-6 ${i === 0 ? "font-serif text-xl" : "text-sm text-ink/65"}`}
                    >
                      {x}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <FAQ />
    </>
  );
}
