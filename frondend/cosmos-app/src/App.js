import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <nav>
        <h1>Microservices</h1>
        <div>
          <Link to="/">Customers</Link>
          <br/>
          <Link to="/products">Products</Link>
          <br/>
          <Link to="/orders">Orders</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;