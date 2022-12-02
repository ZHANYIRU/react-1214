import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Customs(props) {
  const customPic = useRef()
  const canvasRef = useRef()
  const [canvas, setCanvas] = useState('')

  const renderBgImages = () => {
    return props.bgImages.map((image) => {
      return (
        <img
          onClick={() => setBg(image.src)}
          role="button"
          key={image.alt}
          src={image.src}
          alt={image.alt}
        />
      )
    })
  }
  const setBg = (src) => {
    if (!canvas) return
    fabric.Image.fromURL(src, function (img) {
      img.scaleToWidth(canvas.width) //最後設寬度

      canvas.setBackgroundImage(img)
      canvas.requestRenderAll()
    })
  }

  useEffect(() => {
    let canvasW = 500
    let canvasH = 500

    const canvas = new fabric.Canvas('canvas', {
      width: canvasW,
      height: canvasH,
    })

    setCanvas(canvas)
  }, [])

  return (
    <>
      <div>
        <canvas id="canvas"></canvas>
      </div>
      <div>{renderBgImages()}</div>
    </>
  )
}
