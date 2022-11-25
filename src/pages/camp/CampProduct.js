import React from 'react'
import ListLeft from './components/ListLeft'
import style from '../../styles/camp-scss/campproduct.module.scss'

function CampProduct() {
  return (
    <div className={style.product}>
      <ListLeft />
      <div className={style.pright}>
        <div>麵包屑/麵包屑/麵包屑/麵包屑</div>
        <div className={style.card}>
          <div className={style.cardtop}>
            <h2>霞喀羅古道 - 賞楓路線新手難度兩天一夜</h2>
            <div>
              <div>地區</div>
              <div className={style.location}>
                <span>
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <span>苗栗</span>
              </div>
              <div className={style.mountain}>
                <span>
                  <i className="fa-solid fa-mountain"></i>
                </span>
                <span>山名</span>
              </div>
              <div>山名</div>
              <div>金額</div>
              <div>評價</div>
            </div>

            <div>
              train
              <img src="https://s3.amazonaws.com/imagescloud/images/medias/annexes/annexe-camping-2022.jpg" />
            </div>
            <div>火車左右按鈕</div>
          </div>
          <div className={style.switch}>
            <div>介紹</div>
            <div>評論(12)</div>
          </div>
          <div className={style.cardcontext}>
            <div id="introduction">
              <h4>活動介紹</h4>
              <p>
                初入山林的你，是否會想要走進大自然、穿越歷史、體驗山林呢？
                霞喀羅古道，又稱石鹿古道，可以說是個北起秀巒溫泉、南到清泉溫泉的史蹟巡禮之路！
                日治時代政府開闢警備道路直通深山部落，並設立薩克亞金駐在所派駐警力監控山地部落
                直到 2001
                年經林務局規劃後，霞喀羅就這樣成了台灣的第一條國家步道，在這條路線中，
                我們不攻頂、也不在凌晨早起整裝待命，只單純靠著雙腳一步步走入山林沐浴在大自然的芬多精之下
                希望能夠帶著大家一同進入山林之中，享受與自然共存的每一個當下！
              </p>

              <h4>行程規劃</h4>
              <div className={style.schedule}>
                <p>
                  Day1 <br /> 07:30 新竹高鐵站集合
                  <br /> 10:30 清泉石鹿登山口
                  <br /> 11:00 田村台駐在所 <br />
                  12:00 霞喀羅大山登山口 <br />
                  12:30 第二鞍部，古道最高點
                  <br />
                  13:00 午餐時間（午餐自理） <br />
                  14:00 楢山駐在所 <br />
                  15:30 朝日駐在所
                  <br />
                  16:30 白石駐在所，古道中點 <br />
                  17:00 營地休息拍照 <br />
                  18:00 晚餐時間
                  <br />
                  19:00 分享山林故事
                </p>
                <p>
                  Day2 <br />
                  07:00 早餐、自由活動 <br />
                  09:00 回程 <br />
                  10:00 白石吊橋 <br />
                  11:00 武神駐在所 <br />
                  11:30 布奴加里山登山口 <br />
                  11:45 馬鞍駐在所 <br />
                  12:00 午餐時間（午餐自理） <br />
                  13:00 粟園駐在所 <br />
                  14:30 尖石養老登山口
                </p>
                <p>
                  Day3 <br />
                  07:00 早餐、自由活動 <br />
                  09:00 回程 <br />
                  10:00 白石吊橋 <br />
                  11:00 武神駐在所 <br />
                  11:30 布奴加里山登山口 <br />
                  11:45 馬鞍駐在所 <br />
                  12:00 午餐時間（午餐自理） <br />
                  13:00 粟園駐在所 <br />
                  14:30 尖石養老登山口
                </p>
              </div>

              <h4>注意事項</h4>
              <p>
                出發前請留意氣象資訊，山區天氣變化多端，早晚以及越往山上溫差越大，穿著建議以洋蔥式穿法。不管是在夏季或冬季氣候，高山氣溫還是明顯偏低，切記要做好保暖才不會容易引發高山症。
                另外，每個人對於溫度的感受不盡相同，請務必根據自己的身體條件，做好穿著和攜帶衣物的責任。
                如所攜帶之裝備不足以完成行程的人，以及對個人或團隊安全有所危害者，領隊嚮導有權要求撤退並陪同之。
                行進間，除領隊或嚮導有特別安排，請勿超前隊伍自行脫隊，或刻意落後，為了各位夥伴安全，讓領隊及嚮導好好待在身旁。
                行程中有任何問題如擔心、害怕、心生疑慮，或遇到不敢通過的地形等，請務必告知領隊或嚮導，我們將盡最大的努力提供最好的服務。
                初學者如尚不適應登山行程、或裝備不熟悉者，切記量力而為。建議將背包總重量（含背包本身、行動水、午餐、行動糧）控制在八公斤以下。
                請在出發前就多加進行自主訓練，訓練方向請針對心肺和肌力，跑步、游泳、重訓、深蹲等多方加強。
                請審慎評估自身能力再進行報名。
                此次行程安全為第一考量，落實無痕山林，一起當個友愛大自然的孩子吧！
                爬山過程中，如遇身體不適，或有任何情況發生，請盡快告知領隊或嚮導，請勿硬撐而讓自己陷入危險當中。
              </p>
              <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
            </div>
            <div id="comment">
              <h4>評論數量</h4>
              <h5>【報名前請務必詳閱 條款及細則 ＆ 裝備說明】 </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampProduct
