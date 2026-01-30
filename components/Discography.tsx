import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Disc } from 'lucide-react';
import { Track } from '../types';

const tracks: Track[] = [
  { id: 't1', title: "Ether State", album: "Void Structures", duration: "03:42", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 't2', title: "Carbon Dust", album: "Void Structures", duration: "04:15", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 't3', title: "Velvet Static", album: "Midnight Protocol", duration: "03:11", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 't4', title: "Neon Ghosts", album: "Midnight Protocol", duration: "04:02", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 't5', title: "Root System", album: "Earthen", duration: "05:22", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const Discography: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!activeTrack) return;

    const track = tracks.find(t => t.id === activeTrack);
    if (!track || !track.audioSrc) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(track.audioSrc);
    } else if (audioRef.current.src !== track.audioSrc) {
      audioRef.current.pause();
      audioRef.current.src = track.audioSrc;
      audioRef.current.load();
    }

    if (isPlaying) {
      audioRef.current.play().catch(err => console.error("Playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [activeTrack, isPlaying]);

  const toggleTrack = (id: string) => {
    if (activeTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(id);
      setIsPlaying(true);
    }
  };

  return (
    <section id="discography" className="py-24 bg-neutral-900 overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Visualizer / Album Art Section */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
              {/* Rotating Vinyl */}
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", enabled: isPlaying }}
                className={`absolute inset-0 rounded-full bg-neutral-950 border-8 border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden ${isPlaying ? '' : 'transition-transform duration-700'}`}
                style={{ transformOrigin: 'center' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:4px_4px] opacity-20"></div>
                {/* Label */}
                <div className="w-1/3 h-1/3 bg-gold-400/20 rounded-full backdrop-blur-sm border border-gold-400/40 flex items-center justify-center">
                  <Disc className="text-gold-200" size={32} />
                </div>
              </motion.div>

              {/* Animated Equalizer Bars Overlay */}
              <div className="absolute inset-0 flex items-end justify-center gap-1 pb-12 pointer-events-none z-10">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [20, 40 + Math.random() * 80, 20] : 4,
                      opacity: isPlaying ? 1 : 0.3
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.05
                    }}
                    className="w-2 md:w-4 bg-gold-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tracklist Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl text-gold-100 mb-10">Latest Recordings</h2>

            <div className="space-y-2">
              {tracks.map((track) => (
                <motion.div
                  key={track.id}
                  layout
                  onClick={() => toggleTrack(track.id)}
                  className={`p-4 md:p-6 border-b border-neutral-800 flex items-center justify-between cursor-pointer group transition-colors ${activeTrack === track.id ? 'bg-neutral-800/50' : 'hover:bg-neutral-800/30'}`}
                >
                  <div className="flex items-center gap-6">
                    <button className={`w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 transition-all ${activeTrack === track.id && isPlaying ? 'bg-gold-400 text-black' : 'group-hover:border-gold-400'}`}>
                      {activeTrack === track.id && isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </button>
                    <div>
                      <h4 className={`text-lg font-serif tracking-wide ${activeTrack === track.id ? 'text-gold-200' : 'text-neutral-300'}`}>{track.title}</h4>
                      <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">{track.album}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-neutral-600">{track.duration}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Discography;