"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  image: string;
  name: string;
}

export default function ProductImage({ image, name }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      <motion.div
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-full w-full"
      >
        <Image
          src={image || "/fallback-shoe.png"}
          alt={name}
          fill
          className="object-contain"
          priority
          onLoadingComplete={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  );
}
