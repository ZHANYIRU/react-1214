import { useState } from 'react'
import Background from './Background'
import Main from './Main'
import Leaderboard from './leaderboard'
function Home() {
  const [ftr, setFtr] = useState(false)
  return (
    <>
      <Background ftr={ftr} />
      <Main setFtr={setFtr} />
      <Leaderboard />
    </>
  )
}

export default Home
