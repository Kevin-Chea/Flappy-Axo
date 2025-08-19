import { BIRD_HEIGHT, BIRD_OFFSET_X, BIRD_WIDTH, GRAVITY } from "../Properties";
import useBird from "./useBird";
import useGame from "./useGame";
import usePipes from "./usePipes";

const useGameEngine = () => {
  const { birdY, addVelocity, computeBirdY, drawBird } = useBird();
  const { frameExecution, objectCollideWithPipe, getFirstPipe, drawPipes } =
    usePipes();
  const { stop, updateDelta, delta } = useGame();

  const update = () => {
    // 1. Time progression
    updateDelta();

    // 2. Apply forces on main character
    addVelocity(GRAVITY * delta.current);
    computeBirdY();

    // 3. Pipe logic (creation, deletion...)
    frameExecution();

    // 4. Collision
    const pipe = getFirstPipe();
    if (
      pipe &&
      objectCollideWithPipe(
        {
          width: BIRD_WIDTH,
          height: BIRD_HEIGHT,
          x: BIRD_OFFSET_X,
          y: birdY.current,
        },
        pipe
      )
    ) {
      stop();
    }
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    drawBird(ctx);
    drawPipes(ctx);
  };

  return { update, render };
};

export default useGameEngine;
