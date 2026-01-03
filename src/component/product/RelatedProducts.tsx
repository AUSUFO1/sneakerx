"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const related = products.filter(
    (product) => product.id !== currentProductId
  );

  if (!related.length) return null;

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth
    );
  };

  useEffect(() => {
    updateScrollState();
    const el = sliderRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-6 sm:space-y-8 2xl:space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-5xl font-bold text-white">
          More Jordan Releases
        </h2>
        <span className="text-sm sm:text-base mb-5 2xl:text-xl text-gray-400">
          Explore similar styles
        </span>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
            h-10 w-10 md:h-12 md:w-12 2xl:h-16 2xl:w-16
            items-center justify-center rounded-full
            bg-red-600 text-white shadow-lg transition
            ${
              canScrollLeft
                ? "hover:bg-red-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 2xl:gap-8 overflow-x-auto pb-4 sm:pb-6 scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
            h-10 w-10 md:h-12 md:w-12 2xl:h-16 2xl:w-16
            items-center justify-center rounded-full
            bg-red-600 text-white shadow-lg transition
            ${
              canScrollRight
                ? "hover:bg-red-700"
                : "opacity-40 cursor-not-allowed"
            }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        div::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
