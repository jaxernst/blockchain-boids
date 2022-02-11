  import initBoids from './boidGen'
  import { randRangeVect, sortByDistance } from './utilities'
  
  function calcImpulse(force, mass) {
    return {x: force.x/mass, y: force.y/mass}
  }
  
  function updateVelocity(vector, maxSpeed) {
    const newVelx = vector.vel.x + vector.accel.x
    const newVely = vector.vel.y + vector.accel.y

    // Enforece speed limit
    if (Math.hypot(newVelx, newVely) < maxSpeed) {
      return {x: newVelx, y: newVely}
    }
    return {x: vector.vel.x, y: vector.vel.y}
  }
  
  function updatePosition(vector, ctx) {
    const cw = ctx.canvas.width
    const ch = ctx.canvas.height
    let newPosx = vector.pos.x + vector.vel.x
    let newPosy = vector.pos.y + vector.vel.y
  
    // Teleport boids when they go off screen
    if (vector.pos.x > cw) {newPosx = 0}
    if (vector.pos.x < 0) {newPosx = cw}
    if (vector.pos.y > ch) {newPosy = 0}
    if (vector.pos.y < 0) {newPosy = ch}
    
    return {x: newPosx, y: newPosy }
  }
  
  function drawBoidTriangle(ctx, boid) {
    const vel = [boid.vector.vel.x, boid.vector.vel.y]
    const pos = [boid.vector.pos.x, boid.vector.pos.y]
    const attrs = boid.attrs
    
    // Triangle coords point in the velocity vector direciton
    // Triangle coords scale with velocity magnitude
    const dir = Math.atan2(vel[1], vel[0])
    let mag = Math.hypot(vel[0], vel[1])
    mag = .1 < mag ? mag: .1
    
    const size = attrs.size
    const width = attrs.width
    const norm = [vel[0] / mag, vel[1] / mag]
    const coords = [[pos[0] + norm[0] * (mag/2 + size), pos[1] + norm[1] * (mag/2 + size)],
              [pos[0] - norm[0] + Math.cos(dir + Math.PI / 2) * size*width,
                pos[1] - norm[1] + Math.sin(dir + Math.PI / 2) * size*width],
              [pos[0] - norm[0] - Math.cos(dir + Math.PI / 2) * size*width,
                pos[1] - norm[1] - Math.sin(dir + Math.PI / 2) * size*width]]
    
   ctx.fillStyle = boid.attrs.color;
   ctx.beginPath()
   ctx.moveTo(coords[0][0], coords[0][1])
   ctx.lineTo(coords[1][0], coords[1][1])   
   ctx.lineTo(coords[2][0], coords[2][1]) 
  
   ctx.closePath()
   ctx.fill()
  }

  function align(boid, others) {
      const coord_arr = [Object.values(others)]
      //const sorted = sortByDistance(coord_arr, [boid.vector.pos.x, boid.vector.pos.y])
      //debugger
  }   

  export default function boidEngine() { 
    let boids
    const posOthers = {}
    const run  = (ctx) => { 
        const cw = ctx.canvas.width 
        const ch = ctx.canvas.height
        ctx.clearRect(0,0,cw,ch)

        if (!boids) {boids = initBoids(ctx, 1000, true)}
        
        for (let boid of boids) {
        //spreadForce = spread(boid, others)
        //const alignForce = align(boid, posOthers)
        //gravitateForce = gravitate(boid, others)
        //totalForce = averageAccel(boid, [spreadAccel, alignAccel, gravitateAccel])
        
        if (boid.attrs.curiosity > Math.random()) {
            const totalForce = randRangeVect(-1, 1)
            boid.vector.accel = calcImpulse(totalForce, boid.attrs.mass)
        }
    
        boid.vector.vel = updateVelocity(boid.vector, boid.attrs.maxSpeed)
        boid.vector.pos = updatePosition(boid.vector, ctx)
        posOthers[boid.id] = boid.vector.pos
        drawBoidTriangle(ctx, boid)
        }
    }
    return run
}