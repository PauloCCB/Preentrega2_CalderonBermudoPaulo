import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home'
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import CategoryProductList from './Components/Categories/CategoryProductList'
import ProductCard from './Components/Products/ProductsCard';
import './index.css';
import CartForm from './Components/Checkout/Cart';
import { CartProvider } from './Components/Context/CartContext';
import Footer from './Components/Footer/Footer';

function App() {
  return (

    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/WeAreThePoint" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/categories/:categoryId" element={<CategoryProductList />} />
          <Route path="/products/:productId" element={<ProductCard />} />
          <Route exact path='/cart' element={<CartForm></CartForm>} />
        </Routes>
      </Router>
      <Footer></Footer>
    </CartProvider>


  );
}

export default App;
