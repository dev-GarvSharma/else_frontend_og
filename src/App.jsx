import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./features/Homepage/pages/Home";
import ProductDetails from "./features/Product/pages/ProductDetails";
import Products from "./features/Product/pages/Products";
import BlogArticles from "./features/Blogs/pages/BlogArticles";
import BlogArticleDetails from "./features/Blogs/pages/BlogArticleDetails";
import NotFound from "./component/NotFound";
import Checkout from "./features/Checkout/pages/Checkout";
import Orders from "./features/Account/pages/Orders";
import Addresses from "./features/Account/pages/Addresses";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="perfumes" element={<Products />} />
          <Route path="perfume/:id" element={<ProductDetails />} />
          <Route path="blogs" element={<BlogArticles />} />
          <Route path="blogs/:slug" element={<BlogArticleDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account/orders" element={<Orders />} />
          <Route path="account/addresses" element={<Addresses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
