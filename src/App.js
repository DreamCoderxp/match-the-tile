import React, { useState, useEffect } from 'react';
import './App.css';
import TileCard from './components/TileCard';

const initialTiles = [
  { id: 1, name: '🍎', matched: false },
  { id: 2, name: '🍎', matched: false },
  { id: 3, name: '🍌', matched: false },
  { id: 4, name: '🍌', matched: false },
  { id: 5, name: '🍇', matched: false },
  { id: 6, name: '🍇', matched: false },
  { id: 7, name: '🍒', matched: false },
  { id: 8, name: '🍒', matched: false }
];

function App() {
  const [tiles, setTiles] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle tiles when component mounts
  useEffect(() => {
    setTiles(shuffleArray(initialTiles.map(tile => ({ ...tile, id: Math.random() }))));
  }, []);

  // Handle a tile click
  const handleChoice = (tile) => {
    if (firstChoice) {
      setSecondChoice(tile);
    } else {
      setFirstChoice(tile);
    }
  };

  // Compare two selected tiles
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.name === secondChoice.name) {
        setTiles(prevTiles => {
          return prevTiles.map(tile => {
            if (tile.name === firstChoice.name) {
              return { ...tile, matched: true };
            } else {
              return tile;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset the choices and allow the next turn
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  // Shuffle tiles
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="App">
      <h1>Match the Tile</h1>
      <div className="tile-grid">
        {tiles.map(tile => (
          <TileCard 
            key={tile.id} 
            tile={tile} 
            handleChoice={handleChoice} 
            flipped={tile === firstChoice || tile === secondChoice || tile.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={() => setTiles(shuffleArray(initialTiles))}>Restart Game</button>
    </div>
  );
}

export default App;
