import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Custom() {
  const customPic = useRef()
  const canvasRef = useRef()

  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const initCanvas = (id) => {
      return new fabric.Canvas(id, {
        width: 1200,
        height: 1200,
        selection: false,
      })
    }
    const setBackground = (url, canvas) => {
      fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
      })
    }

    const canvas = initCanvas('canvas')

    let mousePressed = false
    setBackground(
      'https://www.pakutaso.com/shared/img/thumb/AMEMAN17826009_TP_V.jpg',
      canvas
    )
    canvas.on('mouse:move', (event) => {
      if (mousePressed) {
        const mEvent = event.e
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
        canvas.relativePan(delta)
      }
    })

    canvas.on('mouse:down', (event) => {
      mousePressed = true
    })
    canvas.on('mouse:up', (event) => {
      mousePressed = false
    })
  }, [])

  return (
    <div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <canvas id="canvas" ref={canvasRef} onDrag={() => {}}></canvas>
      <form ref={customPic} encType="multipart/form-data">
        {/* <div className={styled.canvasArea}></div> */}
        <button>上傳圖片</button>
      </form>
    </div>
  )
}
