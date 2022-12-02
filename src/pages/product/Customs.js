import React from 'react'
// import styled from '../../styles/product-scss/Custom.module.scss'
import { form } from 'react-bootstrap'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect, useState } from 'react'
import { border } from '@mui/system'
export default function Customs(props) {
  const [color, setColor] = useState('#000000')
  const [modalType, setModalType] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [canvas, setCanvas] = useState('')
  const [show, setShow] = useState(false)
  const handleShow = (type) => {
    setModalType(type)
    type === 'bg' ? setModalTitle() : setModalTitle()
    setShow(true)
  }

  const setBg = (src) => {
    if (!canvas) return
    fabric.Image.fromURL(src, function (img) {
      img.scaleToWidth(canvas.width) //最後設寬度

      canvas.setBackgroundImage(img)
      canvas.requestRenderAll()
    })
  }
  const renderBgImages = () => {
    return (
      <img
        onClick={() =>
          setBg(
            'https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png'
          )
        }
        role="button"
        src="https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png"
        alt="衣服"
      />
    )
    // return props.bgImages.map((image) => {
    //   return (
    //     <img
    //       onClick={() => setBg(image.src)}
    //       role="button"
    //       key={image.alt}
    //       src={image.src}
    //       alt={image.alt}
    //     />
    //   )
    // })
  }

  const reset = () => {
    canvas.clear()

    fabric.Image.fromURL(props.bgImages[0].src, function (img) {
      img.scaleToWidth(canvas.width)
      img.scaleToHeight(canvas.height)
      canvas.setBackgroundImage(img)
      canvas.requestRenderAll()
    })
  }

  const output = () => {
    var image = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    const a = document.createElement('a')
    a.href = image
    a.download = `newyear2020.jpeg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
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

  // useEffect(() => {
  //   const setOrder = (order) => {
  //     const obj = canvas.getActiveObject()
  //     if (!obj) return
  //     if (order === 'top') obj.bringToFront()
  //     if (order === 'bottom') obj.sendToBack()
  //   }
  // }, [])

  // fabric.Image.fromURL(props.bgImages[0].src, function (img) {
  //   img.scaleToWidth(canvas.width)
  //   img.scaleToHeight(canvas.height)
  //   canvas.setBackgroundImage(img)
  //   canvas.requestRenderAll()
  // })
  // const addText = () => {
  //   const text = document.querySelector('#text_input').value

  //   const textbox = new fabric.Textbox(text, {
  //     left: 50,
  //     top: 50,
  //     width: 100,
  //     fontSize: 20,
  //     fontWeight: 800, //
  //     // fill: colorInput, //
  //     fill: color, //
  //     // fontStyle: 'italic',
  //     fontFamily: 'Noto Sans TC',
  //     // stroke: 'green',
  //     // strokeWidth: 3,
  //     hasControls: true,
  //     borderColor: 'orange',
  //     editingBorderColor: 'blue',
  //   })
  //   canvas.add(textbox).setActiveObject(textbox)
  // }
  return (
    <>
      <main className="custom container-fluid position-relative">
        <div className="custom_page d-flex justify-content-center flex-wrap">
          <div className="d-flex flex-wrap">
            <div className="col-md-8 col-12 mat_space d-flex align-items-center justify-content-center">
              <canvas
                id="canvas"
                style={{ border: '1px black solid' }}
              ></canvas>
            </div>
            <div
              className="rightArea"
              style={{ height: '500px', border: '1px black solid' }}
            >
              <div className="selectOptions">{renderBgImages()}</div>
              <div className="d-flex flex-column align-items-start mt-4 h-50">
                <div className="mt-2 mb-auto">
                  <button
                    onClick={() => handleShow('photo')}
                    type="button"
                    className="btn_f"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    加入照片
                  </button>

                  {/* <div className="mt-2">{renderStickers()}</div> */}

                  <div className="d-flex justify-content-start mt-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      style={{ height: '35px', width: '35px' }}
                      className="mx-2"
                    />
                    <input
                      type="text"
                      className="col w-75 me-2"
                      id="text_input"
                    />
                    <button
                      onClick={() => {}}
                      type="button"
                      className="btn_f"
                      id="add_text_btn"
                    >
                      加入文字
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-wrap mt-2">
                  <button onClick={reset} type="button" className="btn_g mt-2">
                    重設
                  </button>
                  <button
                    onClick={output}
                    className="btn_l ms-2 mt-2"
                    type="button"
                  >
                    下載
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute d-flex align-items-end logo_wrap">
          <h2>你誰</h2>
        </div>
        <div className="text-center"></div>
      </main>
    </>
  )
}
