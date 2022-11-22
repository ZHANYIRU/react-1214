import { useState, useReducer, createContext } from 'react'
//初始架構
// const initState = {
//   items: [
//     {
//       sid: 0,
//       name: '',
//       size: '',
//       img: '',
//       price: 0,
//       qty: 0,
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
//       qty: 0,
//     },
//   ],
//   totalItem: 0,
//items-商品 items2-房間
const initState = {
  items: [],
  items2: [],
  totalItem: 0,
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
    area,
    moun,
  } = action.payload
  //for 商品的index
  const proIndex = state.items.findIndex(
    (el) => el.sid === proSid && el.size === size
  )
  //for 房間的index
  const roomIndex = state.items2.findIndex((el) => el.sid === roomSid)
  //更新localStorage購物車-商品
  const updateCart = (upState, payload) => {
    if (proIndex === -1) {
      localStorage.setItem('proCart', JSON.stringify(upState.items))
      localStorage.setItem('totalItem', payload)
      return upState
    }
    if (proIndex > -1) {
      upState[proIndex] = { ...upState[proIndex], qty: payload }
      const newState = { ...state, items: upState, totalItem: state.totalItem }
      localStorage.setItem('proCart', JSON.stringify(newState.items))
      return newState
    }
  }
  //更新localStorage購物車-房間
  const updateRoomCart = (upState, payload) => {
    if (roomIndex === -1) {
      localStorage.setItem('roomCart', JSON.stringify(upState.items2))
      localStorage.setItem('totalItem', payload)
      return upState
    }
    if (roomIndex > -1) {
      upState[roomIndex] = { ...upState[roomIndex], qty: payload }
      const newState = { ...state, items2: upState, totalItem: state.totalItem }
      localStorage.setItem('roomCart', JSON.stringify(newState.items2))
      return newState
    }
  }
  switch (action.type) {
    //加入購物車-商品
    case 'ADD_CART':
      if (proIndex === -1) {
        console.log(456)
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
              qty: qty,
            },
          ],
          totalItem: state.totalItem + 1,
        }
        const newTotalItem = state.totalItem
        return updateCart(state, newTotalItem)
      } else {
        console.log(789)
        if (proIndex > -1) {
          const a = [...state.items]
          const newQty = a[proIndex].qty + qty
          return updateCart(a, newQty)
        }
        return state
      }
    //加入購物車-房間
    case 'ADD_CART2':
      if (roomIndex === -1) {
        console.log(123)
        state = {
          ...state,
          items2: [
            ...state.items2,
            {
              sid: roomSid,
              name: name,
              address: address,
              starDate: start,
              endDate: end,
              area: area,
              moun: moun,
              img: img,
              price: price,
              qty: qty,
            },
          ],
          totalItem: state.totalItem + 1,
        }
        const newTotalItem = state.totalItem
        return updateRoomCart(state, newTotalItem)
      } else {
        console.log(789)
        if (roomIndex > -1) {
          const a = [...state.items2]
          const newQty = a[roomIndex].qty + qty
          return updateRoomCart(a, newQty)
        }
        return state
      }
    //數量+1
    case 'PLUS':
      if (proIndex > -1) {
        const a = [...state.items]
        const newQty = a[proIndex].qty + 1
        return updateCart(a, newQty)
      }
      if (roomIndex > -1) {
        const a = [...state.items2]
        const newQty = a[roomIndex].qty + 1
        return updateRoomCart(a, newQty)
      }
      return state
    //數量-1
    case 'MINUS':
      if (proIndex > -1) {
        const a = [...state.items]
        const newQty = a[proIndex].qty > 1 ? a[proIndex].qty - 1 : 1
        return updateCart(a, newQty)
      }
      if (roomIndex > -1) {
        const a = [...state.items2]
        const newQty = a[roomIndex].qty > 1 ? a[roomIndex].qty - 1 : 1
        return updateRoomCart(a, newQty)
      }
      return state
    //刪除單筆
    case 'DEL':
      if (proIndex > -1) {
        const item1 = state.items.slice(0, proIndex)
        const item2 = state.items.slice(proIndex + 1)
        const newCartItem = item1.concat(item2)
        state = { ...state, items: newCartItem, totalItem: state.totalItem - 1 }
        localStorage.setItem('proCart', JSON.stringify(state.items))
        localStorage.setItem('totalItem', state.totalItem)
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
        }
        localStorage.setItem('roomCart', JSON.stringify(state.items2))
        localStorage.setItem('totalItem', state.totalItem)
        if (newCartItem.length === 0) {
          localStorage.removeItem('roomCart')
        }
        return state
      }
      return state
    //清空購物車
    case 'RESET_CART':
      localStorage.removeItem('proCart')
      localStorage.removeItem('roomCart')
      localStorage.removeItem('totalItem')
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
  const qty = localStorage.getItem('totalItem')
  //從localStorage抓資料來當state初始值
  //如果有抓到localStorage 初始值改為他
  if (str && str2 && qty) {
    const local = JSON.parse(str)
    const local2 = JSON.parse(str2)
    const q = JSON.parse(qty)
    localState = { items: local, items2: local2, totalItem: q }
  }
  //呼叫reducer
  const [state, dispatch] = useReducer(proCartReducer, localState)
  console.log('Context', state)
  console.log('我是context')
  //購物車數量顯示
  const cartItem = localStorage.getItem('totalItem')
    ? JSON.parse(localStorage.getItem('totalItem'))
    : 0
  //購物車商品顯示
  const pro = localStorage.getItem('proCart')
    ? JSON.parse(localStorage.getItem('proCart'))
    : ''
  //購物車房間顯示
  const room = localStorage.getItem('roomCart')
    ? JSON.parse(localStorage.getItem('roomCart'))
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
        area,
        moun,
        price,
        qty,
        img,
      },
    })
  }
  //商品數量+1(商品)
  const plusOne = (proSid, size) => {
    dispatch({
      type: 'PLUS',
      payload: { proSid, size },
    })
  }
  //商品數量-1(商品)
  const minusOne = (proSid, size) => {
    dispatch({
      type: 'MINUS',
      payload: { proSid, size },
    })
  }
  //商品數量+1(房間)
  const plusOne2 = (roomSid) => {
    dispatch({
      type: 'PLUS',
      payload: { roomSid },
    })
  }
  //商品數量-1(房間)
  const minusOne2 = (roomSid) => {
    dispatch({
      type: 'MINUS',
      payload: { roomSid },
    })
  }
  //刪除單筆商品
  const delOne = (proSid, size) => {
    dispatch({
      type: 'DEL',
      payload: { proSid, size },
    })
  }
  //刪除單筆房間
  const delOne2 = (roomSid) => {
    dispatch({
      type: 'DEL',
      payload: { roomSid },
    })
  }
  //清空購物車
  const resetCart = () => {
    dispatch({
      type: 'RESET_CART',
      payload: {},
    })
  }
  const [data, setData] = useState([])
  return (
    <ProCartContext.Provider
      value={{
        data,
        setData,
        addProCart,
        addRoomCart,
        plusOne,
        plusOne2,
        minusOne,
        minusOne2,
        delOne,
        delOne2,
        resetCart,
        cartItem,
        pro,
        room,
      }}
    >
      {children}
    </ProCartContext.Provider>
  )
}
