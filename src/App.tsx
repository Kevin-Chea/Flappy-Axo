import Header from "./features/ui/Header";
import GameScreen from "./features/ui/GameScreen";
import { GameProvider } from "./features/game/GameProvider";
import { ScoreProvider } from "./features/score/ScoreProvider";
import "./App.css";

function App() {
  return (
    <GameProvider>
      <ScoreProvider>
        <Header />
        <div className="main-content">
          <GameScreen />
        </div>
      </ScoreProvider>
    </GameProvider>
  );
}

export default App;
