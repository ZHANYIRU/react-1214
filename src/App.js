import './reset.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './compoent/ScrollToTop/ScrollToTop'
import Home from './pages/Home'
import Product from './pages/Product'
import Camp from './pages/Camp'
import Room from './pages/Room'
import Rental from './pages/Rental'
import Cart from './pages/Cart'
import Member from './pages/Member'
import Navbar from './compoent/NavBar/Navbar'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
