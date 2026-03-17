"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface DukkambiScrollProps {
  totalFrames: number;
}

export default function DukkambiScroll({ totalFrames }: DukkambiScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [mounted, setMounted] = useState(false);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, '0')}.jpg`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [totalFrames]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ONLY scroll to top if there is no hash in the URL (initial visit)
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const index = !mounted ? 1 : Math.min(totalFrames, Math.max(1, Math.round(frameIndex.get())));

      const currentImage = images[index - 1];

      if (currentImage && currentImage.complete && currentImage.naturalWidth > 0) {
        const { width, height } = canvas;
        const imgRatio = currentImage.naturalWidth / currentImage.naturalHeight;
        const canvasRatio = width / height;

        const scale = 0.7; // Reduce size to 70% of viewport to provide elegant spacing
        const isCanvasTaller = canvasRatio > imgRatio;
        
        const drawWidth = isCanvasTaller 
          ? (currentImage.naturalWidth * (height / currentImage.naturalHeight)) * scale
          : width * scale;
        
        const drawHeight = isCanvasTaller
          ? height * scale
          : (currentImage.naturalHeight * (width / currentImage.naturalWidth)) * scale;

        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        // Create a subtle paper texture pattern
        const patternCanvas = document.createElement('canvas');
        const pctx = patternCanvas.getContext('2d');
        if (pctx) {
          patternCanvas.width = 120;
          patternCanvas.height = 120;
          pctx.fillStyle = '#FFFFFF';
          pctx.fillRect(0, 0, 120, 120);
          pctx.fillStyle = '#00000003';
          for (let i = 0; i < 1500; i++) {
            pctx.fillRect(Math.random() * 120, Math.random() * 120, 1, 1);
          }
          const pattern = ctx.createPattern(patternCanvas, 'repeat');
          if (pattern) {
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, width, height);
          } else {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, width, height);
          }
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
        }

        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalCompositeOperation = 'source-over';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;

        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;

        // Force an immediate render on resize
        render();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameIndex, totalFrames, images, mounted]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <TextOverlays scrollYProgress={scrollYProgress} mounted={mounted} />
      </div>
    </div>
  );
}

const TextOverlays = ({ scrollYProgress, mounted }: { scrollYProgress: MotionValue<number>; mounted: boolean }) => {

  const opacity0Raw = useTransform(scrollYProgress, [0, 0.05, 0.08], [1, 1, 0]);
  const opacity1Raw = useTransform(scrollYProgress, [0.10, 0.12, 0.18, 0.20], [0, 1, 1, 0]);
  const opacity2Raw = useTransform(scrollYProgress, [0.22, 0.24, 0.30, 0.32], [0, 1, 1, 0]);
  const opacity3Raw = useTransform(scrollYProgress, [0.34, 0.36, 0.42, 0.44], [0, 1, 1, 0]);
  const opacity4Raw = useTransform(scrollYProgress, [0.46, 0.48, 0.54, 0.56], [0, 1, 1, 0]);
  const opacity5Raw = useTransform(scrollYProgress, [0.58, 0.60, 0.66, 0.68], [0, 1, 1, 0]);
  const opacity6Raw = useTransform(scrollYProgress, [0.70, 0.72, 0.78, 0.80], [0, 1, 1, 0]);
  const opacity7Raw = useTransform(scrollYProgress, [0.82, 0.84, 0.92, 0.95], [0, 1, 1, 0]);
  const opacity8Raw = useTransform(scrollYProgress, [0.96, 0.98, 1, 1], [0, 1, 1, 1]);

  const opacity0 = useTransform(() => !mounted ? 1 : opacity0Raw.get());
  const opacity1 = useTransform(() => !mounted ? 0 : opacity1Raw.get());
  const opacity2 = useTransform(() => !mounted ? 0 : opacity2Raw.get());
  const opacity3 = useTransform(() => !mounted ? 0 : opacity3Raw.get());
  const opacity4 = useTransform(() => !mounted ? 0 : opacity4Raw.get());
  const opacity5 = useTransform(() => !mounted ? 0 : opacity5Raw.get());
  const opacity6 = useTransform(() => !mounted ? 0 : opacity6Raw.get());
  const opacity7 = useTransform(() => !mounted ? 0 : opacity7Raw.get());
  const opacity8 = useTransform(() => !mounted ? 0 : opacity8Raw.get());

  const pointerEventsCTA = useTransform(scrollYProgress, (v: number) => (v > 0.96 && mounted) ? "auto" : "none");


  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div style={{ opacity: opacity0 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-brand-slate px-4">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">Our journey begins with earth</h1>
        <p className="text-lg md:text-xl font-serif opacity-80 max-w-2xl mx-auto">
          We collect special soil and mix it with rice husk to create the foundation of our molds.
        </p>
      </motion.div>

      <motion.div style={{ opacity: opacity1 }} className="absolute left-12 md:left-32 top-1/2 -translate-y-1/2 max-w-sm text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        We shaped the molds into the structure of the product and dried under sunlight.
      </motion.div>

      <motion.div style={{ opacity: opacity2 }} className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 max-w-sm text-right text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        Fine wax threads are carefully wrapped.
      </motion.div>

      <motion.div style={{ opacity: opacity3 }} className="absolute left-12 md:left-32 top-1/2 -translate-y-1/2 max-w-md text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        A tool is heated and used to smooth the surface.
      </motion.div>

      <motion.div style={{ opacity: opacity4 }} className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 max-w-md text-right text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        Again cover the product with soil and rice husk mixture.
      </motion.div>

      <motion.div style={{ opacity: opacity5 }} className="absolute left-12 md:left-32 top-1/2 -translate-y-1/2 max-w-sm text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        We heated the mold to burn away the wax and molten brass is poured in.
      </motion.div>

      <motion.div style={{ opacity: opacity6 }} className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 max-w-sm text-right text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        The raw casting takes shape.
      </motion.div>

      <motion.div style={{ opacity: opacity7 }} className="absolute left-12 md:left-32 top-1/2 -translate-y-1/2 max-w-sm text-3xl md:text-5xl font-serif text-brand-slate leading-tight">
        We polished the product and finished by hand.
      </motion.div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <motion.div style={{ opacity: opacity8, pointerEvents: pointerEventsCTA as any }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center px-4">
        <h2 className="text-6xl md:text-9xl font-serif text-brand-slate mb-4 text-center max-w-4xl uppercase tracking-tighter">
          BRASS & BRONZE
        </h2>
        <p className="text-[10px] md:text-xs font-sans text-brand-slate/60 mb-12 text-center tracking-[0.4em] uppercase">
          Forged in Fire. Finished by Hand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="https://wa.me/1234567890?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-500 font-sans tracking-[0.2em] uppercase text-xs text-brand-gold bg-white/40 backdrop-blur-md"
          >
            ORDER NOW
          </a>
        </div>
      </motion.div>
    </div>
  );
};
