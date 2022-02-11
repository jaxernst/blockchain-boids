import { createEmptyVector, randRangeVect, randRangeDistribution, randColor } from "./utilities"

const defaultAttrs = {
  type : "triangle",
  color : randColor(),
  mass : 1,
  size : 20,
  curiosity : .2,
  width : .5,
  magAlign : 1,
  magSpread : 1,
  magGravitate : 1,
  magAccel : .0002,
  maxSpeed : 15
}

function generateRandomAttrs() {
  return {
    type : "triangle",
    color : randColor(),
    mass : randRangeDistribution(.5, 25, 5),
    size : randRangeDistribution(5, 100, 3),
    curiosity : randRangeDistribution(0,1, 5),
    width : randRangeDistribution(.3, .31, 2),
    magAlign : 1,
    magSpread : 1,
    magGravitate : 1,
    magAccel : 1,
    maxSpeed : randRangeDistribution(1, 80, 5)
  }
}
export default function initBoids(ctx, N=300, randomizeAttrs=false, attrs=defaultAttrs) {
  const xlim = ctx.canvas.width
  const ylim = ctx.canvas.height
  const boids = []
  let boid = {}

  for (let i=0; i<N; i++) {
    if (randomizeAttrs) { attrs = generateRandomAttrs()}

    let vector = createEmptyVector()
    vector.vel = randRangeVect(-attrs.maxSpeed, attrs.maxSpeed)
    vector.accel = randRangeVect(-attrs.magAccel, attrs.magAccel)
    vector.pos = randRangeVect(xlim, ylim)

    boid = {id: i, attrs: {...attrs}, vector:vector}
    boids.push(boid)

  }
  return boids
}