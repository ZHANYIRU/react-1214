import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Custom() {
  const customPic = useRef()
  const canvasRef = useRef()
  let currentMode
  // const [isDrawing, setIsDrawing] = useState(false)
  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      width: 1200,
      height: 800,
      selection: false,
    })
  }
  let canvas = initCanvas('canvas')
  const modes = {
    pan: 'pan',
    drawing: 'drawing',
  }
  const toggleMode = (mode) => {
    if (mode === mode.pan) {
      if (currentMode === modes.pan) {
        currentMode = ''
      } else {
        currentMode = modes.pan
        canvas.isDrawingMode = false
        canvas.renderAll()
      }
    } else if (mode === modes.drawing) {
      if (currentMode === modes.drawing) {
        currentMode = ''
        canvas.isDrawingMode = false
        canvas.renderAll()
      } else {
        currentMode = modes.drawing
        canvas.isDrawingMode = true
        canvas.renderAll()
      }
    }
    console.log(mode)
  }
  useEffect(() => {
    let mousePressed = false

    const initCanvas = (id) => {
      return new fabric.Canvas(id, {
        width: 1200,
        height: 800,
        selection: false,
      })
    }
    let canvas = initCanvas('canvas')
    // canvas = initCanvas('canvas')

    const setPanEvents = (canvas) => {
      canvas.on('mouse:move', (event) => {
        if (mousePressed && currentMode === modes.pan) {
          canvas.setCursor('grab')
          canvas.renderAll()
          const mEvent = event.e
          const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
          canvas.relativePan(delta)
        } else if (mousePressed && currentMode === modes.drawing) {
          canvas.isDrawingMode = true
          canvas.renderAll()
        }
      })

      canvas.on('mouse:down', (event) => {
        mousePressed = true
        canvas.setCursor('crosshair')
        canvas.renderAll()
      })
      canvas.on('mouse:up', (event) => {
        mousePressed = false
        canvas.setCursor('default')
        canvas.renderAll()
      })
    }
    const setBackground = (url, canvas) => {
      fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
      })
    }

    //設置事件

    setPanEvents(canvas)
    setBackground(
      'https://www.pakutaso.com/shared/img/thumb/AMEMAN17826009_TP_V.jpg',
      canvas
    )
  }, [])

  return (
    <div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <button
        onClick={() => {
          toggleMode(modes.pan)
        }}
      >
        toggle pan
      </button>
      <button
        onClick={() => {
          toggleMode(modes.drawing)
        }}
      >
        toggle Drawing
      </button>
      <canvas id="canvas" ref={canvasRef} onDrag={() => {}}></canvas>

      <form ref={customPic} encType="multipart/form-data">
        {/* <div className={styled.canvasArea}></div> */}
        {/* <button>上傳圖片</button> */}
      </form>
    </div>
  )
}
