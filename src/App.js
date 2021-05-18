import "./App.scss";
import { Game, Heading } from "./Components";

const App = ({ game }) => {
  return (
    <>
      <Heading game={game?.scene?.scenes} />
      <Game />
    </>
  );
};

export default App;
