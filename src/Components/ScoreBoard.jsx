import { useEffect, useState } from "react";

const ScoreBoard = ({ game }) => {

  const [currTime, setCurrTime] = useState('0:00');

  useEffect(() => {
    window.setInterval(() => {
      setCurrTime(game[0]?.displayTime);
    }, 1000);
  }, []);

  return (
    <h2>{currTime}</h2>
  )
};

export default ScoreBoard;