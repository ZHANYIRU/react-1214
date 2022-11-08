import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Camp from './pages/Camp'
import Room from './pages/Room'
import Rental from './pages/Rental'
import Cart from './pages/Cart/Cart'
import Member from './pages/Member'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/camp" element={<Camp />} />

       
        <Route path="/room" element={<Room />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/cart" element={<Cart />} />
        {/* 3333 */}
        <Route path="/member" element={<Member />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
