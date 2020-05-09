import React from "react";
const Result = ({ score, playagain }) => (
  <div className="score-board">
    <div className="score"> You scored {score}/5 correct ansers </div>
    <button className="playBtn" onClick={playagain}>
      Play Again
    </button>
  </div>
);

export default Result;
