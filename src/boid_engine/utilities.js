
export function createEmptyVector() {
    const pos = {x:null, y:null}
    const vel = {x:null, y:null}
    const accel = {x:null, y:null}
    return {pos, vel, accel}
    }
  
  export function randRangeVect(min, max) {
    return {x:randRange(min,max), y:randRange(min,max)}
  }
  
  function randRange(min, max) { 
    return Math.random() * (max - min + 1) + min
  }
  
  function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }
  
  export function randRangeDistribution(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
      num = Math.pow(num, skew) // Skew
      num *= max - min // Stretch to fill range
      num += min // offset to min
    }
    return num
  }

  export function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
 
// Sort the array of points by its distance from P
export function sortByDistance(arr, p) {    
    const vp = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        var dist = Math.pow((p[0] - arr[i][0]), 2)
              + Math.pow((p[1] - arr[i][1]), 2);
        vp[i] = [Math.sqrt(dist), [arr[i][0], arr[i][1]]];
    }
     
    // Sorting the array with respect to its distance
    vp.sort(sortFunction);
    return vp
}