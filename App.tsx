import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Discography from './components/Discography';
import Gallery from './components/Gallery';
import SonicLab from './components/SonicLab';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-obsidian min-h-screen text-neutral-200 selection:bg-gold-400 selection:text-black">
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Discography />
        <Projects />
        <Gallery />
        <SonicLab />
        <Contact />
      </main>
    </div>
  );
}

export default App;