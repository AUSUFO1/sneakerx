"use client";

import { useState } from "react";

const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"];

export default function SizeSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-3 2xl:space-y-4">
      <p className="text-sm sm:text-base 2xl:text-xl font-semibold text-white">Select Size</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 2xl:gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`h-11 sm:h-12 2xl:h-16 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base 2xl:text-xl font-medium transition-all duration-200 ${
              selected === size
                ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-500/30"
                : "border-gray-200 hover:border-gray-400 hover:bg-gray-900"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}