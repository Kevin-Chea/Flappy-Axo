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

    backgroundImg.current.src = "/src/assets/background.jpg";
  }, []);

  const drawBackground = () => {
    const img = backgroundImg.current;
    // const canvasRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    // const imgRatio = img.width / img.height;

    // let drawWidth = CANVAS_WIDTH;
    // let drawHeight = CANVAS_HEIGHT;

    // let offsetX = 0;
    // let offsetY = 0;

    // if (imgRatio > canvasRatio) {
    //   // Wider image: crop width
    //   drawHeight = CANVAS_HEIGHT;
    //   drawWidth = imgRatio * drawHeight;
    //   offsetX = (CANVAS_WIDTH - drawWidth) / 2;
    // } else {
    //   // Heigher image: crop top/bottom
    //   drawWidth = CANVAS_WIDTH;
    //   drawHeight = drawWidth / imgRatio;
    //   offsetY = (CANVAS_HEIGHT - drawHeight) / 2;
    // }

    // canvasContextRef.current?.drawImage(
    //   img,
    //   offsetX,
    //   offsetY,
    //   drawWidth,
    //   drawHeight
    // );
    const dimensionsAndOffsets = computeDrawDimensionsAndOffsets(
      img,
      CANVAS_WIDTH,
      CANVAS_WIDTH
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
