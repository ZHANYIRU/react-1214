import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric } from 'fabric'
export default function Custom() {
  const customPic = useRef()
  const customPic2 = useRef()

  const canvas = new fabric.Canvas('canvas')

  fabric.Image.fromURL(
    'https://www.pakutaso.com/shared/img/thumb/AMEMAN17826009_TP_V.jpg',
    (img) => {
      const oImg = img.set({
        left: 100,
        top: 100,
        angle: 15,
        width: 500,
        height: 500,
      })
      canvas.setBackgroundImage(oImg).renderAll()
    }
  )

  return (
    <div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>

      <form ref={customPic} encType="multipart/form-data">
        <div className={styled.canvasArea}>
          <img src="" ref={customPic2} alt="" />
        </div>
        <button>上傳圖片</button>
      </form>
    </div>
  )
}
