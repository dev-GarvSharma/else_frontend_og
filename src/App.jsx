import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/perfumes" element={<Index />}>
          <Route index element={<Products />} />
        </Route>
        <Route path="/perfumes/creed-aventus" element={<Index />}>
          <Route index element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
