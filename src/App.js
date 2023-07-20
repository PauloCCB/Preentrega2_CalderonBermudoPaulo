import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from "./Components/NavBar/NavBar";
import Home from './Components/Home/Home'
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import CategoryProductList from './Components/Categories/CategoryProductList'
import './index.css';
import ProductsDetails from './Components/Products/ProductsDetails';
import ProductsCard from './Components/Products/ProductsCard';
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/categories/:categoryId" element={<CategoryProductList></CategoryProductList>} />
        <Route path="/products/:productId" element={<ProductsCard />} />
        </Routes>
        
      </Router>

    </>
  );
}

export default App;
