  import initBoids from './boidGen'
  import { randRangeVect, sortByDistance } from './utilities'
  
  function applyForce(force, mass) {
    return {x: force.x/mass, y: force.y/mass}
  }
  
  function updateVelocity(vector, maxSpeed) {
    const newVelx = vector.vel.x + vector.accel.x
    const newVely = vector.vel.y + vector.accel.y

    // Enforce speed limit
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

  function align(boid, others) {}
  function gravitate(boid, others) {}
  function spread(boid, others) {

  }   

  function lookForNeighbors(boidPos, others) {
    /* Get the index of the neighbors within the given boid's sight
    Algorithm:
    1. Sort the other boids position by closest to farthest
    2. Filter out the boids outside of the search distance
    3. Filter out the boids who are not within 180deg peripheral view of the given boid
    4. Return the index of those boids
    */

    const coord_arr = Object.keys(others).map((key) => [others[key].x, others[key].y, key])
    const sorted = sortByDistance(coord_arr, [boidPos.x, boidPos.y])
    console.log(sorted[0][0])
  }

export default function boidEngine() { 
    let boids
    let posOthers = {}

    // Feature proposal
    function addBoid() {
      /* Instead of using the initBoids function, we can turn boid engine into a class
      and have this function as a method of that class. addBoids can be called anytime 
      and new boid is introduced. This would also come with a removeBoid() function too. */
    }

    function run(ctx) {      
        const cw = ctx.canvas.width 
        const ch = ctx.canvas.height
        ctx.clearRect(0,0,cw,ch)

        if (!boids) {boids = initBoids(ctx, 600, true)}
        
        
        for (let boid of boids) {
        
        // Can't look for neighbors if your boid is the only one rendered  
        if (Object.keys(posOthers).length > 0) {
            const boidIdx = lookForNeighbors(boid.vector.pos, posOthers)
        }
        
        //spreadForce = spread(boid, others)
        //const alignForce = align(boid, posOthers)
        //gravitateForce = gravitate(boid, others)
        //totalForce = averageForces(boid, [spreadAccel, alignAccel, gravitateAccel])
        
        if (boid.attrs.curiosity > Math.random()) {
            const totalForce = randRangeVect(-1, 1)
          }

        boid.vector.accel = applyForce(totalForce, boid.attrs.mass)
        boid.vector.vel = updateVelocity(boid.vector, boid.attrs.maxSpeed)
        boid.vector.pos = updatePosition(boid.vector, ctx)
        posOthers[boid.id] = boid.vector.pos
        boids[boid.id].vector = boid.vector
        drawBoidTriangle(ctx, boid)
        }
    }
    return run
}