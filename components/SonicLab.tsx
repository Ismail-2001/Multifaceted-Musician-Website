import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Music4 } from 'lucide-react';
import { generateSonicConcept } from '../services/geminiService';
import { SonicConcept } from '../types';

const SonicLab: React.FC = () => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [concept, setConcept] = useState<SonicConcept | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    setConcept(null);
    try {
      const result = await generateSonicConcept(mood);
      setConcept(result);
    } catch (err) {
      console.error(err);
      // Fallback for demo purposes if API key is missing or fails
      setConcept({
        title: "L'Heure Bleue",
        texture: "Velours, Cinématique, Nostalgique",
        instruments: ["Piano Felt", "Synthétiseur Analogique", "Pluie"],
        poeticBrief: "The feeling of walking home alone in Paris as the streetlights flicker on—a tender solitude wrapped in blue light.",
        synthSettings: "Slow attack, high reverb, low-pass filter at 200Hz",
        visualHex: "#1e3a8a"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="lab" className="py-24 md:py-32 relative bg-neutral-950 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-900/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">

          {/* Left Column: Description */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-gold-400" size={20} />
              <h3 className="text-sm uppercase tracking-widest text-gold-400">Le Laboratoire</h3>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-gold-100 mb-6">
              AI Muse
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed mb-8">
              Collaborate with my digital twin. Powered by DeepSeek, this tool translates your emotions into sonic concepts, mimicking my creative direction process.
            </p>

            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <label className="text-xs uppercase tracking-wider text-neutral-500">Enter a mood or atmosphere</label>
              <div className="flex gap-0 border-b border-neutral-700 focus-within:border-gold-400 transition-colors">
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g. Une matinée ensoleillée à Montmartre..."
                  className="bg-transparent w-full py-4 text-xl text-gold-100 placeholder-neutral-700 focus:outline-none font-serif italic"
                />
                <button
                  type="submit"
                  disabled={isLoading || !mood}
                  className="text-gold-200 hover:text-white disabled:opacity-30 transition-colors px-4 uppercase text-xs tracking-widest"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Créer"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Output Display */}
          <div className="md:w-2/3 w-full">
            <div className="min-h-[400px] border border-neutral-800 bg-black/40 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden">

              {!concept && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
                  <Music4 size={64} strokeWidth={1} />
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-1 h-24 bg-gradient-to-b from-transparent via-gold-400 to-transparent animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest text-gold-400">Création en cours...</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {concept && !isLoading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xs font-mono text-gold-400 mb-2">// TITRE_DU_MORCEAU</h4>
                          <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight">{concept.title}</h2>
                        </div>
                        <div className="text-right">
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Vibe Gradient</h4>
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-12 h-12 rounded-full border border-white/20 transition-colors duration-1000 relative"
                            style={{
                              backgroundColor: concept.visualHex || '#C4A968',
                              boxShadow: `0 0 25px ${concept.visualHex || '#C4A968'}44`
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-full blur-md opacity-50"
                              style={{ backgroundColor: concept.visualHex || '#C4A968' }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Texture</h5>
                          <p className="font-sans text-neutral-300 border-l border-gold-400/30 pl-3">{concept.texture}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Synth Settings</h5>
                          <p className="font-sans text-xs text-gold-200/80 italic">{concept.synthSettings}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h5 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Instruments</h5>
                          <div className="flex flex-wrap gap-2">
                            {concept.instruments.map((inst, i) => (
                              <span key={i} className="px-3 py-1 bg-neutral-900 text-neutral-400 text-xs rounded-full border border-neutral-800">
                                {inst}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <h4 className="text-xs font-mono text-gold-400 mb-4">// CONCEPT</h4>
                      <p className="font-serif text-2xl text-neutral-400 italic leading-relaxed">
                        "{concept.poeticBrief}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SonicLab;