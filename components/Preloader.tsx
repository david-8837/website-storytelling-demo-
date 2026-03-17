"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoaded: () => void;
  totalFrames: number;
}

export default function Preloader({ onLoaded, totalFrames }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const introWords = ["Heritage"];

  useEffect(() => {
    let loadedCount = 0;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, '0')}.jpg`;
      
      const handleLoad = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setTimeout(() => {
            setShowIntro(true);
          }, 500);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad;
    }
  }, [totalFrames]);

  useEffect(() => {
    if (showIntro) {
      if (introStep < introWords.length) {
        const timer = setTimeout(() => {
          setIntroStep(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const finalTimer = setTimeout(() => {
          onLoaded();
        }, 1000);
        return () => clearTimeout(finalTimer);
      }
    }
  }, [showIntro, introStep, onLoaded, introWords.length]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center p-6 overflow-hidden"
      >
        {/* Cinematic Background Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 via-white to-white" 
        />

        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showIntro ? (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                {/* Minimalist Premium Typography Loader */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-12 text-center"
                >
                  <h1 className="text-4xl md:text-8xl font-serif text-brand-gold tracking-[0.2em] mb-4">B&B</h1>
                  <p className="text-brand-slate/40 font-sans tracking-[0.5em] uppercase text-[10px]">Forging Generations</p>
                </motion.div>

                <div className="w-48 md:w-64">
                  <div className="flex justify-between mb-4 font-sans text-[10px] tracking-[0.3em] text-brand-gold/60 uppercase">
                    <span>Authenticity</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-[1px] w-full bg-brand-slate/5 overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-brand-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear", duration: 0.1 }}
                      style={{ boxShadow: "0 0 15px rgba(197,160,89,0.3)" }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-[200px]"
              >
                <AnimatePresence mode="wait">
                  {introStep < introWords.length && (
                    <motion.h2
                      key={introStep}
                      initial={{ opacity: 0, letterSpacing: "1em", filter: "blur(10px)" }}
                      animate={{ opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)" }}
                      exit={{ opacity: 0, letterSpacing: "0em", filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      className="text-3xl md:text-6xl font-serif text-brand-gold uppercase text-center"
                    >
                      {introWords[introStep]}
                    </motion.h2>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative 2D Elements for Intro */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showIntro ? 0.05 : 0 }}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-gold"
            style={{ translateY: "-50%" }}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: showIntro ? 0.05 : 0 }}
            className="absolute top-0 left-1/2 w-[1px] h-full bg-brand-gold"
            style={{ translateX: "-50%" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
