import { useEffect, useRef } from "react";

const useGameCanvas = (width: number, height: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Ajust to device pixel ratio
      const dpr = window.devicePixelRatio || 1;

      // Adapt resolution
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Keep given width and height
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      canvasContextRef.current = ctx;
    }
  }, [height, width]);

  return { canvasRef, canvasContextRef };
};

export default useGameCanvas;
