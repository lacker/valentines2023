import { useState } from 'react'
import pics from "./Pics"
import './App.css'

// x counts across, y counts down from the top.
// x = 0, y = 0 is the top left corner.
// x goes 0 to 2, y goes 0 to 3.
// rotation is 0 to 3.
function Piece({ x, y, url, rotation, onClick }) {
  let tileSize = 300;
  return (
    <div style={{
      height: tileSize,
      width: tileSize,
      backgroundImage: `url(${url})`,
      backgroundSize: "300% 400%",
      backgroundPosition: `${-x * 100}% ${-y * 100}%`,
      transform: `rotate(${rotation * 90}deg)`,
      transition: "transform 0.2s linear",
    }} onClick={onClick} />
  );
}

function randomRotations() {
  let rows = [];
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 3; x++) {
      row.push(Math.floor(Math.random() * 4));
    }
    rows.push(row);
  }
  return rows;
}

// Returns a copy of array
function shuffleArray(array) {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Board({ urls }) {
  let [rotations, setRotations] = useState(randomRotations());
  let [urlIndex, setUrlIndex] = useState(0);

  if (urlIndex >= urls.length) {
    return <div>you win!</div>;
  }

  let url = urls[urlIndex];

  // See if the puzzle is complete
  let renderTime = Date.now();
  let complete = true;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 3; x++) {
      if (rotations[y][x] % 4 !== 0) {
        complete = false;
      }
    }
  }

  let rows = [];
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 3; x++) {
      let onClick = () => {
        console.log("onClick", x, y);
        if (complete) {
          // Only go to the next puzzle if it's been a couple seconds
          if (Date.now() - renderTime < 2000) {
            return;
          }
          setUrlIndex(urlIndex + 1);
          setRotations(randomRotations());
          return;
        }
        let newRotations = [...rotations];
        newRotations[y][x] = newRotations[y][x] + 1;
        setRotations(newRotations);
      };
      row.push(<Piece x={x} y={y} url={url} rotation={rotations[y][x]}
        key={`piece${x}`} onClick={onClick} />);
    }
    rows.push(<div key={`row${y}`} className="flex-container" > {row}</div >);
  }
  return <div>{rows}</div>;
}

function App() {
  return <Board urls={shuffleArray(pics)} />;
}

export default App
