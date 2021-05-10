import { ScoreBoard } from './';

const Heading = ({ time }) => (
  <div className="game-row">
    <h1>Don't Kill the Tree</h1>
    <ScoreBoard time={time} />
  </div>
);

export default Heading;