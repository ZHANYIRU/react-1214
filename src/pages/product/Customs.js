import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
// import { Form } from 'react-bootstrap'
import { useRef, useState, useContext, useEffect } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import { fabric } from 'fabric'
import axios from 'axios'
import CustomLightBox from './components/customLightBox'
import custom1 from './img/custom1.png'
import custom2 from './img/custom2.png'
import custom3 from './img/custom3.png'
import custom4 from './img/custom4.png'
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
  const { addProCart } = useContext(ProCartContext)
  const [customImage, setCustomImage] = useState('a')
  // 尺寸選取
  const [size2, setSize2] = useState()
  //衣服size
  const clotheSize = ['S', 'M', 'L']
  const clotheChose = (
    <>
      <h2>商品規格</h2>
      {clotheSize.map((v, i) => {
        return (
          <>
            <div
              className={
                size2 == clotheSize[i]
                  ? `${styled.standardBoxChose}`
                  : `${styled.standardBox}`
              }
              onClick={() => {
                setSize2(v)
              }}
            >
              {v}
            </div>
          </>
        )
      })}
    </>
  )

  const bgImages = [
    {
      alt: '白T',
      src: custom1,
      color: '#184A43',
    },
    {
      alt: '排汗衫',
      src: custom2,
      color: '#3B4358',
    },
    {
      alt: '排汗衫2',
      src: custom3,
      color: '#424547',
    },
    {
      alt: '排汗衫3',
      src: custom4,
      color: '#184992',
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
    return bgImages.map((image, i) => {
      return (
        <>
          <div
            className={styled.everyColor}
            style={{ backgroundColor: `${image.color}` }}
            key={i}
            onClick={() => {
              // setBgColor(image.color)
              setBg(image.src)
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
        // pasteImage.setAttribute('crossOrigin', 'Anonymous')
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
    deleteImg.src = '/img/close_circle_outline.svg'
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
    let canvasWidth = 450
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
    const img = picRef.current.toDataURL()

    const arr = img.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1 // to make eslint happy
    }
    const filename = Date.now()
    const dataURLtoFile = new File([u8arr], filename, { type: mime })
    console.log(dataURLtoFile)
    const fd = new FormData()
    fd.append('avatar', dataURLtoFile)
    return toBackEndImg(fd)
  }

  // const fd = new FormData()
  // fd.append('img', dataURLtoFile, 'canvasPic')

  const toBackEndImg = (fd) => {
    let customImg
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    axios
      .post('http://localhost:3001/product/custom', fd, config)
      .then((response) => {
        customImg = response.data
        console.log(customImg);
        addProCart(719, '客製排汗衫', 'S', 2990, 1, customImg)
        setCustomImage(customImg)
      })
  }

  //將檔案丟到後端處理並儲存
  async function customImageSave() {
    const response = await axios.post('http://localhost:3001/product/custom', {
      customIamge: customImage,
    })
    const r = response.data
    console.log('我事後端', r)
  }

  useEffect(() => {}, [customImage])

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
          <h1 className={styled.customTitle}>客製化排汗衫</h1>
          <div className={styled.colorOptions}>顏色{renderBgImages()}</div>
          <div className={styled.size}>{clotheChose}</div>
          <div className={styled.addImgae}>
            <button onClick={() => handleShow('photo')} type="button">
              新增照片
            </button>
            <button onClick={reset} type="button">
              重設
            </button>
            <button onClick={output} type="button">
              下載
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
          </div>
          <div className={styled.addCart}>
            <button
              type="button"
              onClick={async () => {
                savePic()
              }}
            >
              加入購物車
            </button>
            <button
              type="button"
              onClick={() => {
                customImageSave()
              }}
            >
              直接購買
            </button>
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
