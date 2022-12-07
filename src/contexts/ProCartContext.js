import { useState, useReducer, createContext } from 'react'
import Swal from 'sweetalert2'
//初始架構
// const initState = {
//   items: [
//     {
//       sid: 0,
//       name: '',
//       size: '',
//       img: '',
//       price: 0,
//       quantity: 0,
//     },
//   ],
//   items2: [
//     {
//       sid: 0,
//       name: '',
//       starDate: '',
//       endDate: '',
//       img: '',
//       price: '',
//       quantity: 0,
//     },
//   ],
//   totalItem: 0,
//items-商品 items2-房間
const initState = {
  items: [],
  items2: [],
  items3: [],
  items4: [],
  totalItem: 0,
  totalPrice: 0,
}
//Reducer
const proCartReducer = (state, action) => {
  const {
    proSid,
    name,
    size,
    price,
    qty,
    img,
    roomSid,
    address,
    start,
    end,
    dayname,
    day,
    area,
    moun,
    campSid,
    renSid,
    deliveryFee,
    out,
    back,
  } = action.payload
  let proIndex
  let roomIndex
  let campIndex
  let renIndex
  //for 商品的index
  if (proSid) {
    proIndex = state.items.findIndex(
      (el) => el.sid === proSid && el.size === size
    )
  }
  //for 房間的index
  if (roomSid) {
    roomIndex = state.items2.findIndex((el) => el.sid === roomSid)
  }
  //for 活動的index
  if (campSid) {
    campIndex = state.items3.findIndex((el) => el.sid === campSid)
  }
  if (renSid) {
    renIndex = state.items4.findIndex((el) => el.sid === renSid)
  }
  //更新localStorage購物車-商品
  const updateCart = (upState, qty, price) => {
    if (proIndex === -1) {
      localStorage.setItem('proCart', JSON.stringify(upState.items))
      localStorage.setItem('totalItem', qty)
      localStorage.setItem('totalPrice', price)
      return upState
    }
    if (proIndex > -1) {
      upState[proIndex] = {
        ...upState[proIndex],
        quantity: upState[proIndex].quantity + qty,
      }
      const newState = {
        ...state,
        items: upState,
        totalItem: state.totalItem,
        totalPrice: state.totalPrice + qty * price,
      }
      localStorage.setItem('proCart', JSON.stringify(newState.items))
      localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
      return newState
    }
  }
  //更新localStorage購物車-房間
  const updateRoomCart = (upState, qty, price) => {
    if (roomIndex === -1) {
      localStorage.setItem('roomCart', JSON.stringify(upState.items2))
      localStorage.setItem('totalItem', qty)
      localStorage.setItem('totalPrice', price)
      return upState
    }
    if (roomIndex > -1) {
      upState[roomIndex] = {
        ...upState[roomIndex],
        quantity: upState[roomIndex].quantity + qty,
      }
      const newState = {
        ...state,
        items2: upState,
        totalItem: state.totalItem,
        totalPrice: state.totalPrice + qty * price * day,
      }
      localStorage.setItem('roomCart', JSON.stringify(newState.items2))
      localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
      return newState
    }
  }
  //更新localStorage購物車-活動
  const updateCampCart = (upState, qty, price) => {
    if (campIndex === -1) {
      localStorage.setItem('campCart', JSON.stringify(upState.items3))
      localStorage.setItem('totalItem', qty)
      localStorage.setItem('totalPrice', price)
      return upState
    }
    if (campIndex > -1) {
      upState[campIndex] = {
        ...upState[campIndex],
        quantity: upState[campIndex].quantity + qty,
      }
      const newState = {
        ...state,
        items3: upState,
        totalItem: state.totalItem,
        totalPrice: state.totalPrice + qty * price,
      }
      localStorage.setItem('campCart', JSON.stringify(newState.items3))
      localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
      return newState
    }
  }
  //更新localStorage購物車-租借
  const updateRenCart = (upState, qty, price) => {
    if (renIndex === -1) {
      localStorage.setItem('renCart', JSON.stringify(upState.items4))
      localStorage.setItem('totalItem', qty)
      localStorage.setItem('totalPrice', price)
      return upState
    }
    if (renIndex > -1) {
      upState[renIndex] = {
        ...upState[renIndex],
        quantity: upState[renIndex].quantity + qty,
      }
      const newState = {
        ...state,
        items4: upState,
        totalItem: state.totalItem,
        totalPrice: state.totalPrice + qty * price * day,
      }
      localStorage.setItem('renCart', JSON.stringify(newState.items4))
      localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
      return newState
    }
  }
  switch (action.type) {
    //加入購物車-商品
    case 'ADD_CART':
      if (proIndex === -1) {
        console.log('商品123')
        state = {
          ...state,
          items: [
            ...state.items,
            {
              sid: proSid,
              name: name,
              size: size,
              img: img,
              price: price,
              quantity: qty,
            },
          ],
          totalItem: state.totalItem + 1,
          totalPrice: state.totalPrice + price * qty,
        }
        const newTotalItem = state.totalItem
        const newTotalPrice = state.totalPrice
        return updateCart(state, newTotalItem, newTotalPrice)
      } else {
        console.log('商品456')
        const upState = [...state.items]
        return updateCart(upState, qty, price)
      }
    //加入購物車-房間
    case 'ADD_CART2':
      if (roomIndex === -1) {
        console.log('房間123')
        state = {
          ...state,
          items2: [
            ...state.items2,
            {
              sid: roomSid,
              name: name,
              address: address,
              startDate: start,
              endDate: end,
              day: day,
              area: area,
              moun: moun,
              img: img,
              price: price,
              quantity: qty,
            },
          ],
          totalItem: state.totalItem + 1,
          totalPrice: state.totalPrice + price * qty * day,
        }
        const newTotalItem = state.totalItem
        const newTotalPrice = state.totalPrice
        return updateRoomCart(state, newTotalItem, newTotalPrice)
      } else {
        console.log('房間456')
        const upState = [...state.items2]
        return updateRoomCart(upState, qty, price)
      }
    //加入購物車-活動
    case 'ADD_CART3':
      if (campIndex === -1) {
        console.log('活動123')
        state = {
          ...state,
          items3: [
            ...state.items3,
            {
              sid: campSid,
              name: name,
              startDate: start,
              dayname: dayname,
              area: area,
              moun: moun,
              img: img,
              price: price,
              quantity: qty,
            },
          ],
          totalItem: state.totalItem + 1,
          totalPrice: state.totalPrice + price * qty,
        }
        const newTotalItem = state.totalItem
        const newTotalPrice = state.totalPrice
        return updateCampCart(state, newTotalItem, newTotalPrice)
      } else {
        console.log('活動789')
        const upState = [...state.items3]
        return updateCampCart(upState, qty, price)
      }
    case 'ADD_CART4':
      if (renIndex === -1) {
        console.log('租借123')
        state = {
          ...state,
          items4: [
            ...state.items4,
            {
              sid: renSid,
              name: name,
              start: start,
              end: end,
              day: day,
              out: out,
              back: back,
              deliveryFee: deliveryFee,
              img: img,
              price: price,
              quantity: qty,
            },
          ],
          totalItem: state.totalItem + 1,
          totalPrice: state.totalPrice + price * qty * day + deliveryFee,
        }
        const newTotalItem = state.totalItem
        const newTotalPrice = state.totalPrice
        return updateRenCart(state, newTotalItem, newTotalPrice)
      } else {
        console.log('租借789')
        const upState = [...state.items4]
        return updateRenCart(upState, qty, price)
      }
    //數量+1
    case 'PLUS':
      if (proIndex > -1) {
        const upState = [...state.items]
        return updateCart(upState, 1, price)
      }
      if (roomIndex > -1) {
        const upState = [...state.items2]
        return updateRoomCart(upState, 1, price)
      }
      if (campIndex > -1) {
        const upState = [...state.items3]
        return updateCampCart(upState, 1, price)
      }
      if (renIndex > -1) {
        const upState = [...state.items4]
        return updateRenCart(upState, 1, price)
      }
      return state
    //數量-1
    case 'MINUS':
      if (proIndex > -1) {
        const upState = [...state.items]
        upState[proIndex] = {
          ...upState[proIndex],
          quantity: upState[proIndex].quantity - 1,
        }
        const newState = {
          ...state,
          items: upState,
          totalItem: state.totalItem,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('proCart', JSON.stringify(newState.items))
        localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
        return newState
      }
      if (roomIndex > -1) {
        const upState = [...state.items2]
        upState[roomIndex] = {
          ...upState[roomIndex],
          quantity: upState[roomIndex].quantity - 1,
        }
        const newState = {
          ...state,
          items2: upState,
          totalItem: state.totalItem,
          totalPrice: state.totalPrice - price * day,
        }
        localStorage.setItem('roomCart', JSON.stringify(newState.items2))
        localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
        return newState
      }
      if (campIndex > -1) {
        const upState = [...state.items3]
        upState[campIndex] = {
          ...upState[campIndex],
          quantity: upState[campIndex].quantity - 1,
        }
        const newState = {
          ...state,
          items3: upState,
          totalItem: state.totalItem,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('campCart', JSON.stringify(newState.items3))
        localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
        return newState
      }
      if (renIndex > -1) {
        const upState = [...state.items4]
        upState[renIndex] = {
          ...upState[renIndex],
          quantity: upState[renIndex].quantity - 1,
        }
        const newState = {
          ...state,
          items4: upState,
          totalItem: state.totalItem,
          totalPrice: state.totalPrice - price * day,
        }
        localStorage.setItem('renCart', JSON.stringify(newState.items4))
        localStorage.setItem('totalPrice', JSON.stringify(newState.totalPrice))
        return newState
      }
      return state
    //刪除單筆
    case 'DEL':
      if (proIndex > -1) {
        const item1 = state.items.slice(0, proIndex)
        const item2 = state.items.slice(proIndex + 1)
        const newCartItem = item1.concat(item2)
        state = {
          ...state,
          items: newCartItem,
          totalItem: state.totalItem - 1,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('proCart', JSON.stringify(state.items))
        localStorage.setItem('totalItem', state.totalItem)
        localStorage.setItem('totalPrice', state.totalPrice)
        if (newCartItem.length === 0) {
          localStorage.removeItem('proCart')
        }
        return state
      }
      if (roomIndex > -1) {
        const item1 = state.items2.slice(0, roomIndex)
        const item2 = state.items2.slice(roomIndex + 1)
        const newCartItem = item1.concat(item2)
        state = {
          ...state,
          items2: newCartItem,
          totalItem: state.totalItem - 1,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('roomCart', JSON.stringify(state.items2))
        localStorage.setItem('totalItem', state.totalItem)
        localStorage.setItem('totalPrice', state.totalPrice)
        if (newCartItem.length === 0) {
          localStorage.removeItem('roomCart')
        }
        return state
      }
      if (campIndex > -1) {
        const item1 = state.items3.slice(0, campIndex)
        const item2 = state.items3.slice(campIndex + 1)
        const newCartItem = item1.concat(item2)
        state = {
          ...state,
          items3: newCartItem,
          totalItem: state.totalItem - 1,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('campCart', JSON.stringify(state.items3))
        localStorage.setItem('totalItem', state.totalItem)
        localStorage.setItem('totalPrice', state.totalPrice)
        if (newCartItem.length === 0) {
          localStorage.removeItem('campCart')
        }
        return state
      }
      if (renIndex > -1) {
        const item1 = state.items4.slice(0, renIndex)
        const item2 = state.items4.slice(renIndex + 1)
        const newCartItem = item1.concat(item2)
        state = {
          ...state,
          items4: newCartItem,
          totalItem: state.totalItem - 1,
          totalPrice: state.totalPrice - price,
        }
        localStorage.setItem('renCart', JSON.stringify(state.items4))
        localStorage.setItem('totalItem', state.totalItem)
        localStorage.setItem('totalPrice', state.totalPrice)
        if (newCartItem.length === 0) {
          localStorage.removeItem('renCart')
        }
        return state
      }
      return state
    //清空購物車
    case 'RESET_CART':
      localStorage.removeItem('proCart')
      localStorage.removeItem('roomCart')
      localStorage.removeItem('campCart')
      localStorage.removeItem('renCart')
      localStorage.removeItem('totalItem')
      localStorage.removeItem('totalPrice')
      return initState
    //沒有符合的case 回傳初始state
    default:
      return state
  }
}
//建立Context
const ProCartContext = createContext({})
export default ProCartContext

export const ProCartContextProvider = ({ children }) => {
  let localState = JSON.parse(JSON.stringify(initState))
  const str = localStorage.getItem('proCart')
  const str2 = localStorage.getItem('roomCart')
  const str3 = localStorage.getItem('campCart')
  const str4 = localStorage.getItem('renCart')
  const qty = localStorage.getItem('totalItem')
  const price = localStorage.getItem('totalPrice')
  //從localStorage抓資料來當state初始值
  //如果有抓到localStorage 初始值改為他
  if (str || str2 || str3 || str4) {
    const local = JSON.parse(str) || []
    const local2 = JSON.parse(str2) || []
    const local3 = JSON.parse(str3) || []
    const local4 = JSON.parse(str4) || []
    const q = JSON.parse(qty)
    const p = JSON.parse(price)
    localState = {
      items: local,
      items2: local2,
      items3: local3,
      items4: local4,
      totalItem: q,
      totalPrice: p,
    }
  }
  //呼叫reducer
  const [state, dispatch] = useReducer(proCartReducer, localState)
  console.log('Context', state)
  console.log('我是context')
  //購物車數量顯示
  const cartItem = localStorage.getItem('totalItem')
    ? JSON.parse(localStorage.getItem('totalItem'))
    : 0
  //購物車總金額顯示
  const cartPrice = localStorage.getItem('totalPrice')
    ? JSON.parse(localStorage.getItem('totalPrice'))
    : 0
  //購物車商品顯示
  const pro = localStorage.getItem('proCart')
    ? JSON.parse(localStorage.getItem('proCart'))
    : ''
  //購物車房間顯示
  const room = localStorage.getItem('roomCart')
    ? JSON.parse(localStorage.getItem('roomCart'))
    : ''
  //購物車活動顯示
  const camp = localStorage.getItem('campCart')
    ? JSON.parse(localStorage.getItem('campCart'))
    : ''
  //購物車租借顯示
  const ren = localStorage.getItem('renCart')
    ? JSON.parse(localStorage.getItem('renCart'))
    : ''
  //加入購物車-商品
  const addProCart = (proSid, name, size, price, qty, img) => {
    dispatch({
      type: 'ADD_CART',
      payload: {
        proSid,
        name,
        size,
        price,
        qty,
        img,
      },
    })
  }
  //加入購物車-房間
  const addRoomCart = (
    roomSid,
    name,
    address,
    start,
    end,
    day,
    area,
    moun,
    price,
    qty,
    img
  ) => {
    dispatch({
      type: 'ADD_CART2',
      payload: {
        roomSid,
        name,
        address,
        start,
        end,
        day,
        area,
        moun,
        price,
        qty,
        img,
      },
    })
  }
  //加入購物車-活動
  const addCampCart = (
    campSid,
    name,
    start,
    dayname,
    area,
    moun,
    price,
    qty,
    img
  ) => {
    dispatch({
      type: 'ADD_CART3',
      payload: {
        campSid,
        name,
        start,
        dayname,
        area,
        moun,
        price,
        qty,
        img,
      },
    })
  }
  //加入購物車-租借
  const addRenCart = (
    renSid,
    name,
    start,
    end,
    day,
    out,
    back,
    deliveryFee,
    price,
    qty,
    img
  ) => {
    dispatch({
      type: 'ADD_CART4',
      payload: {
        renSid,
        name,
        start,
        end,
        day,
        out,
        back,
        deliveryFee,
        price,
        qty,
        img,
      },
    })
  }
  //商品數量+1(商品)
  const plusOne = (proSid, size, price) => {
    dispatch({
      type: 'PLUS',
      payload: { proSid, size, price },
    })
  }
  //商品數量-1(商品)
  const minusOne = (proSid, size, price) => {
    dispatch({
      type: 'MINUS',
      payload: { proSid, size, price },
    })
  }
  //商品數量+1(房間)
  const plusOne2 = (roomSid, price, day) => {
    dispatch({
      type: 'PLUS',
      payload: { roomSid, price, day },
    })
  }
  //商品數量-1(房間)
  const minusOne2 = (roomSid, price, day) => {
    dispatch({
      type: 'MINUS',
      payload: { roomSid, price, day },
    })
  }
  //商品數量+1(活動)
  const plusOne3 = (campSid, price) => {
    dispatch({
      type: 'PLUS',
      payload: { campSid, price },
    })
  }
  //商品數量-1(活動)
  const minusOne3 = (campSid, price) => {
    dispatch({
      type: 'MINUS',
      payload: { campSid, price },
    })
  }
  //商品數量+1(租借)
  const plusOne4 = (renSid, price, day) => {
    dispatch({
      type: 'PLUS',
      payload: { renSid, price, day },
    })
  }
  //商品數量-1(租借)
  const minusOne4 = (renSid, price, day) => {
    dispatch({
      type: 'MINUS',
      payload: { renSid, price, day },
    })
  }
  //刪除單筆商品
  const delOne = (proSid, size, price) => {
    dispatch({
      type: 'DEL',
      payload: { proSid, size, price },
    })
  }
  //刪除單筆房間
  const delOne2 = (roomSid, price) => {
    dispatch({
      type: 'DEL',
      payload: { roomSid, price },
    })
  }
  //刪除單筆活動
  const delOne3 = (campSid, price) => {
    dispatch({
      type: 'DEL',
      payload: { campSid, price },
    })
  }
  //刪除單筆租借
  const delOne4 = (renSid, price) => {
    dispatch({
      type: 'DEL',
      payload: { renSid, price },
    })
  }
  //清空購物車
  const resetCart = () => {
    Swal.fire({
      title: '確定要清空嗎?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '已清空!',
          showCancelButton: false,
        })
        dispatch({
          type: 'RESET_CART',
          payload: {},
        })
      }
    })
  }
  //結帳完清購物車
  const cleanCart = () => {
    dispatch({
      type: 'RESET_CART',
      payload: {},
    })
  }
  //room search結果
  const [data, setData] = useState([])
  //room地區 篩選結果
  const [userSelect, setUserSelect] = useState([])
  //在篩選頁面獲得相對應山的房型
  const [getMountain, setGetMountain] = useState([])

 //camp filter
 const [filterCon, setFilterCon]= useState(0)




  //金錢格式化
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //星星數量
  const [stars, setStar] = useState(1)
  //開啟看評論
  const [lookLightBox, setLookLightBox] = useState(false)
  return (
    <ProCartContext.Provider
      value={{
        filterCon, 
        setFilterCon,
        lookLightBox,
        setLookLightBox,
        stars,
        setStar,
        getMountain,
        setGetMountain,
        userSelect,
        setUserSelect,
        data,
        setData,
        moneyFormat,
        addProCart,
        addRoomCart,
        addCampCart,
        addRenCart,
        plusOne,
        plusOne2,
        plusOne3,
        plusOne4,
        minusOne,
        minusOne2,
        minusOne3,
        minusOne4,
        delOne,
        delOne2,
        delOne3,
        delOne4,
        resetCart,
        cleanCart,
        cartItem,
        cartPrice,
        pro,
        room,
        camp,
        ren,
      }}
    >
      {children}
    </ProCartContext.Provider>
  )
}
