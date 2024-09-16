import React from 'react';
import './TileCard.css';
function TileCard({ tile, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(tile);
    }
  };

  return (
    <div className="tile">
      <div className={flipped ? 'flipped' : ''} onClick={handleClick}>
        <div className="front">{tile.name}</div>
        <div className="back">❓</div>
      </div>
    </div>
  );
}

export default TileCard;
