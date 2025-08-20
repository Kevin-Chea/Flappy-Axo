import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../Properties";
import useImage from "../../../utils/useImage";

const useBackground = () => {
  const bgImg = useImage("/src/assets/background.jpg");

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
