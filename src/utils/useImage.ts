import { useEffect, useRef } from "react";

const useImage = (path: string) => {
  const img = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    const newImg = new Image();
    newImg.src = path;
    newImg.onload = () => {
      img.current = newImg;
    };
  }, [path]);

  return img;
};

export default useImage;
