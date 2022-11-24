import dayjs from 'dayjs'
import styled from '../../../styles/order-scss/OrderTime.module.scss'
function OrderTime({ open, momOrder }) {
  const { rows, proRows, roomRows, renRows, camRows } = momOrder
  const test = () => {
    let pro
    let room
    let ren
    let cam
    if (proRows) {
      pro = rows.map((v, i) => {
        return (
          proRows.filter((v2, i2) => v.order_num === v2.order_num).length +
          roomRows.filter((v2, i2) => v.order_num === v2.order_num).length +
          renRows.filter((v2, i2) => v.order_num === v2.order_num).length +
          camRows.filter((v2, i2) => v.order_num === v2.order_num).length
        )
      })
    }
    // if (roomRows) {
    //   room = rows.map((v, i) => {
    //     return roomRows.filter((v2, i2) => v.order_num === v2.order_num).length
    //   })
    // }
    // if (renRows) {
    //   ren = rows.map((v, i) => {
    //     return renRows.filter((v2, i2) => v.order_num === v2.order_num).length
    //   })
    // }
    // if (camRows) {
    //   cam = rows.map((v, i) => {
    //     return camRows.filter((v2, i2) => v.order_num === v2.order_num).length
    //   })
    // }
    console.log(pro)
    console.log(momOrder)
  }

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
                    open.includes(el.sid)
                      ? `${styled.long}`
                      : `${styled.border}`
                  }
                />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default OrderTime
