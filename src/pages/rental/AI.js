import React, { useState, useRef, useEffect } from 'react'
import styled from '../../styles/rental-scss/AI.module.scss'
import axios from 'axios'
import User_local from './components/User_local'
import User_remote from './components/User_remote'
const AI = ({ setCs }) => {
  const [question, setQuestion] = useState([])
  const [words, setWords] = useState([])
  const [talk, setTalk] = useState([
    { who: 'remote', talk: '您好！我是AI客服唷～很高興為您服務' },
  ])

  const axiosQuestion = async function () {
    const q = question
    setQuestion('')
    const fd = new FormData()
    fd.append('question', q)
    const response = await axios.post('http://localhost:3001/rental/ai', fd)
    console.log(response.data)
    setTalk([
      ...talk,
      { who: 'local', talk: q },
      { who: 'remote', talk: response.data.answer },
    ])
  }

  const bottomRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }, [talk])
  })
  return (
    <>
      <div className={styled.empty}></div>
      <div className={styled.body}>
        <div className={styled.closeBar}>
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              setCs(false)
            }}
          ></i>
        </div>

        <div className={styled.dialogue}>
          {talk.map((e, i) => {
            return e.who === 'remote' ? (
              <User_remote text={e.talk} key={i} />
            ) : (
              <User_local text={e.talk} key={i} />
            )
          })}
          <div ref={bottomRef}></div>
        </div>
        <div className={styled.userInput}>
          <input
            name="question"
            type="text"
            placeholder="請輸入您的問題"
            value={words}
            onChange={(e) => {
              console.log(e)
              setWords(e.target.value)
              setQuestion(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                buttonRef.current.click()
                console.log(e.keyCode)
              }
              
            }}
          />
          <button
            ref={buttonRef}
            onClick={() => {
              setTalk([
                ...talk,
                { who: 'local', talk: question },
                { who: 'remote', talk: '正在查詢中....' },
              ])
              axiosQuestion()
              setWords('')
            }}
          >
            送出
          </button>
        </div>
      </div>
    </>
  )
}

export default AI
