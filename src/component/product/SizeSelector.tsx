"use client";

import { useState } from "react";

const sizes = ["7", "8", "9", "10", "11", "12"];

export default function SizeSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Select Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`h-10 w-12 rounded-md border text-sm transition ${
              selected === size
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
