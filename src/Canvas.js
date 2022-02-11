import React, { useRef, useEffect, useState } from 'react'


export function Canvas(props) {  
  const { draw, paused, ...rest } = props
  const canvasRef = useCanvas(draw, paused)

  return <canvas ref={canvasRef} {...rest}/>
}

const useCanvas = (draw, paused) => {  
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeaight}px`

    let animationFrameId
    const render = () => {
      draw(context)
      animationFrameId = window.requestAnimationFrame(render)
    }
    
    if (!paused) {
      render()
    }
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}


export function resizeCanvasToDisplaySize(canvas) {
    
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }

  return false
}