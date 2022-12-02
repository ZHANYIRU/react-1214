import React from 'react'
import styled from '../../styles/product-scss/Custom.module.scss'
import { useRef } from 'react'
import { fabric, FabricJSCanvas, useFabricJSEditor } from 'fabric'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Custom() {
  const customPic = useRef()
  const canvasRef = useRef()
  const { editor, onReady } = useFabricJSEditor()
  const onAddCircle = () => {
    editor.addCircle()
  }
  const onAddRectangle = () => {
    editor.addRectangle()
  }
  useEffect(() => {}, [])

  return (
    <div>
      <h1>FabricJS React Sample</h1>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="" onReady={onReady} />
    </div>
  )
}
