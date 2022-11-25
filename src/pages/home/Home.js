import { useState } from 'react'
import Background from './Background'
import Main from './Main'

function Home() {
  const [ftr, setFtr] = useState(false)
  return (
    <>
      <Background ftr={ftr} />
      <Main setFtr={setFtr} />
    </>
  )
}

export default Home
