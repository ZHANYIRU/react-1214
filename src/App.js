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
import Cart from './pages/Cart/Cart'
import Member from './pages/member/Member'
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
        <Route path="/rental" element={<Rental />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/member" element={<Member />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
