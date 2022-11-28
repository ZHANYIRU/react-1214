export const addProCart = (proSid, name, size, price, qty, img) => {
  const newProCart = {
    proSid: proSid,
    name: name,
    size: size,
    price: price,
    qty: qty,
  }
  //第一次加入購物車
  if (!localStorage.getItem('proCart')) {
    return localStorage.setItem('proCart', JSON.stringify([newProCart]))
  }
  let cart = JSON.parse(localStorage.getItem('proCart'))
  //找localStorage有沒有這個商品 & size
  const proIndex = cart.findIndex(
    (el) => el.proSid === proSid && el.size === size
  )
  //沒有的話就加入
  if (proIndex === -1) {
    localStorage.setItem('proCart', JSON.stringify([...cart, newProCart]))
    //有的話就累加數量
  } else {
    const newQty = cart[proIndex].qty + qty
    cart[proIndex].qty = newQty
    localStorage.setItem('proCart', JSON.stringify(cart))
  }
}
export const addCampCart = () => {}
export const addRoomCart = () => {}
export const addRenCart = () => {}
