import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '01',
    title: 'Void Structures',
    category: 'Film Score',
    year: '2023',
    image: '/assets/void_structures.png',
    description: 'A minimalist sound design project for a sci-fi noir film. The objective was to create tension using silence and sub-bass frequencies, creating a sonic void that mirrors the protagonist\'s isolation.'
  },
  {
    id: '02',
    title: 'Earthen',
    category: 'Installation',
    year: '2024',
    image: '/assets/earthen.png',
    description: 'An interactive audio installation that generates music in real-time based on soil moisture and plant growth data collected from a localized ecosystem.'
  },
  {
    id: '03',
    title: 'Midnight Protocol',
    category: 'Album Production',
    year: '2022',
    image: '/assets/midnight_protocol.png',
    description: 'Experimental synth-pop album exploring the relationship between human emotion and digital interfaces. Featured in top 10 electronic albums of the year.'
  }
];

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="works" className="py-24 bg-charcoal text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-20 border-b border-neutral-800 pb-6">
          <h2 className="font-serif text-4xl md:text-6xl text-gold-100">Selected Works</h2>
          <span className="hidden md:block text-neutral-500 font-mono text-xs">(2022 — 2024)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {projects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={expandedId !== project.id ? { y: -12, scale: 1.02 } : {}}
              transition={{
                layout: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: index * 0.2 },
                y: { duration: 0.3, ease: "easeOut" },
                scale: { duration: 0.3, ease: "easeOut" }
              }}
              viewport={{ once: true }}
              onClick={() => toggleProject(project.id)}
              className="group cursor-pointer"
            >
              <motion.div
                layout
                className="overflow-hidden mb-6 relative aspect-[4/5]"
              >
                <div className={`absolute inset-0 bg-gold-900/0 transition-colors duration-500 z-10 ${expandedId === project.id ? 'bg-gold-900/10' : 'group-hover:bg-gold-900/20'}`} />
                <motion.img
                  layout
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${expandedId === project.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                />

                {/* Expand Indicator Icon */}
                <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full text-gold-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {expandedId === project.id ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </motion.div>

              <motion.div layout className="border-t border-neutral-800 pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-serif text-2xl transition-colors ${expandedId === project.id ? 'text-gold-200' : 'group-hover:text-gold-200'}`}>
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1">{project.category}</p>
                  </div>
                  <span className="font-mono text-xs text-neutral-600 border border-neutral-800 px-2 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>

                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.1
                        }}
                        className="text-neutral-400 text-sm font-light leading-relaxed mt-6 mb-6"
                      >
                        {project.description}
                      </motion.p>
                      <motion.a
                        href="#"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.2
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking link
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-white transition-colors"
                      >
                        View Project Details <ArrowUpRight size={14} />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;