import { useEffect } from 'react'
import CartDetailRoom from '../components/cart-detail/CartDetailRoom'
import CartDetailCam from '../components/cart-detail/CartDetailCam'
import CartDetailPro from '../components/cart-detail/CartDetailPro'
import CartDetailRen from '../components/cart-detail/CartDetailRen'
function CartDetail(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [])
  return (
    <>
      <CartDetailRoom />
      <CartDetailCam />
      <CartDetailPro />
      <CartDetailRen />
    </>
  )
}

export default CartDetail
