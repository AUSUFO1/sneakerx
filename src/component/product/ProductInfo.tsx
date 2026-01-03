"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import SizeSelector from "./SizeSelector";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
}

export default function ProductInfo({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored?.includes(product.id)) {
      setWishlisted(true);
    }
  }, [product.id]);

  const toggleWishlist = () => {
    const stored = localStorage.getItem("wishlist");
    const list = stored ? stored.split(",") : [];

    const updated = wishlisted
      ? list.filter((id) => id !== product.id)
      : [...list, product.id];

    localStorage.setItem("wishlist", updated.join(","));
    setWishlisted(!wishlisted);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold lg:text-4xl">
            {product.name}
          </h1>
        </div>

        <button
          onClick={toggleWishlist}
          className="rounded-full border p-2 transition hover:bg-muted"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-5 w-5 ${
              wishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      <p className="text-xl font-semibold">${product.price}</p>

      <p className="text-muted-foreground">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {["Retro", "Limited", "Trending"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <SizeSelector />
    </div>
  );
}
