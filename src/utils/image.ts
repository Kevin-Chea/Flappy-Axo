export const computeDrawDimensionsAndOffsets = (
  img: HTMLImageElement,
  width: number,
  height: number
) => {
  const ratio = width / height;
  const imgRatio = img.width / img.height;

  let drawWidth = 0;
  let drawHeight = 0;

  //   let offsetX = 0;
  //   let offsetY = 0;

  if (imgRatio > ratio) {
    drawHeight = height;
    drawWidth = imgRatio * drawHeight;
  } else {
    drawWidth = width;
    drawHeight = drawWidth / imgRatio;
  }

  return {
    img,
    offsetX: 0,
    offsetY: 0,
    drawWidth,
    drawHeight,
  };
};
