import React from 'react'
import rentalcss from '../../../styles/rental-scss/rental.module.scss'

const FilterAll = ({ conditions, setConditions }) => {
  const brandOption = ['KAZMI', 'Helinox', 'TiiTENT', 'Snow Peak']
  const labelOption = []
  return (
    <div className={rentalcss.more}>
      <div className={rentalcss.filtermorecontainer}>
        <div className={rentalcss.kind}>
          <p>品牌</p>
          <div className={rentalcss.checkboxcontainer}>
            {brandOption.map((v, i) => {
              return (
                <div key={i}>
                  <input
                    type="checkbox"
                    checked={conditions.brand.includes(v)}
                    value={v}
                    onChange={(e) => {
                      const value = e.target.value
                      if (conditions.brand.includes(v)) {
                        const delbrand = conditions.brand.filter(
                          (c) => c !== value
                        )
                        setConditions({
                          ...conditions,
                          brand: delbrand,
                          page: 1,
                        })
                      } else {
                        const addbrand = conditions.brand
                        addbrand.push(value)
                        setConditions({
                          ...conditions,
                          brand: addbrand,
                          page: 1,
                        })
                      }
                    }}
                  />
                  <label htmlFor="">{v}</label>
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className={rentalcss.kind}>
          <p>特色</p>
          <div className={rentalcss.checkboxcontainer}>
            {labelOption &&
              labelOption.map((v, i) => {
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      checked={conditions.label.includes(v)}
                      value={v}
                      onChange={(e) => {
                        const value = e.target.value
                        if (conditions.label.includes(v)) {
                          const dellabel = conditions.label.filter(
                            (c) => c !== value
                          )
                          setConditions({
                            ...conditions,
                            label: dellabel,
                            page: 1,
                          })
                        } else {
                          const addlabel = conditions.label
                          addlabel.push(value)
                          setConditions({
                            ...conditions,
                            label: addlabel,
                            page: 1,
                          })
                        }
                      }}
                    />
                    <label htmlFor="">{v}</label>
                  </div>
                )
              })}
          </div>
        </div> */}
        <div className={rentalcss.kind}>
          <p>排序</p>
          <div className={rentalcss.checkboxcontainer}>
            <div>
              <input
                type="radio"
                name="order_by"
                value=""
                onClick={() => {
                  setConditions({
                    ...conditions,
                    order_by: 'time_DESC',
                    page: 1,
                  })
                }}
              />
              <label>最新上架</label>
              <input
                type="radio"
                name="order_by"
                value="price_DESC"
                onClick={() =>
                  setConditions({
                    ...conditions,
                    order_by: 'price_DESC',
                    page: 1,
                  })
                }
              />
              <label>價格高到低</label>
              <input
                type="radio"
                name="order_by"
                value="price_ASC"
                onClick={() =>
                  setConditions({
                    ...conditions,
                    order_by: 'price_ASC',
                    page: 1,
                  })
                }
              />
              <label>價格低到高</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterAll
