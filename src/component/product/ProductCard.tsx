"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="min-w-[260px] rounded-2xl border bg-background p-4 shadow-sm"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium leading-tight">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <p className="font-semibold">${product.price}</p>
      </div>
    </motion.div>
  );
}