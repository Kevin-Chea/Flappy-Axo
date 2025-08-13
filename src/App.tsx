import Header from "./components/Header";
import MenuOrGameSelector from "./components/MenuOrGameSelector";
import { GameProvider } from "./provider/GameProvider";
import { ScoreProvider } from "./provider/ScoreProvider";

function App() {
  return (
    <ScoreProvider>
      <GameProvider>
        <Header />
        <MenuOrGameSelector />
      </GameProvider>
    </ScoreProvider>
  );
}

export default App;
