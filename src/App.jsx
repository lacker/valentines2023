import { useState } from 'react'
import zoe1 from './assets/zoe1.jpg'
import './App.css'

function Piece() {
  return (
    <div style={{
      backgroundImage: `url(${zoe1})`
    }}>
      text yo
      a
      b
      x
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Piece />
    </div>
  )
}

export default App
