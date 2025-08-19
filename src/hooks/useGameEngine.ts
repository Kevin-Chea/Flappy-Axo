import { BIRD_HEIGHT, BIRD_OFFSET_X, BIRD_WIDTH, GRAVITY } from "../Properties";
import useBird from "./useBird";
import useGame from "./useGame";
import usePipes from "./usePipes";

const useGameEngine = () => {
  const { birdY, addVelocity, computeBirdY, drawBird } = useBird();
  const { frameExecution, objectCollideWithPipe, getFirstPipe, drawPipes } =
    usePipes();
  const { stop, updateDelta, delta } = useGame();

  const update = (ctx: CanvasRenderingContext2D) => {
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
    // 5. Draw bird & pipes
    drawBird(ctx);
    drawPipes(ctx);
  };

  return { update };
};

export default useGameEngine;
