import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../Properties";
import useImage from "../../../utils/useImage";
import bgSrc from "../../../assets/background.jpg";

const useBackground = () => {
  const bgImg = useImage(bgSrc);

  const getState = () => ({
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    img: bgImg.current,
  });

  return { getState };
};

export default useBackground;
