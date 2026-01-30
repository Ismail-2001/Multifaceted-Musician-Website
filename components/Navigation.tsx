import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Works', href: '#works' },
  { label: 'Listen', href: '#discography' },
  { label: 'Visuals', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'The Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 glass-panel' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-widest text-gold-200 z-50 mix-blend-difference">
            AELION
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 lg:space-x-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs lg:text-sm uppercase tracking-[0.2em] text-neutral-400 hover:text-gold-200 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gold-200 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-4xl text-gold-100 hover:text-gold-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;