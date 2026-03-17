"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import DukkambiScroll from "@/components/DukkambiScroll";
import { useLoading } from "@/components/LoadingContext";

const TOTAL_FRAMES = 210; 

export default function Home() {
  const { isLoaded, setIsLoaded } = useLoading();

  useEffect(() => {
    // If navigating back to home with a hash, ensure we handle the loading state
    // But we don't want to re-trigger the preloader if it's already been seen
  }, []);
  return (
    <main className="bg-white text-brand-slate relative min-h-screen">
      <AnimatePresence>
        {!isLoaded && (
          <Preloader key="preloader" totalFrames={TOTAL_FRAMES} onLoaded={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative z-10"
      >
        <DukkambiScroll totalFrames={TOTAL_FRAMES} />
      </motion.div>
    </main>
  );
}
