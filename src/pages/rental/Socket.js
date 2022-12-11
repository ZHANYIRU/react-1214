import React, { useState, useEffect } from 'react'
import styled from '../../styles/rental-scss/Socket.module.scss'
import socketIO from 'socket.io-client'

// console.log(socket)
const Socket = () => {
  const socket = socketIO.connect('http://localhost:3001')
  // console.log('???????:', socket)

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  const InputHandler = (e) => {
    setInput(e.target.value)
  }

  const sendMessage = () => {
    socket.emit('Message', input)
    // console.log(socket)

    setInput('')
  }
  socket.on('Message', (message) => {
    console.log(message)
  })

  return (
    <>
      <div className={styled.empty}></div>
      <div>
        <input type="text" onChange={InputHandler} value={input} />
        <button onClick={sendMessage}>送訊息</button>
      </div>
    </>
  )
}

export default Socket
