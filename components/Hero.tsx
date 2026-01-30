import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-obsidian">
      
      {/* 3D Background */}
      <ThreeBackground />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>

      {/* Gradient Vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-obsidian/80 z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 overflow-hidden"
        >
          <div className="flex items-center gap-4">
             <span className="h-[1px] w-12 bg-gold-400/50 inline-block"></span>
             <h2 className="text-gold-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium">
               Architecte Sonore
             </h2>
             <span className="h-[1px] w-12 bg-gold-400/50 inline-block"></span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95, letterSpacing: "-0.02em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-gold-100 leading-[0.85] tracking-tight mix-blend-screen drop-shadow-2xl text-center"
        >
          <span className="block">Sound</span>
          <span className="block italic font-light text-neutral-500 transform translate-x-12 md:translate-x-24">Est</span>
          <span className="block">Vision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-16 max-w-md mx-auto text-neutral-400 font-sans text-sm md:text-base font-light leading-loose tracking-wide text-center"
        >
          Bridging the organic and the synthetic. <br/>
          <span className="italic text-gold-200/80">L'art de sculpter l'invisible.</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-neutral-600 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] opacity-60">Découvrir</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-800 to-gold-400/50"></div>
      </motion.div>
    </section>
  );
};

export default Hero;