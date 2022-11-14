import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Product from './pages/product/Product'
import Camp from './pages/camp/Camp'
import Room from './pages/room/Room'
import Rental from './pages/rental/Rental'
import Cart from './pages/Cart/Cart'
import Member from './pages/member/Member'
import Login from './pages/member/Login'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/camp" element={<Camp />} />
        <Route path="/room" element={<Room />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/member" element={<Member />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
