import React, { useState } from 'react'
import styled from '../../styles/rental-scss/AI.module.scss'
import axios from 'axios'
import User_local from './components/User_local'
import User_remote from './components/User_remote'
const AI = () => {
  const [question, setQuestion] = useState([])
  // const [answer, setAnswer] = useState([])
  const [talk, setTalk] = useState([
    { who: 'remote', talk: '您好！我是AI客服唷～很高興為您服務' },
  ])
  // const sentQuestion = function () {
  //   const fd = new FormData()
  //   fd.append('question', question)
  //   fetch('http://localhost:3001/rental/ai', {
  //     method: 'POST',
  //     body: fd,
  //   })
  //     .then((r) => r.json())
  //     .then((result) => {
  //       console.log(result)
  //     })
  // }
  const axiosQuestion = async function () {
    const q = question
    setQuestion('')
    const fd = new FormData()
    fd.append('question', q)
    const response = await axios.post('http://localhost:3001/rental/ai', fd)
    console.log(response.data)
    // setAnswer(response.data)
    setTalk([
      ...talk,
      { who: 'local', talk: q },
      { who: 'remote', talk: response.data.answer },
    ])
  }

  // const test = [
  //   { who: 'remote', talk: '我是客服' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'remote', talk: '我是測試' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  //   { who: 'local', talk: '我是會員' },
  // ]
  //url='http://localhost:3001/rental/ai'

  return (
    <>
      <div className={styled.empty}></div>
      <div className={styled.body}>
        <div className={styled.dialogue}>
          {/* 客服回話 */}
          {/* <div className={styled.user_remote}>
            <div className={styled.avatar}>
              <div className={styled.pic}>
                <img src="customer_service.png" alt="" />
              </div>
              <div className={styled.name}>智能客服</div>
            </div>
            <div className={styled.txt}>很高興為您服務</div>
          </div> */}
          {/* 使用者輸入問題 */}
          {/* <div className={styled.user_local}>
            <div className={styled.avatar}>
              <div className={styled.pic}>
                <img src="Sally.jpeg" alt="" />
              </div>
              <div className={styled.name}>憤怒的葡萄</div>
            </div>
            <div className={styled.txt}>
              我有問題我有問題我有問題我有問題我有問題我有問題我有問題我有問題我有問題我有問題我有問題
            </div>
          </div> */}
          {talk.map((e, i) => {
            return e.who === 'remote' ? (
              <User_remote text={e.talk} key={i} />
            ) : (
              <User_local text={e.talk} key={i} />
            )
          })}
        </div>
        <div className={styled.userInput}>
          <input
            name="question"
            type="text"
            onChange={(e) => {
              setQuestion(e.target.value)
            }}
          />
          <button
            onClick={() => {
              setTalk([...talk, { who: 'local', talk: question }])
              axiosQuestion()
            }}
          >
            請輸入問題
          </button>
        </div>
      </div>
    </>
  )
}

export default AI
