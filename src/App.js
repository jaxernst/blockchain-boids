import React from 'react';
import {Canvas, resizeCanvasToDisplaySize} from './Canvas';



function App() {



  boids = [new boid(1,1), new boid(50,50)]

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = frameCount % 20 === 0 ? '#00FF00' : "#000000"
    ctx.beginPath()
    ctx.arc(frameCount % ctx.canvas.width, 120, 10, 0, 2*Math.PI)
    ctx.fill()
  }
  
  return <Canvas draw={draw}/>
}

export default App;



