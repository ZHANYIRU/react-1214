import dayjs from 'dayjs'
import styled from '../../../styles/order-scss/OrderTime.module.scss'
function OrderTime({ rows, open }) {
  return (
    <>
      <div>
        {rows &&
          rows.map((el, i) => {
            const d = dayjs(el.created_time)
            return (
              <div className={styled.timeWrap} key={el.order_num}>
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
