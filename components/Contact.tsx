import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-neutral-950 pt-32 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-start mb-24">
           <span className="text-gold-400 text-[10px] uppercase tracking-[0.4em] mb-8 block">
             Contact & Projets
           </span>
           
           <h2 className="font-serif text-5xl md:text-8xl text-neutral-200 mb-12 leading-none">
             Have a project <br/>
             <span className="text-neutral-700 italic">en tête?</span>
           </h2>

           <motion.a 
             href="mailto:contact@aelion.audio" 
             className="group relative inline-flex items-center gap-6"
             whileHover="hover"
           >
             <span className="font-serif text-4xl md:text-6xl text-gold-200 group-hover:text-white transition-colors duration-500">
               contact@aelion.audio
             </span>
             <motion.span 
               variants={{ hover: { rotate: 45, scale: 1.1 } }}
               transition={{ duration: 0.4 }}
               className="p-4 rounded-full border border-neutral-800 group-hover:bg-gold-400 group-hover:border-gold-400 group-hover:text-black text-neutral-500 transition-colors duration-500"
             >
               <ArrowUpRight size={32} />
             </motion.span>
             
             {/* Underline Animation */}
             <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-neutral-800"></span>
             <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold-400 group-hover:w-full transition-all duration-700 ease-out"></span>
           </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-neutral-900 pt-12 items-end">
          <div>
            <p className="text-neutral-500 text-sm font-light max-w-xs leading-relaxed">
              Currently accepting commissions for film scoring, sonic branding, and art installations for late 2025.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-8 text-xs uppercase tracking-widest text-neutral-400">
               {['Instagram', 'Spotify', 'Vimeo', 'LinkedIn'].map(social => (
                 <a key={social} href="#" className="hover:text-gold-200 transition-colors relative group">
                   {social}
                   <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-200 transition-all duration-300 group-hover:w-full"></span>
                 </a>
               ))}
            </div>
            <p className="text-[10px] text-neutral-700 uppercase tracking-widest">
              &copy; 2025 Aelion Audio. Fait avec amour à Paris.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;