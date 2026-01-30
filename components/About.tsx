import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-48 bg-obsidian text-gold-100 relative overflow-hidden">

      {/* Subtle Background Typography */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h2 className="text-[20vw] font-serif leading-none text-white whitespace-nowrap">PHILOSOPHIE</h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32 items-center">

        {/* Parallax Image Section */}
        <div className="md:w-5/12 relative z-10">
          <motion.div style={{ y: imageY }} className="relative">
            <div className="absolute -inset-4 border border-gold-400/20 translate-x-8 translate-y-8 z-0 hidden md:block"></div>
            <div className="relative overflow-hidden w-full aspect-[3/4]">
              <img
                src="/assets/about_singer.png"
                alt="Aelion - Female Singer Portrait"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 md:-right-20 bg-neutral-900/90 backdrop-blur p-6 border-l border-gold-400/30 max-w-[200px] hidden md:block">
              <p className="font-mono text-[10px] text-neutral-500 leading-relaxed uppercase">
                Fig. 01 — L'anatomie du silence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          style={{ y }}
          className="md:w-7/12 flex flex-col justify-center"
        >
          <div className="mb-12">
            <h2 className="text-gold-400 text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gold-400"></span>
              L'Artiste
            </h2>
            <h3 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-8 text-neutral-100">
              "I do not see electronic music as cold. I see it as a living entity, waiting to be sculpted."
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-neutral-400 font-sans font-light leading-loose text-sm md:text-base">
            <p>
              Based in <span className="text-gold-200 italic font-serif">Le Marais, Paris</span>, and with a background in orchestral percussion, my work seeks to find the "ghost in the machine." Featured in <span className="text-gold-200 italic font-serif">Les Inrockuptibles</span> and <span className="text-gold-200 italic font-serif">Fact Mag</span>, my approach remains singular: every sound must tell a story.
            </p>
            <p>
              From scoring campaigns for global luxury maisons to intimate audio installations along the Seine, I aim to create immersive auditory experiences that bridge the gap between organic instrumentation and digital synthesis.
            </p>
          </div>

          <div className="flex gap-16 mt-16 border-t border-neutral-800 pt-10">
            {[
              { label: "Années", value: "12" },
              { label: "Projets", value: "40+" },
              { label: "Prix", value: "04" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block text-3xl font-serif text-gold-200">{stat.value}</span>
                <span className="text-[10px] uppercase text-neutral-600 tracking-widest mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;