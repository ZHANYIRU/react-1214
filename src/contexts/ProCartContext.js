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
  const { proSid, name, size, price, qty } = action.payload
  const itemsLength = state.items.length
  const index = state.items.findIndex(
    (el) => el.sid === proSid && el.size === size
  )
  switch (action.type) {
    //加入購物車
    case 'ADD_CART':
      if (state.totalItem === 0) {
        console.log(123)
        state = {
          items: [
            { sid: proSid, name: name, size: size, price: price, qty: qty },
          ],
          totalItem: 1,
        }
        localStorage.setItem('proCart', JSON.stringify(state.items))
        localStorage.setItem('totalItem', state.totalItem)
        return state
      }
      if (index === -1) {
        console.log(456)
        state = {
          ...state,
          items: [
            ...state.items,
            {
              sid: proSid,
              name: name,
              size: size,
              price: price,
              qty: qty,
            },
          ],
          totalItem: itemsLength + 1,
        }
        localStorage.setItem('proCart', JSON.stringify(state.items))
        localStorage.setItem('totalItem', state.totalItem)
        return state
      } else {
        console.log(789)
        state.items[index].qty = state.items[index].qty + qty
        localStorage.setItem('proCart', JSON.stringify(state.items))
        return state
      }
    //清空購物車
    case 'RESET_CART':
      localStorage.removeItem('proCart')
      localStorage.removeItem('totalItem')
      return initState
    //沒有符合的case 回傳初始state
    default:
      return initState
  }
}
//建立Context
const ProCartContext = createContext({})
export default ProCartContext

export const ProCartContextProvider = ({ children }) => {
  //呼叫reducer
  const [state, dispatch] = useReducer(proCartReducer, initState)
  console.log(state)
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
      },
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
    <ProCartContext.Provider value={{ addProCart, cartItem, resetCart, pro }}>
      {children}
    </ProCartContext.Provider>
  )
}
