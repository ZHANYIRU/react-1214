import { useReducer, createContext } from 'react'
//初始架構
const initState = {
  items: [
    {
      sid: 0,
      name: '',
      size: '',
      price: 0,
      qty: 0,
    },
  ],
  totalItem: 0,
}
//Reducer
const proCartReducer = (state, action) => {
  const { proSid, name, size, price, qty, img } = action.payload
  //for 商品的index
  const proIndex = state.items.findIndex(
    (el) => el.sid === proSid && el.size === size
  )
  //更新localStorage購物車
  const updateCart = (upState, payload) => {
    if (state.totalItem === 0) {
      localStorage.setItem('proCart', JSON.stringify(upState.items))
      localStorage.setItem('totalItem', payload)
      return upState
    }
    if (proIndex === -1) {
      localStorage.setItem('proCart', JSON.stringify(upState.items))
      localStorage.setItem('totalItem', payload)
      return upState
    }
    if (proIndex > -1) {
      upState[proIndex] = { ...upState[proIndex], qty: payload }
      const newState = { items: upState, totalItem: state.totalItem }
      localStorage.setItem('proCart', JSON.stringify(newState.items))
      return newState
    }
  }
  switch (action.type) {
    //加入購物車
    case 'ADD_CART':
      if (state.totalItem === 0) {
        console.log(123)
        state = {
          items: [
            {
              sid: proSid,
              name: name,
              size: size,
              img: img,
              price: price,
              qty: qty,
            },
          ],
          totalItem: 1,
        }
        const newTotalItem = state.totalItem
        return updateCart(state, newTotalItem)
      }
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
    //數量+1
    case 'PLUS':
      if (proIndex > -1) {
        const a = [...state.items]
        const newQty = a[proIndex].qty + 1
        return updateCart(a, newQty)
      }
      return state
    //數量-1
    case 'MINUS':
      if (proIndex > -1) {
        const a = [...state.items]
        const newQty = a[proIndex].qty > 1 ? a[proIndex].qty - 1 : 1
        return updateCart(a, newQty)
      }
      return state
    //刪除單筆
    case 'DEL':
      if (proIndex > -1) {
        const item1 = state.items.slice(0, proIndex)
        const item2 = state.items.slice(proIndex + 1)
        const newCartItem = item1.concat(item2)
        state = { items: newCartItem, totalItem: state.totalItem - 1 }
        localStorage.setItem('proCart', JSON.stringify(state.items))
        localStorage.setItem('totalItem', state.totalItem)
        if (newCartItem.length === 0) {
          localStorage.removeItem('proCart')
          localStorage.removeItem('totalItem')
        }
        return state
      }
      return state
    //清空購物車
    case 'RESET_CART':
      localStorage.removeItem('proCart')
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
  const str2 = localStorage.getItem('totalItem')
  //從localStorage抓資料來當state初始值
  //如果有抓到localStorage 初始值改為他
  if (str && str2) {
    const local = JSON.parse(str)
    const local2 = JSON.parse(str2)
    localState = { items: local, totalItem: local2 }
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
  //加入購物車
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
  //商品數量+1
  const plusOne = (proSid, size) => {
    dispatch({
      type: 'PLUS',
      payload: { proSid, size },
    })
  }
  //商品數量-1
  const minusOne = (proSid, size) => {
    dispatch({
      type: 'MINUS',
      payload: { proSid, size },
    })
  }
  //刪除單筆商品
  const delOne = (proSid, size) => {
    dispatch({
      type: 'DEL',
      payload: { proSid, size },
    })
  }
  //清空購物車
  const resetCart = () => {
    dispatch({
      type: 'RESET_CART',
      payload: {},
    })
  }
  return (
    <ProCartContext.Provider
      value={{
        addProCart,
        plusOne,
        minusOne,
        delOne,
        resetCart,
        cartItem,
        pro,
      }}
    >
      {children}
    </ProCartContext.Provider>
  )
}
