import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './Pages/ProductPage';
import Login from './Pages/LoginPage';
import Admin from './Pages/AdminPage';
import Checkout from './Pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/checkout' element={<Checkout/>} />
      </Routes>
    </Router>
  );
}

export default App;
