import { useState, useContext } from 'react'
import ProCartContext from '../../../contexts/ProCartContext'
import './test.scss'
// import { addProCart } from '../../../components/AddCart'

function TestProducts() {
  const { addProCart, addRoomCart } = useContext(ProCartContext)
  const [qty, setQty] = useState([1, 1])
  const [qty2, setQty2] = useState([1, 1])
  const [date2, setdate2] = useState({
    start: '',
    end: '',
  })
  const [userSize, setUserSize] = useState(['S', 'S'])
  const size = ['S', 'M', 'L']
  const testPro = [
    {
      productsid: 50,
      proname: '+9拐杖',
      price: 2000,
    },
    {
      productsid: 30,
      proname: 'IU簽名照',
      price: 2000000,
    },
  ]
  const testRoom = [
    {
      room_sid: 20,
      name: '超豪華報紙',
      price: 3000,
    },
    {
      room_sid: 40,
      name: '你家',
      price: 6000,
    },
  ]
  return (
    <>
      <div className="test">
        <div>
          <h1>商品Test</h1>
          {testPro.map((el, i) => {
            return (
              <>
                <div key={el.productsid}>
                  <p>{el.proname}</p>
                  <p>{el.price}</p>
                  <select
                    value={userSize[i]}
                    onChange={(e) => {
                      const newSize = [...userSize]
                      newSize[i] = e.target.value
                      setUserSize(newSize)
                    }}
                  >
                    {size.map((el1, i1) => {
                      return (
                        <option value={el1} key={i1}>
                          {el1}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    value={qty[i]}
                    onChange={(e) => {
                      const newQty = [...qty]
                      newQty[i] = +e.target.value
                      setQty(newQty)
                    }}
                  >
                    {Array(10)
                      .fill(1)
                      .map((v, i2) => {
                        return (
                          <option value={i2 + 1} key={i2}>
                            {i2 + 1}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <button
                  onClick={() => {
                    addProCart(
                      el.productsid,
                      el.proname,
                      userSize[i],
                      el.price,
                      qty[i]
                    )
                  }}
                >
                  加入購物車
                </button>
              </>
            )
          })}
        </div>
        <div>
          <h2>房間Test</h2>
          {testRoom.map((el, i) => {
            return (
              <>
                <div key={el.room_sid}>
                  <p>{el.name}</p>
                  <p>{el.price}</p>
                  <input
                    type="date"
                    value={date2.start}
                    name="start"
                    onChange={(e) => {
                      const newStart = {
                        ...date2,
                        [e.target.name]: e.target.value,
                      }
                      setdate2(newStart)
                    }}
                  />
                  <input
                    type="date"
                    value={date2.end}
                    name="end"
                    onChange={(e) => {
                      const newStart = {
                        ...date2,
                        [e.target.name]: e.target.value,
                      }
                      setdate2(newStart)
                    }}
                  />
                  <select
                    value={qty2[i]}
                    onChange={(e) => {
                      const newQty = [...qty2]
                      newQty[i] = +e.target.value
                      setQty2(newQty)
                    }}
                  >
                    {Array(10)
                      .fill(1)
                      .map((v, i2) => {
                        return (
                          <option value={i2 + 1} key={i2}>
                            {i2 + 1}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <button
                  onClick={() => {
                    addRoomCart()
                    console.log(
                      el.room_sid,
                      el.name,
                      date2.start,
                      date2.end,
                      el.price,
                      qty2[i]
                    )
                  }}
                >
                  加入購物車
                </button>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default TestProducts
