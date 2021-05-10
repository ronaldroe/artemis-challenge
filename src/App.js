import "./App.scss";
import { Game, Heading } from "./Components";

const App = ({ game }) => {
  return (
    <>
      <Heading time={game.displayTime} />
      <Game />
    </>
  );
};

export default App;
