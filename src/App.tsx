import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import { GameProvider } from "./provider/GameProvider";
import { ScoreProvider } from "./provider/ScoreProvider";
import "./App.css";

function App() {
  return (
    <ScoreProvider>
      <GameProvider>
        <Header />
        <div className="main-content">
          <ScreenSelector />
        </div>
      </GameProvider>
    </ScoreProvider>
  );
}

export default App;
