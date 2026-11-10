import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./features/Homepage/pages/Home";
import ProductDetails from "./features/Product/pages/ProductDetails";
import Products from "./features/Product/pages/Products";
import BlogArticles from "./features/Blogs/pages/BlogArticles";
import BlogArticleDetails from "./features/Blogs/pages/BlogArticleDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="perfumes" element={<Products />} />
          <Route path="perfumes/creed-aventus" element={<ProductDetails />} />
          <Route path="blogs" element={<BlogArticles />} />
          <Route path="blogs/:slug" element={<BlogArticleDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
