import Header from "./features/ui/Header";
import GameScreen from "./features/ui/GameScreen";
import { GameProvider } from "./features/game/GameProvider";
import { ScoreProvider } from "./features/score/ScoreProvider";
import "./App.css";

function App() {
  return (
    <ScoreProvider>
      <Header />
      <GameProvider>
        <div className="main-content">
          <GameScreen />
        </div>
      </GameProvider>
    </ScoreProvider>
  );
}

export default App;
