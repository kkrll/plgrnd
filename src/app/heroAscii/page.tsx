"use client";

import { useEffect, useRef } from "react";

const ASCII_CHARS = [" ", "•", "∘", "∗", "※"];

interface CharCell {
  baseLevel: number;
  currentLevel: number;
  opacity: number;
  col: number;
  row: number;
}

export default function HeroAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<CharCell[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-initialize grid on resize
      initGrid();
    };

    const charWidth = 20;
    const charHeight = 20;

    const initGrid = () => {
      const cols = Math.ceil(canvas.width / charWidth);
      const rows = Math.ceil(canvas.height / charHeight);

      gridRef.current = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Gradient from left (dark/0) to right (light/4) with randomness
          const gradientProgress = col / (cols - 1);
          const gradientLevel = gradientProgress * 4;
          const randomOffset = (Math.random() - 0.5) * 2;
          const baseLevel = Math.max(
            0,
            Math.min(4, Math.floor(gradientLevel + randomOffset))
          );

          gridRef.current.push({
            baseLevel,
            currentLevel: baseLevel,
            opacity: 0.1,
            col,
            row,
          });
        }
      }
    };

    // Render function
    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "12px 'IBM Plex Mono', monospace";
      ctx.textBaseline = "top";

      gridRef.current.forEach((cell) => {
        const x = cell.col * charWidth;
        const y = cell.row * charHeight;

        ctx.fillStyle = `rgba(255, 255, 255, ${cell.opacity})`;
        ctx.fillText(ASCII_CHARS[cell.currentLevel], x, y);
      });
    };

    // Initial render
    resizeCanvas();
    render();

    // Sparkle effect - only render when sparkles change
    const sparkleInterval = setInterval(() => {
      // Reset all opacities
      gridRef.current.forEach((cell) => {
        cell.opacity = 0.1;
      });

      // Pick random cells to sparkle
      const numSparkles = Math.floor(Math.random() * 5) + 3;

      for (let i = 0; i < numSparkles; i++) {
        const randomIdx = Math.floor(Math.random() * gridRef.current.length);
        const cell = gridRef.current[randomIdx];

        // Randomly shift level
        const shift = Math.random() > 0.5 ? 1 : -1;
        const newLevel = Math.max(0, Math.min(4, cell.baseLevel + shift));

        cell.currentLevel = newLevel;
        cell.opacity = 0.3;
      }

      render();
    }, 1000);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(sparkleInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
