import { useCallback, useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Properties";

const useGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D>(null);

  const clearAll = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasContextRef.current = canvasRef.current?.getContext("2d");
    }
  }, []);

  return { canvasRef, canvasContextRef, clearAll };
};

export default useGameCanvas;
