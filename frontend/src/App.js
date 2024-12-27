import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductPage from './Pages/ProductPage';
import Login from './Pages/LoginPage';
import Admin from './Pages/AdminPage';
import Checkout from './Pages/CheckoutPage';
import Signup from './Pages/SignupPage';
import Layout from './Components/Layout';
import ItemDetailsPage from './Pages/ItemDetailsPage';

function App() {
  return (
    
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/item/:id' element={<ItemDetailsPage/>} />
        </Routes>
        </Layout>
      </Router>
  );
}

export default App;
