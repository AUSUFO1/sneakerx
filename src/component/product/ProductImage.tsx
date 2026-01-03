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
    <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl 2xl:rounded-3xl bg-linear-to-br from-white to-gray-100 shadow-2xl">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
      )}

      <motion.div
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative h-full w-full p-6 sm:p-8 md:p-12 2xl:p-16"
      >
        <Image
          src={image || "/fallback-shoe.png"}
          alt={name}
          fill
          className={`object-contain drop-shadow-2xl transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority
          onLoad={() => setLoaded(true)}
        />
      </motion.div>

      {/* Floating badge */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 2xl:top-10 2xl:left-10 bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 2xl:px-6 2xl:py-3 rounded-full text-xs sm:text-sm 2xl:text-base font-bold shadow-lg">
        New Arrival
      </div>
    </div>
  );
}