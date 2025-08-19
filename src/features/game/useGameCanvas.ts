import { useEffect, useRef } from "react";

const useGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasContextRef.current = canvasRef.current?.getContext("2d");
    }
  }, []);

  return { canvasRef, canvasContextRef };
};

export default useGameCanvas;
