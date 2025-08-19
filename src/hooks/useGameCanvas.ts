import { useCallback, useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Properties";
import { computeDrawDimensionsAndOffsets } from "../utils/image";

const useGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D>(null);
  const backgroundImg = useRef<HTMLImageElement>(new Image());

  const clearAll = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasContextRef.current = canvasRef.current?.getContext("2d");
    }

    const img = new Image();
    img.src = "/src/assets/background.jpg";
    img.onload = () => {
      backgroundImg.current = img;
    };
  }, []);

  const drawBackground = () => {
    const img = backgroundImg.current;
    const dimensionsAndOffsets = computeDrawDimensionsAndOffsets(
      img,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    canvasContextRef.current?.drawImage(
      img,
      dimensionsAndOffsets.offsetX,
      dimensionsAndOffsets.offsetY,
      dimensionsAndOffsets.drawWidth,
      dimensionsAndOffsets.drawHeight
    );
  };

  return { canvasRef, canvasContextRef, clearAll, drawBackground };
};

export default useGameCanvas;
