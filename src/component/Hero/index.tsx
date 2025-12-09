'use client';

import React from 'react';
import SneakerModel from './SneakerModel';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-midnight flex flex-col lg:flex-row">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-nike-red/10 via-transparent to-midnight pointer-events-none" />

      {/* LEFT: Text */}
      <div className="relative z-20 w-full lg:w-1/2 px-6 lg:px-16 flex items-center">
        <HeroContent />
      </div>

      {/* RIGHT: 3D Sneaker */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen">
        {/* 
          IMPORTANT:
          - Do NOT use pointer-events-none here
          - Height is controlled so model is not clipped
        */}
        <SneakerModel />
      </div>
    </section>
  );
}
