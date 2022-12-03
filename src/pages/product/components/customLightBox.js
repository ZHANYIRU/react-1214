import React from 'react'
import { useEffect } from 'react'
import styled from '../../../styles/product-scss/Custom.module.scss'
import { fabric } from 'fabric'
// import { Modal } from 'react-bootstrap'
export default function CustomLightBox({
  setShow,
  addPhoto,
  setUploadImage,
  canvasModal,
  uploadPhoto,
  setCanvasModal,
}) {
  useEffect(() => {
    let canvasWidth = 300
    const canvasModal = new fabric.Canvas('canvasModal', {
      width: canvasWidth,
      height: canvasWidth,
    })
    setCanvasModal(canvasModal)
  }, [])

  return (
    <>
      <div className={styled.customLightBox}>
        <div className={styled.customLightBoxBg}>
          <div className={styled.topArea}>
            <form
              onChange={(e) => {
                e.preventDefault()
              }}
            >
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => {
                  uploadPhoto(e)
                }}
              />
            </form>
            <img
              src=""
              alt="escape"
              onClick={() => {
                setShow(false)
              }}
            />
          </div>
          <div className={styled.canvasModal}>
            <canvas id="canvasModal"></canvas>
          </div>
          <div className={styled.bottonBox}>
            <button
              type="button"
              onClick={() => {
                addPhoto()
                setShow(false)
              }}
            >
              確定
            </button>
            <button
              type="button"
              onClick={() => {
                canvasModal.clear()
              }}
            >
              清除
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
