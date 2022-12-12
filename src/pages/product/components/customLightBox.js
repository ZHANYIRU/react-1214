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

  useEffect(() => {
    if (setShow) {
      document.body.style.overflow = 'hidden'
    }
  }, [setShow])

  return (
    <>
      <div
        className={styled.customLightBox}
        onClick={() => {
          setShow(false)
          document.body.style.overflow = 'visible'
        }}
      >
        <div
          className={styled.customLightBoxBg}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={styled.topArea}>
            <div className={styled.title}>新增照片</div>
            <div className={styled.escape}>
              <img
                src="/img/close_circle_outline.svg"
                alt="escape"
                onClick={() => {
                  setShow(false)
                  document.body.style.overflow = 'visible'
                }}
              />
            </div>
          </div>
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
          <div className={styled.canvasModal}>
            <canvas id="canvasModal"></canvas>
          </div>
          <div className={styled.bottonBox}>
            <button
              type="button"
              onClick={() => {
                addPhoto()
                setShow(false)
                document.body.style.overflow = 'visible'
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
