import Header from "./features/ui/Header";
import ScreenSelector from "./features/ui/ScreenSelector";
import { GameProvider } from "./features/game/GameProvider";
import { ScoreProvider } from "./features/score/ScoreProvider";
import "./App.css";

function App() {
  return (
    <ScoreProvider>
      <Header />
      <GameProvider>
        <div className="main-content">
          <ScreenSelector />
        </div>
      </GameProvider>
    </ScoreProvider>
  );
}

export default App;
