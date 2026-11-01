"use client";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/providers/store-provider";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/config/brand";
const links = [
  ["Shop", "/shop/"],
  ["Boards", "/shop/?category=Carrom%20Boards"],
  ["Accessories", "/shop/?category=Care%20%26%20Accessories"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
];
export function Header() {
  const { cartCount, wishCount } = useStore(),
    [open, setOpen] = useState(false),
    close = () => setOpen(false),
    btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btn.current?.focus();
      }
      if (e.key === "Tab") {
        const a = document.querySelectorAll(
          "#mobile-menu a,#mobile-menu button",
        );
        if (a.length) {
          const f = a[0] as HTMLElement,
            l = a[a.length - 1] as HTMLElement;
          if (e.shiftKey && document.activeElement === f) {
            e.preventDefault();
            l.focus();
          } else if (!e.shiftKey && document.activeElement === l) {
            e.preventDefault();
            f.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  return (
    <>
      <div className="bg-walnut px-4 py-2 text-center text-xs tracking-wide text-white">
        {brand.announcement}
      </div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-ivory/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <button
            ref={btn}
            className="icon-btn lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
          <Link
            href="/"
            className="font-serif text-2xl font-semibold text-forest"
          >
            COSMOS <span className="text-queen">●</span> CARROM
          </Link>
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {links.map(([n, h]) => (
              <Link
                key={n}
                href={h}
                className="text-sm font-medium hover:text-queen"
              >
                {n}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link
              className="icon-btn hidden sm:grid"
              href="/shop/"
              aria-label="Search products"
            >
              <Search />
            </Link>
            <Link
              className="icon-btn relative"
              href="/wishlist/"
              aria-label={`Wishlist with ${wishCount} items`}
            >
              <Heart />
              <Count n={wishCount} />
            </Link>
            <Link
              className="icon-btn relative"
              href="/cart/"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag />
              <Count n={cartCount} />
            </Link>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/45" onMouseDown={close}>
          <aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            onMouseDown={(e) => e.stopPropagation()}
            className="h-full w-[86%] max-w-sm bg-ivory p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl text-forest">
                Carrom House
              </span>
              <button
                className="icon-btn"
                onClick={close}
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>
            <nav className="mt-10 grid gap-2">
              {links.map(([n, h]) => (
                <Link
                  onClick={close}
                  className="border-b border-black/10 py-4 text-lg"
                  key={n}
                  href={h}
                >
                  {n}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
function Count({ n }: { n: number }) {
  return n > 0 ? (
    <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-queen px-1 text-[10px] text-white">
      {n}
    </span>
  ) : null;
}
