import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
// import { Form } from 'react-bootstrap'
import { useRef } from 'react'
import { fabric } from 'fabric'
import { useEffect, useState } from 'react'
import CustomLightBox from './components/customLightBox'
export default function Customs(props) {
  const picRef = useRef()
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('')
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
      color: 'white',
    },
    {
      alt: '排汗衫',
      src: '/img/gallery-5d5afd3f1c7d6.png',
      color: 'black',
    },
    {
      alt: '排汗衫2',
      src: 'https://img.my-best.tw/press_component/item_part_images/7cbcd08ae9afa0e80ba0155dd08242e1.png?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip',
      color: 'red',
    },
    {
      alt: '排汗衫3',
      src: 'https://img.my-best.tw/press_component/item_part_images/7cbcd08ae9afa0e80ba0155dd08242e1.png?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip',
      color: '#ccc',
    },
  ]

  const handleShow = (type) => {
    setModalType(type)
    type === 'bg' ? setModalTitle() : setModalTitle()
    setShow(true)
  }
  //換背景圖
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
      image.scaleToWidth(300)
      canvasModal.setHeight(image.height * image.scaleY)
      console.log(image)
      setUploadImage(image)
      canvasModal.add(image).setActiveObject(image).renderAll()
    }
  }
  const renderBgImages = () => {
    return bgImages.map((image) => {
      return (
        <>
          <div
            className={styled.everyColor}
            style={{ backgroundColor: `${image.color}` }}
            onClick={() => {
              setBgColor(image.color)
            }}
          ></div>
        </>
      )
    })
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
    const image = canvas
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

  const initDeleteIcon = () => {
    const deleteImg = document.createElement('img')
    deleteImg.src = '/img/close-circle-outline.svg'
    deleteImg.classList.add('deleteBtn')

    const control = {
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: (eventData, transform) =>
        deleteObject(eventData, transform),
      render: renderIcon(deleteImg),
      cornerSize: 24,
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control(control)
    fabric.Textbox.prototype.controls.deleteControl = new fabric.Control(
      control
    )

    function renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        const size = control.cornerSize
        ctx.save()
        ctx.translate(left, top)
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
        ctx.drawImage(icon, -size / 2, -size / 2, size, size)
        ctx.restore()
      }
    }

    function deleteObject(eventData, transform) {
      var target = transform.target
      var canvas = target.canvas
      canvas.remove(target)
      canvas.requestRenderAll()
    }
  }

  useEffect(() => {
    let canvasWidth = 500
    const canvas = new fabric.Canvas('canvas', {
      width: canvasWidth,
      height: canvasWidth,
    })
    setCanvas(canvas)

    fabric.Image.fromURL(bgImages[0].src, function (img) {
      // img.setAttribute('crossOrigin', 'Anonymous')
      img.scaleToWidth(canvas.width)
      img.scaleToHeight(canvas.height)
      canvas.setBackgroundImage(img)
      canvas.requestRenderAll()
    })
    initDeleteIcon()
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
    // uploadImage.hasControls = false
    // uploadImage.hasBorders = false
    const base64 = picRef.current.toDataURL()
    console.log(base64)
  }

  // fabric.Image.fromURL(props.bgImages[0].src, function (img) {
  //   img.scaleToWidth(canvas.width)
  //   img.scaleToHeight(canvas.height)
  //   canvas.setBackgroundImage(img)
  //   canvas.requestRenderAll()
  // })

  return (
    <>
      <div className={styled.empty}></div>
      {show && (
        <CustomLightBox
          addPhoto={addPhoto}
          uploadPhoto={uploadPhoto}
          canvasModal={canvasModal}
          setShow={setShow}
          setUploadImage={setUploadImage}
          setCanvasModal={setCanvasModal}
        />
      )}
      <div className={styled.customBox}>
        <div className={styled.leftArea}>
          <div
            className={styled.canvasWrap}
            style={{ background: `${bgColor}` }}
          >
            <canvas id="canvas" ref={picRef}></canvas>
          </div>
        </div>
        <div className={styled.rightArea}>
          <div className={styled.colorOptions}>{renderBgImages()}</div>
          <div className={styled.addImgae}>
            <button
              onClick={() => handleShow('photo')}
              type="button"
              className="btn_f"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              新增照片
            </button>
          </div>
          <div className={styled.addText}>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ height: '35px', width: '35px' }}
              className="mx-2"
            />
            <input type="text" className="" id="text_input" />
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
            <div className={styled.addCart}>
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

              <button
                type="button"
                onClick={() => {
                  savePic()
                }}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="custom container-fluid position-relative">
        {/* <canvas id="canvasModal"></canvas> */}

        {/* <div className="position-absolute d-flex align-items-end logo_wrap"> */}
        {/* <h2>你誰</h2> */}
        {/* </div> */}
        {/* <div className="text-center"></div> */}
      </main>
    </>
  )
}

//https://rachel-liaw.github.io/react_canvas/  參考網頁
//https://github.com/rachel-liaw/react_canvas/blob/main/src/components/NewYearCanvas.js  參考網頁
