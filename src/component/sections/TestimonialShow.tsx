"use client";

import { useState, useEffect, memo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  sneaker: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Sneaker Collector",
    avatar: "/avatars/avatar1.jpeg",
    rating: 5,
    text: "Best sneaker shopping experience ever! The quality is unmatched and delivery was lightning fast.",
    sneaker: "Air Jordan 1 Retro High",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Fashion Influencer",
    avatar: "/avatars/avatar2.jpeg",
    rating: 5,
    text: "Authentic products, great prices, and amazing customer service.",
    sneaker: "Nike Dunk Low",
    verified: true,
  },
  {
    id: 3,
    name: "David Martinez",
    role: "Basketball Player",
    avatar: "/avatars/avatar3.jpeg",
    rating: 5,
    text: "Attention to detail and authenticity verification process is top-notch.",
    sneaker: "Air Max 97",
    verified: true,
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Designer",
    avatar: "/avatars/avatar4.jpeg",
    rating: 5,
    text: "The curated collection is fire. Found rare gems easily.",
    sneaker: "Jordan Boost 350",
    verified: true,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Athlete",
    avatar: "/avatars/avatar5.jpeg",
    rating: 5,
    text: "Premium quality and fast shipping. Will shop again.",
    sneaker: "Air Jordan 4 Retro",
    verified: true,
  },
];

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-600 text-gray-600"
        }
      />
    ))}
  </div>
));
StarRating.displayName = "StarRating";

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-[280px] md:w-[340px] shrink-0 bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 border border-gray-700/50">
      <Quote className="absolute top-6 right-6 w-12 h-12 text-red-600/20" />

      <div className="flex gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {!loaded && <div className="absolute inset-0 bg-gray-700 animate-pulse" />}
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className={`object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div>
          <p className="text-white font-semibold">{testimonial.name}</p>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">"{testimonial.text}"</p>

      <p className="text-xs text-gray-500">Purchased</p>
      <p className="text-sm font-semibold text-red-500">{testimonial.sneaker}</p>
    </div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sliderRef.current || reduceMotion) return;

    const slider = sliderRef.current;
    const loopWidth = slider.scrollWidth / 2;

    let raf: number;
    let last = performance.now();
    const speed = 0.6;

    const tick = (now: number) => {
      const delta = now - last;
      last = now;

      if (!paused.current) {
        slider.scrollLeft += speed * (delta / 16);

        if (slider.scrollLeft >= loopWidth) {
          slider.scrollLeft -= loopWidth;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">
        <h2 className="text-center text-2xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-16">
          What Our{" "}
          <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Customers Say
          </span>
        </h2>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-scroll"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => (paused.current = false)}
          style={{ scrollbarWidth: "none" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
