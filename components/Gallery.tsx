import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1514525253361-bee8d482809a?q=80&w=2000&auto=format&fit=crop", // Dark high-end audio setup
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop", // Studio
  "/assets/sonic_ripple.png", // Premium golden sound ripple (was surfer)
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop", // Neon
];

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-neutral-400">Visual Frequencies</h2>
      </div>

      <div ref={containerRef} className="flex flex-col gap-8 md:gap-16">

        {/* Row 1 - Moves Left */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-8 w-[200vw] ml-[-20vw]"
        >
          {images.map((src, i) => (
            <div key={i} className="relative w-[60vh] h-[40vh] md:w-[60vw] md:h-[60vh] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-105 cursor-pointer">
              <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-mono text-sm border border-white/30 px-2 py-1">FIG. 0{i + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Moves Right */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-8 w-[200vw] ml-[-80vw]"
        >
          {[...images].reverse().map((src, i) => (
            <div key={i} className="relative w-[60vh] h-[40vh] md:w-[60vw] md:h-[60vh] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-105 cursor-pointer">
              <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-mono text-sm border border-white/30 px-2 py-1">FIG. 0{i + 5}</span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Gallery;