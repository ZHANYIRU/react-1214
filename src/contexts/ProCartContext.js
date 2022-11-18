import { useReducer, createContext } from 'react'

const proCartReducer = (state, action) => {
  const { sid, name, size, price, qty } = action.payload
  const items = state.items.length
  const index = state.items.findIndex(
    (el) => el.sid === sid && el.size === size
  )
  switch (action.type) {
    case 'ADD_CART':
      let newState = localStorage.getItem('proCart')
      if (state.totalItem === 0) {
        console.log(123)
        newState = {
          items: [{ sid: sid, name: name, size: size, price: price, qty: qty }],
          totalItem: 1,
        }
        localStorage.setItem('proCart', JSON.stringify(newState))
        return newState
      }
      if (index === -1) {
        console.log(456)
        newState = {
          ...state,
          items: [
            ...state.items,
            {
              sid: sid,
              name: name,
              size: size,
              price: price,
              qty: qty,
            },
          ],
          totalItem: items + 1,
        }
        localStorage.setItem('proCart', JSON.stringify(newState))
        return newState
      } else {
        console.log(789)
        console.log(qty)
        state.items[index].qty = state.items[index].qty + qty
        localStorage.setItem('proCart', JSON.stringify(state))
        return state
      }
    default:
      return state
  }
}

const ProCartContext = createContext({})
export default ProCartContext

export const ProCartContextProvider = ({ children }) => {
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
  const [state, dispatch] = useReducer(proCartReducer, initState)
  let cartItem = {}
  if (localStorage.getItem('proCart')) {
    cartItem = JSON.parse(localStorage.getItem('proCart')).totalItem
  }

  console.log('加完', state)
  const addProCart = (proSid, name, size, price, qty, img) => {
    console.log('一開始', state)
    dispatch({
      type: 'ADD_CART',
      payload: {
        sid: proSid,
        name: name,
        size: size,
        price: price,
        qty: qty,
      },
    })
    console.log('送', state)
  }
  return (
    <ProCartContext.Provider value={{ addProCart, cartItem }}>
      {children}
    </ProCartContext.Provider>
  )
}
