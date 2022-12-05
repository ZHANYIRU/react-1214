import React from 'react'
import styled from '../../styles/rental-scss/store.module.scss'
const Store = () => {
  return (
    <>
      <div className={styled.empty}> </div>
      <div className={styled.container}>
        <div>麵包屑</div>
        <div className={styled.middlecontainer}>
          <div className={styled.left}>
            <div className={styled.picdiv}>
              <img src="/taiwanpic.jpg" alt="" />
            </div>
          </div>
          <div className={styled.right}>
            <div className={`${styled.flex}`}>
              <div>
                <h2 className={styled.storetitle}>全台各大店點</h2>
              </div>
              <div>
                <select name="" id="" style={{ margin: '0 20px;' }}>
                  <option value="北部">北部</option>
                  <option value="中部">中部</option>
                  <option value="南部">南部</option>
                  <option value="東部">東部</option>
                </select>

                <select name="" id="">
                  <option value="">大安店</option>
                  <option value="">八德店</option>
                  <option value="">台中店</option>
                  <option value="">花蓮店</option>
                </select>
              </div>
            </div>
            <div className={`${styled.flex} ${styled.seconddiv}`}>
              <div>
                <h2>大安店</h2>
                <p>地址:台北市大安區資展路一段</p>
              </div>
              <div>
                <div>
                  <img
                    src="https://s.yimg.com/ny/api/res/1.2/6v5OCy2ryFXCkEcJ47FQCA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/os/creatr-uploaded-images/2022-08/0abf54b0-1951-11ed-bd77-21046e759255"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className={`${styled.flex} ${styled.thirddiv}`}>
              <p>
                你印象中的戶外用品專賣店，是那種店面小小、卻塞滿商品，每次走進去都像在尋寶的地方嗎？這幾年，他們變得不太一樣了，礙於專業用品天生就長得不時髦，要店面變得多華麗實在很逼人，但近年不少店家店內陳設變得寬敞舒適，裝備一目了然（尤其是每家店必有的背包牆），隨著各自設定的取向、代理商品和拿手的範疇不同，發展出不同的店內風景，相同的是已經走出過去塞滿滿的侷促，也不再因為賣的是機能服飾或物件，而讓人感到生硬冷冰。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Store
