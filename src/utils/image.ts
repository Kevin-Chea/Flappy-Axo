export const getImageFit = (
  img: HTMLImageElement,
  width: number,
  height: number
) => {
  const ratio = width / height;
  const imgRatio = img.width / img.height;

  let drawWidth = 0;
  let drawHeight = 0;

  if (imgRatio > ratio) {
    drawHeight = height;
    drawWidth = imgRatio * drawHeight;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imgRatio;
  }

  return {
    img,
    drawWidth,
    drawHeight,
  };
};

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  x: number = 0,
  y: number = 0
) => {
  const dimensionsAndOffsets = getImageFit(image, width, height);

  ctx.drawImage(
    image,
    x,
    y,
    dimensionsAndOffsets.drawWidth,
    dimensionsAndOffsets.drawHeight
  );
};
