import { useState } from 'react'
import zoe1 from './assets/zoe1.jpg'
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
      transition: "transform 1s linear",
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

function Board({ url }) {
  let [rotations, setRotations] = useState(randomRotations());
  let rows = [];
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 3; x++) {
      let onClick = () => {
        console.log("onClick", x, y);
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
  return <Board url={zoe1} />;
}

export default App
