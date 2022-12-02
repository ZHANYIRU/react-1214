import React from 'react'
// import styled from '../../styles/product-scss/Custom.module.scss'
import { form } from 'react-bootstrap'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect, useState } from 'react'
import { border } from '@mui/system'
export default function Customs(props) {
  const picRef = useRef()
  const [color, setColor] = useState('#000000')
  const [uploadImage, setUploadImage] = useState('')
  const [modalType, setModalType] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [canvas, setCanvas] = useState('')
  const [canvasModal, setCanvasModal] = useState('')
  const [show, setShow] = useState(false)

  const bgImages = [
    {
      alt: '白T',
      src: '/img/gallery-5d5afd3f1c7d6.png',
    },
    {
      alt: '排汗衫',
      src: 'https://img.my-best.tw/press_component/item_part_images/7d79babb7e1ec7e8820a87202a9c6590.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip',
    },
    {
      alt: '排汗衫2',
      src: 'https://img.my-best.tw/press_component/item_part_images/7cbcd08ae9afa0e80ba0155dd08242e1.png?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip',
    },
  ]

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

  const uploadPhoto = (e) => {
    //const reader = new FileReader()
    // const img = new Image()
    // img.onload = function () {
    //   const ctx = picRef.current.getContext('2d')
    //   ctx.drawImage(img, 0, 0)
    // }
    // img.src = URL.createObjectURL(e.target.files[0])

    const uploadImageTmp = new Image()
    uploadImageTmp.src = URL.createObjectURL(e.target.files[0])
    uploadImageTmp.onload = function () {
      const image = new fabric.Image(uploadImageTmp)
      image.set({
        left: 0,
        top: 0,
        clipPath: '',
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false,
        evented: false,
      })
      image.scaleToWidth(200)
      canvasModal.setHeight(image.height * image.scaleY)
      console.log(image)
      setUploadImage(image)
      canvasModal.add(image).setActiveObject(image).renderAll()
    }
  }
  const renderBgImages = () => {
    return bgImages.map((image) => {
      return (
        <img
          onClick={() => setBg(image.src)}
          role="button"
          key={image.alt}
          src={image.src}
          className="img-thumbnail w-25"
          alt={image.alt}
        />
      )
    })
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

    fabric.Image.fromURL(bgImages[0].src, function (img) {
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

  const addPhoto = () => {
    if (uploadImage) {
      const modifiedImage = canvasModal
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      const pasteImage = new Image()
      if (modalType === 'bg') setBg(modifiedImage)
      if (modalType === 'photo') {
        pasteImage.src = modifiedImage
        pasteImage.setAttribute('crossOrigin', 'Anonymous')
        pasteImage.onload = function () {
          const image = new fabric.Image(pasteImage)
          image.set({
            left: 100,
            top: 60,
            objectCaching: false,
          })
          canvas.add(image).setActiveObject(image).renderAll()
        }
      }
    }
  }

  useEffect(() => {
    let canvasWidth = 500
    const canvas = new fabric.Canvas('canvas', {
      width: canvasWidth,
      height: canvasWidth,
    })
    setCanvas(canvas)
    bgImages[0].setAttribute('crossOrigin', 'Anonymous')
    fabric.Image.fromURL(bgImages[0].src, function (img) {
      img.scaleToWidth(canvas.width)
      img.scaleToHeight(canvas.height)
      canvas.setBackgroundImage(img)
      canvas.requestRenderAll()
    })
  }, [])

  // useEffect(() => {
  //   let canvasW = 500
  //   let canvasH = 500

  //   const canvas = new fabric.Canvas('canvas', {
  //     width: canvasW,
  //     height: canvasH,
  //   })

  //   setCanvas(canvas)
  // }, [])

  useEffect(() => {
    let canvasWidth = 300
    const canvasModal = new fabric.Canvas('canvasModal', {
      width: canvasWidth,
      height: canvasWidth,
    })
    setCanvasModal(canvasModal)
  }, [])

  const addText = () => {
    const text = document.querySelector('#text_input').value

    const textbox = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      width: 100,
      fontSize: 25,
      fontWeight: 800, //
      // fill: colorInput, //
      fill: color, //
      // fontStyle: 'italic',
      fontFamily: 'Noto Sans TC',
      // stroke: 'green',
      // strokeWidth: 3,
      hasControls: true,
      borderColor: 'orange',
      editingBorderColor: 'blue',
    })
    canvas.add(textbox).setActiveObject(textbox)
  }

  function savePic() {
    // const base64 = picRef.current.toDataURL({
    //   format: 'jpeg',
    //   quality: 1,
    // })
    const base64 = picRef.current.toDataURL()
    console.log(base64)
  }
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

  return (
    <>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <div>5</div>
      <main className="custom container-fluid position-relative">
        <div className="custom_page d-flex justify-content-center flex-wrap">
          <div className="d-flex flex-wrap">
            <div className="col-md-8 col-12 mat_space d-flex align-items-center justify-content-center">
              <canvas
                id="canvas"
                style={{ border: '1px black solid' }}
                ref={picRef}
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
                    {'燈箱按鈕'}
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
                      onClick={() => {
                        addText()
                      }}
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
                  <form
                    onChange={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        addPhoto()
                      }}
                    >
                      確定送出照片
                    </button>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={uploadPhoto}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        savePic()
                      }}
                    >
                      存檔成base64
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="position-absolute d-flex align-items-end logo_wrap"> */}
        {/* <h2>你誰</h2> */}
        {/* </div> */}
        {/* <div className="text-center"></div> */}
      </main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

//https://rachel-liaw.github.io/react_canvas/  參考網頁
//https://github.com/rachel-liaw/react_canvas/blob/main/src/components/NewYearCanvas.js  參考網頁
