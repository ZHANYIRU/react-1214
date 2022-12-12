import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProCartContextProvider } from './contexts/ProCartContext'
import { MemberContextProvider } from './contexts/MemberContext'
import Tappay from './pages/Cart/child-pages/Tappay'
import ScrollToTop from './components/ScrollToTop'
import Layout from './Outlet/outlet'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import ProductPage from './pages/product/ProductPage'
import Customs from './pages/product/Customs'
import Camp from './pages/camp/Camp'
import CampOneday from './pages/camp/CampOneday'
import CampProduct from './pages/camp/CampProduct'
import Room from './pages/room/Room'
import Rental from './pages/rental/Rental'
import Rental_detail from './pages/rental/Rental_detail'
import AI from './pages/rental/AI'
import Socket from './pages/rental/Socket'
import Store from './pages/rental/Store'
import Commnent from './pages/rental/components/Commnent'
import SunClouds from './components/sunCloud'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Confirm from './pages/Cart/child-pages/Confirm'
import Member from './pages/member/Member'
import Login from './pages/member/Login'
import Join from './pages/member/Join'
import MemberEdit from './pages/member/child-pages/MemberEdit'
import MemberPass from './pages/member/child-pages/MemberPass'
import Followers from './pages/member/child-pages/Followers'
import Following from './pages/member/child-pages/Following'
import MemberInfo from './pages/member/child-pages/MemberInfo'
import Profile from './pages/member/Profile'
import ProfileInfo from './pages/member/child-pages/ProfileInfo'
import SocialWall from './pages/member/SocialWall'
import RoomFilterPage from './pages/room/RoomFilterPage'
import RoomDetailPage from './pages/room/RoomDetailPage'
import Leaderboard from './pages/home/leaderboard'
import ResetPass from './pages/member/ResetPass'

function App() {
  return (
    <BrowserRouter>
      <MemberContextProvider>
        <ProCartContextProvider>
          <SunClouds />
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/Custom" element={<Customs />} />
              <Route path="/product/:product_sid" element={<ProductPage />} />
              <Route path="/camp" element={<Camp />} />
              <Route path="/camp/filter" element={<CampOneday />} />
              <Route path="/camp/:camp_sid" element={<CampProduct />} />
              <Route path="/room" element={<Room />} />
              <Route path="/room/search" element={<RoomFilterPage />} />
              <Route path="/room/:room_sid" element={<RoomDetailPage />} />
              <Route path="/rental" element={<Rental />} />
              <Route path="/rental/:sid" element={<Rental_detail />} />
              {/* 這兩隻都是測試 */}
              <Route path="/AI" element={<AI />} />
              <Route path="/Socket" element={<Socket />} />
              {/* <Route path="/Socket" element={<Socket socket={socket} />} /> */}
              {/* 上面兩隻都是測試  */}
              <Route path="/store" element={<Store />} />
              <Route path="/commnent" element={<Commnent />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/testpay" element={<Tappay />} />
              <Route path="/pay/confirm" element={<Confirm />} />
              <Route path="/social" element={<SocialWall />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/member" element={<Member />}>
                <Route index element={<MemberInfo />} />
                <Route path="/member/orders" element={<Order />} />
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
              <Route path="/resetPass" element={<ResetPass />} />
            </Route>
          </Routes>
          <Footer />
        </ProCartContextProvider>
      </MemberContextProvider>
    </BrowserRouter>
  )
}

export default App
