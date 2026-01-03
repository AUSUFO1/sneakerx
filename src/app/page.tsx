import Hero from '@/component/Hero/Hero';
import SneakerShowcase from '@/component/SneakerShowcase';
import TestimonialShow from '@/component/sections/TestimonialShow';

export default function Home() {
  return (
    <main>
      <Hero />
      <SneakerShowcase />
      <TestimonialShow />
    </main>
  );
}