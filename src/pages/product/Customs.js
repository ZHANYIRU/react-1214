import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
// import { Form } from 'react-bootstrap'
import { useRef, useState, useContext, useEffect } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import { fabric } from 'fabric'
import axios from 'axios'
import Swal from 'sweetalert2'
import CustomLightBox from './components/customLightBox'
import custom1 from './img/custom1.png'
import custom2 from './img/custom2.png'
import custom3 from './img/custom3.png'
import custom4 from './img/custom4.png'
export default function Customs(props) {
  const bgImages = [
    {
      sid: 719,
      alt: '客製化 排汗衫 (綠)',
      src: custom1,
      color: '#184A43',
    },
    {
      sid: 720,
      alt: '客製化 排汗衫 (灰藍)',
      src: custom2,
      color: '#3B4358',
    },
    {
      sid: 721,
      alt: '客製化 排汗衫 (灰)',
      src: custom3,
      color: '#424547',
    },
    {
      sid: 722,
      alt: '客製化 排汗衫 (深藍)',
      src: custom4,
      color: '#184992',
    },
  ]
  const picRef = useRef()
  const [color, setColor] = useState('#000000')
  const [choseWhitchSid, setChoseWhitchSid] = useState(719)
  const [choseWhitchClothe, setChoseWhitchClothe] =
    useState('客製化 排汗衫 (綠)')
  const [num, setNum] = useState(1)
  const [uploadImage, setUploadImage] = useState('')
  const [modalType, setModalType] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [canvas, setCanvas] = useState('')
  const [canvasModal, setCanvasModal] = useState('')
  const [show, setShow] = useState(false)
  const { addProCart } = useContext(ProCartContext)
  const [customImage, setCustomImage] = useState('a')
  //format currency
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //sweetAlert2
  const sweetAlert = (text) => {
    Swal.fire({
      title: `${text}`,
      icon: 'info',
      scrollbarPadding: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    })
  }
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
              key={i}
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

  //加入購物車方法
  const addCartFunction = () => {
    Swal.fire({
      icon: 'success',
      title: '已加入!',
      showCancelButton: false,
    })
    savePic()
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
              setChoseWhitchClothe(image.alt)
              setChoseWhitchSid(image.sid)
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
    a.download = `newCustom.jpeg`
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

  const toBackEndImg = async (fd) => {
    let newCustomImg = ''
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/product/custom',
        fd,
        config
      )

      newCustomImg = response.data
      console.log(newCustomImg)
      if (newCustomImg) {
        addProCart(
          choseWhitchSid,
          choseWhitchClothe,
          size2,
          4990,
          num,
          newCustomImg
        )
        setCustomImage(newCustomImg)
      } else {
        sweetAlert('伺服器忙碌請再試一次')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {}, [])

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
          <div className={styled.canvasWrap}>
            <canvas id="canvas" ref={picRef}></canvas>
          </div>
        </div>
        <div className={styled.rightArea}>
          <h1 className={styled.customTitle}>
            {choseWhitchClothe ? choseWhitchClothe : '客製化 排汗衫 (綠)'}
          </h1>
          <div className={styled.colorOptions}>顏色{renderBgImages()}</div>
          <div className={styled.size}>{clotheChose}</div>
          <h2 className={styled.price}>金額：{moneyFormat(4990)}</h2>
          <div className={styled.howNum}>
            <p>商品數量</p>
            <div className={styled.numBox}>
              <div className={styled.numBox1}>
                <i
                  className="fa-solid fa-minus"
                  onClick={() => {
                    if (num < 2) return
                    setNum(num - 1)
                  }}
                ></i>
              </div>
              <div className={styled.numBox2}>{num}</div>
              <div className={styled.numBox3}>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {
                    setNum(num + 1)
                  }}
                ></i>
              </div>
            </div>
          </div>
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
                if (!size2) {
                  return sweetAlert('請選尺寸')
                } else {
                  // savePic()
                  addCartFunction()
                }
              }}
            >
              加入購物車
            </button>
            <button
              type="button"
              onClick={() => {
                if (!size2) {
                  return sweetAlert('請選尺寸')
                } else {
                  savePic()
                }
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
