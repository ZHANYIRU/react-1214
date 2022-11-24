import dayjs from 'dayjs'
import MemberContext from '../../../contexts/MemberContext'
import { useState, useEffect, useContext } from 'react'
import styled from '../../../styles/order-scss/OrderTime.module.scss'
function OrderTime({ open, momOrder }) {
  const { auth } = useContext(MemberContext)
  const { rows, proRows, roomRows, renRows, camRows } = momOrder
  const [total, setTotal] = useState([])
  const test = () => {
    if (rows) {
      if (rows.length !== 0) {
        setTotal(
          rows.map((v, i) => {
            return (
              proRows.filter((v2, i2) => v.order_num === v2.order_num).length +
              roomRows.filter((v2, i2) => v.order_num === v2.order_num).length +
              renRows.filter((v2, i2) => v.order_num === v2.order_num).length +
              camRows.filter((v2, i2) => v.order_num === v2.order_num).length
            )
          })
        )
      }
    }
    console.log(rows)
  }
  useEffect(() => {
    console.log(789)
    test()
  }, [rows])

  return (
    <>
      <div>
        {rows &&
          rows.map((el, i) => {
            const d = dayjs(el.created_time)
            return (
              <div
                className={styled.timeWrap}
                key={el.order_num}
                onClick={test}
              >
                <div className={styled.time}>
                  <p>{d.isValid() && d.format('MMM')}</p>
                  <p>{d.format('DD')}</p>
                </div>
                <div
                  className={
                    styled.border
                    // open.includes(el.sid)
                    //   ? `${styled.long}`
                    //   : `${styled.border}`
                  }
                  style={{
                    height:
                      open.includes(el.sid) &&
                      (50 + total[i] * 225 > 518.5
                        ? `${518.5}px`
                        : `${50 + total[i] * 225}px`),
                  }}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default OrderTime
