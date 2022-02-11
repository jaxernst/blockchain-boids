import React, { useState } from 'react';
import {Canvas, resizeCanvasToDisplaySize} from './Canvas';


function createEmptyVector() {
  return {sx:null, vx:0, ax:0,
          sy:null, vy:0, ay:0}
}

function randomizePos(vector, xlim, ylim) {
  vector.sx = randRange(0, xlim)
  vector.sy = randRange(0, ylim)
  return vector
}

function randomizeAccel(vector, maxMag){
  vector.ax = randRange(-1*maxMag, maxMag)
  vector.ay = randRange(-1*maxMag, maxMag)
  return vector
}

function randomizeVel(vector, maxMag) {
  vector.vx = randRange(-1*maxMag, maxMag)
  vector.vy = randRange(-1*maxMag, maxMag)
  return vector
}

function randRange(min, max) { 
  return Math.random() * (max - min + 1) + min
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateVelocity(vector, maxSpeed) {
  const newVelx = vector.vx + vector.ax
  const newVely = vector.vy + vector.ay
  //debugger
  if (Math.hypot(newVelx, newVely) < maxSpeed) {
    vector.vx = newVelx
    vector.vy = newVely
  }
  return vector
}

function updatePosition(ctx, vector) {
  let cw = ctx.canvas.width
  let ch = ctx.canvas.height

  vector.sx += vector.vx
  vector.sy += vector.vy

  if (vector.sx > cw) {vector.sx = 0}
  if (vector.sx < 0) {vector.sx = cw}
  if (vector.sy > ch) {vector.sy = 0}
  if (vector.sy < 0) {vector.sh = ch}
  
  return vector
}

function initBoids(ctx, boidAttrs, N) {
  const xlim = ctx.canvas.width
  const ylim = ctx.canvas.height
  let boids = []
 
  for (let i=0; i<N; i++) {
    let vector = createEmptyVector()
    
    vector = randomizeVel(vector, boidAttrs.maxSpeed)
    vector = randomizeAccel(vector, .01)
    vector = randomizePos(vector, xlim, ylim)
    let boid = {attrs: {...boidAttrs}, vector:vector}
    const color = getRandomColor()
    boid.attrs.color = color
    boids.push(boid)

  }
  return boids
}

function drawBoidTriangle(ctx, boid) {
  const vel = [boid.vector.vx, boid.vector.vy]
  const pos = [boid.vector.sx, boid.vector.sy]
  const attrs = boid.attrs
  
  const dir = Math.atan2(vel[1], vel[0])
  let mag = Math.hypot(vel[0], vel[1])
  
  if (mag < 0.1){
    mag = 0.1
  }
  
  const size = attrs.size
  const width = attrs.width
  const norm = [vel[0] / mag, vel[1] / mag]
  const coords = [[pos[0] + norm[0] * (mag/2 + size), pos[1] + norm[1] * (mag/2 + size)],
            [pos[0] - norm[0] + Math.cos(dir + Math.PI / 2) * size*width,
              pos[1] - norm[1] + Math.sin(dir + Math.PI / 2) * size*width],
            [pos[0] - norm[0] - Math.cos(dir + Math.PI / 2) * size*width,
              pos[1] - norm[1] - Math.sin(dir + Math.PI / 2) * size*width]]


  //ctx.strokeStyle = "#00FF00"
  //const x = 60
  //ctx.beginPath()
  //ctx.moveTo(pos[0], pos[1])
  //ctx.lineTo(pos[0] + vect.vx*x, vect.sy + vect.vy*x)
  //ctx.stroke()

 ctx.fillStyle = boid.attrs.color;
 ctx.beginPath()
 ctx.moveTo(coords[0][0], coords[0][1])
 ctx.lineTo(coords[1][0], coords[1][1])   
 ctx.lineTo(coords[2][0], coords[2][1]) 

 ctx.closePath()
 ctx.fill()
}

const boidAttrs = {
  type : "triangle",
  color : getRandomColor(),
  mass : 1,
  size : 10,
  width : .5,
  magAlign : 1,
  magSpread : 1,
  magGravitate : 1,
  magAccel : .0002,
  maxSpeed : 20
}


function App() {
  let boids
  let boidsInitialized = false

  function boidEngine(ctx, frameCount) { 
    let cw = ctx.canvas.width 
    let ch = ctx.canvas.height
    ctx.clearRect(0,0,cw,ch)

    if (!boidsInitialized) {
      boids = initBoids(ctx, boidAttrs, 500)
      boidsInitialized = true
    }
    

    console.log(boids[0].vector.vx, boids[0].vector.vy)
    for (let boid of boids) {
      //spreadAccel = spread(boid, others)
      //alignAccel = align(boid, others)
      //gravitateAccel = gravitate(boid, others)
      //newAccel = averageAccel(boid, [spreadAccel, alignAccel, gravitateAccel])
      
      
                    updateAccel(boid.vector, boid.attrs.maxSpeed)
      boid.vector = updateVelocity(boid.vector, boid.attrs.maxSpeed)
      boid.vector = updatePosition(ctx, boid.vector)

      drawBoidTriangle(ctx, boid)

    }
  }

  const [paused, pauseRender] = useState(true)
  const Pause = () => {
    console.log("pausing")
    pauseRender(!paused)
  } 

  return <Canvas draw={boidEngine} paused={paused} tabIndex="0" onKeyPress={Pause} />
}
export default App;



