import Header from "./components/Header";
import MenuOrGameSelector from "./components/MenuOrGameSelector";
import { GameProvider } from "./provider/GameProvider";
import { ScoreProvider } from "./provider/ScoreProvider";
import "./App.css";

function App() {
  return (
    <ScoreProvider>
      <GameProvider>
        <Header />
        <div className="main-content">
          <MenuOrGameSelector />
        </div>
      </GameProvider>
    </ScoreProvider>
  );
}

export default App;
