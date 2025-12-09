import React from 'react';
import { motion, Variants } from 'framer-motion';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
      ease: EASE_OUT,
    },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

const itemLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

const itemFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

export default function HeroContent() {
  return (
    <div className="relative z-10 container-custom mt-20 h-full flex flex-col justify-center pointer-events-none">
      <motion.div
        className="max-w-2xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemLeft}
          className="text-nike-red uppercase tracking-[0.3em] text-sm font-medium mb-4"
        >
          Engineered for Excellence
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemUp}
          className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] mb-6"
        >
          <span className="block">AIR JORDAN</span>
          <span className="block text-gradient">LEGACY</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemFade}
          className="text-steel text-sm md:text-xl max-w-xl mb-8 leading-relaxed"
        >
          Experience the perfect fusion of iconic design and cutting-edge
          performance. Every detail crafted for those who demand excellence.
        </motion.p>
      </motion.div>
    </div>
  );
}
