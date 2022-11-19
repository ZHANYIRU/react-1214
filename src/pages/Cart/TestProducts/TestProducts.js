import { useState, useContext } from 'react'
import ProCartContext from '../../../contexts/ProCartContext'
import './test.scss'
// import { addProCart } from '../../../components/AddCart'

function TestProducts() {
  const { addProCart } = useContext(ProCartContext)
  const [qty, setQty] = useState(1)
  const [userSize, setUserSize] = useState('S')
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
  const dateId = Number(new Date())
  return (
    <>
      <div className="test">
        <h1>測試頁面</h1>
        <div>
          {testPro.map((el, i) => {
            return (
              <>
                <div key={el.productsid}>
                  <p>{el.proname}</p>
                  <p>{el.price}</p>
                  <select
                    value={userSize}
                    onChange={(e) => {
                      setUserSize(e.target.value)
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
                    value={qty}
                    onChange={(e) => {
                      setQty(Number(e.target.value))
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
                      userSize,
                      el.price,
                      qty
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
