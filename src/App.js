import React, { useState } from 'react';
import {Canvas, resizeCanvasToDisplaySize} from './Canvas';
import boidEngine from './boid_engine/boidEngine'


function App() {
  let boids
  let boidsInitialized = false
  const draw = boidEngine()

  const [paused, pauseRender] = useState(true)
  const Pause = () => {
    console.log("pausing")
    pauseRender(!paused)
  } 

  return <Canvas draw={draw} paused={paused} tabIndex="0" onKeyPress={Pause} />
}
export default App;



