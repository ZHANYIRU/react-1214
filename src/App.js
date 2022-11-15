import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import ProductPage from './pages/product/ProductPage'
import Camp from './pages/camp/Camp'
import Room from './pages/room/Room'
import Rental from './pages/rental/Rental'
import Rental_detail from './pages/rental/Rental_detail'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Member from './pages/member/Member'
import Login from './pages/member/Login'
import Join from './pages/member/Join'
import MemberEdit from './pages/member/child-page/MemberEdit'
import MemberPass from './pages/member/child-page/MemberPass'
import Followers from './pages/member/child-page/Followers'
import Following from './pages/member/child-page/Following'
import MemberInfo from './pages/member/child-page/MemberInfo'
import Profile from './pages/member/Profile'
import ProfileInfo from './pages/member/child-page/ProfileInfo'
import RoomFilterPage from './pages/room/RoomFilterPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:product_sid" element={<ProductPage />} />
        <Route path="/camp" element={<Camp />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/filter" element={<RoomFilterPage />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/rental/:rental_product_sid" element={<Rental_detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/member" element={<Member />}>
          <Route index element={<MemberInfo />} />
          <Route path="/member/orders" />
          <Route path="/member/edit" element={<MemberEdit />} />
          <Route path="/member/password" element={<MemberPass />} />
          <Route path="/member/followers" element={<Followers />} />
          <Route path="/member/following" element={<Following />} />
        </Route>
        <Route path="/profile/" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="/profile/followers/" element={<Followers />} />
            <Route path="/profile/following/" element={<Following />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
