"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Truck, Shield, RefreshCw } from "lucide-react";
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
  const [quantity, setQuantity] = useState(1);

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
    <div className="flex flex-col gap-6 sm:gap-8 2xl:gap-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs sm:text-sm 2xl:text-base uppercase tracking-wider text-red-500 font-semibold mb-2 2xl:mb-3">
            {product.brand}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl font-bold text-white leading-tight">
            {product.name}
          </h1>
        </div>

        <button
          onClick={toggleWishlist}
          className="rounded-full border-2 border-gray-700 p-2 sm:p-2.5 2xl:p-4 transition-all duration-200 hover:border-red-600 hover:bg-red-600/10 group"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 transition-colors ${
              wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-600"
            }`}
          />
        </button>
      </div>

      {/* Price & Rating */}
      <div className="flex items-center gap-4 sm:gap-6">
        <p className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-white">
          ${product.price}
        </p>
        <div className="flex items-center gap-1 sm:gap-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-7 2xl:w-7 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm 2xl:text-lg text-gray-400">(128 reviews)</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base 2xl:text-2xl text-gray-300 leading-relaxed">
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 sm:gap-3 2xl:gap-4">
        {["Retro", "Limited Edition", "Trending"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 backdrop-blur-sm border border-gray-700/50 px-3 py-1.5 sm:px-4 sm:py-2 2xl:px-6 2xl:py-3 text-xs sm:text-sm 2xl:text-base font-medium text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Size Selector */}
      <SizeSelector />

      {/* Quantity Selector */}
      <div className="space-y-3 2xl:space-y-4">
        <p className="text-sm sm:text-base 2xl:text-xl font-semibold text-white">Quantity</p>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-11 w-11 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-lg sm:rounded-xl border-2 border-gray-700 bg-white/5 backdrop-blur-sm font-semibold text-lg sm:text-xl 2xl:text-2xl text-white hover:bg-white/10 hover:border-gray-600 transition-colors"
          >
            −
          </button>
          <span className="text-lg sm:text-xl 2xl:text-3xl font-semibold w-12 sm:w-16 2xl:w-20 text-center text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-11 w-11 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-lg sm:rounded-xl border-2 border-gray-700 bg-white/5 backdrop-blur-sm font-semibold text-lg sm:text-xl 2xl:text-2xl text-white hover:bg-white/10 hover:border-gray-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 2xl:gap-6 pt-4 sm:pt-6 2xl:pt-8">
        <button className="flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 2xl:py-6 text-sm sm:text-base 2xl:text-xl rounded-xl 2xl:rounded-2xl transition-all duration-200 shadow-lg shadow-red-500/30 active:scale-95">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-8 2xl:h-8" />
          Add to Cart
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-gray-700/50 text-white font-semibold py-3.5 sm:py-4 2xl:py-6 text-sm sm:text-base 2xl:text-xl rounded-xl 2xl:rounded-2xl transition-all duration-200 active:scale-95">
          Buy Now
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 2xl:gap-6 pt-6 sm:pt-8 2xl:pt-10 border-t border-gray-700/50">
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <Truck className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 text-red-500" />
          </div>
          <p className="text-xs sm:text-sm 2xl:text-lg font-medium text-white">Free Shipping</p>
        </div>
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 text-red-500" />
          </div>
          <p className="text-xs sm:text-sm 2xl:text-lg font-medium text-white">Authentic</p>
        </div>
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 2xl:h-16 2xl:w-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 text-red-500" />
          </div>
          <p className="text-xs sm:text-sm 2xl:text-lg font-medium text-white">Easy Returns</p>
        </div>
      </div>
    </div>
  );
}