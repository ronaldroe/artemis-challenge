import { ScoreBoard } from './';

const Heading = ({ game }) => (
  <div className="game-row">
    <h1>Don't Kill the Tree</h1>
    <ScoreBoard game={game} />
  </div>
);

export default Heading;