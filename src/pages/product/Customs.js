import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Customs() {
  const customPic = useRef()
  const canvasRef = useRef()

  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      width: 1200,
      height: 800,
      backgroundColor: '#ccc',
      position: 'fixed',
      top: 0,
      // selection: false,
    })
  }
  let canvas2 = new fabric.Canvas('tshirt-canvas')
  function picChange(e) {
    var reader = new FileReader()

    reader.onload = function (event) {
      var imgObj = new Image()
      imgObj.src = event.target.result

      // When the picture loads, create the image in Fabric.js
      imgObj.onload = function () {
        var img = new fabric.Image(imgObj)

        img.scaleToHeight(300)
        img.scaleToWidth(300)
        canvas2.centerObject(img)
        canvas2.add(img)
        canvas2.renderAll()
      }
    }

    // If the user selected a picture, load it
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
  }
  useEffect(() => {
    // let mousePressed = false

    // const initCanvas = (id) => {
    //   return new fabric.Canvas(id, {
    //     width: 1200,
    //     height: 800,
    //     backgroundColor: '#ccc',
    //     position: 'fixed',
    //     top: 0,
    //     // selection: false,
    //   })
    // }
    // let canvas = initCanvas('canvas')

    // const setPanEvents = (canvas) => {
    //   canvas.on('mouse:move', (event) => {
    //     if (mousePressed) {
    //       canvas.setCursor('grab')
    //       canvas.renderAll()
    //       const mEvent = event.e
    //       const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
    //       canvas.relativePan(delta)
    //     }
    //   })

    //   canvas.on('mouse:down', (event) => {
    //     mousePressed = true
    //     canvas.setCursor('crosshair')
    //     canvas.renderAll()
    //   })
    //   canvas.on('mouse:up', (event) => {
    //     mousePressed = false
    //     canvas.setCursor('default')
    //     canvas.renderAll()
    //   })
    // }
    // const setBackground = (url, canvas) => {
    //   fabric.Image.fromURL(url, (img) => {
    //     canvas.centerObject(img)
    //     canvas.add(img)
    //     canvas.renderAll()
    //   })
    // }

    // //設置事件

    // setPanEvents(canvas)
    // setBackground(
    //   'https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png',
    //   canvas
    // )

    let canvas2 = new fabric.Canvas('tshirt-canvas')

    function picChange(e) {
      var reader = new FileReader()

      reader.onload = function (event) {
        var imgObj = new Image()
        imgObj.src = event.target.result

        // When the picture loads, create the image in Fabric.js
        imgObj.onload = function () {
          var img = new fabric.Image(imgObj)

          img.scaleToHeight(300)
          img.scaleToWidth(300)
          canvas2.centerObject(img)
          canvas2.add(img)
          canvas2.renderAll()
        }
      }

      // If the user selected a picture, load it
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
      }
    }
  }, [])

  return (
    <div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <button onClick={() => {}}>toggle pan</button>
      <button onClick={() => {}}>toggle Drawing</button>
      <canvas id="canvas" ref={canvasRef} onDrag={() => {}}></canvas>
      <canvas id="tshirt-canvas" ref={canvasRef} onDrag={() => {}}></canvas>
      <input
        type="file"
        id="tshirt-custompicture"
        ref={customPic}
        onChange={(e) => {
          picChange(e)
        }}
      />
    </div>
  )
}
