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
  const cart = JSON.parse(localStorage.getItem('proCart'))
  //找localStorage有沒有這個商品
  const p = cart.find((el) => el.proSid === proSid)
  //沒有的話就加入
  if (!p) {
    localStorage.setItem('proCart', JSON.stringify([...cart, newProCart]))
    //有的話就累加數量
  } else {
    // const newP = { ...p, qty: p.qty + qty }
    // console.log(newP)
    // localStorage.setItem('proCart', JSON.stringify([...cart, newP]))
  }
  console.log(cart)
  console.log(p)
}
export const addCampCart = () => {}
export const addRoomCart = () => {}
export const addRenCart = () => {}
