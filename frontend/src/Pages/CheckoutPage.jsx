import React, { useEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import "../Styles/Cart.css";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  console.log(JSON.parse(localStorage.getItem("cartItems")));

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const cartItemsId = cartItems.map(item => item.item);
      try {
        const response = await axios.post("/api/products/bulk", { ids: cartItemsId });
        const products = response.data;
        products.forEach(product => {
          const cartItem = cartItems.find(item => item.item === product._id);
          product.quantity = cartItem.quantity
        });
        setCartProducts(products);
        // Initialize quantities state
        // const initialQuantities = {};

        // setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    fetchCartItems();
  }, []);



  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      const updatedProducts = cartProducts.map(product =>
        product._id === productId ? { ...product, quantity } : product
      );
      setCartProducts(updatedProducts);
      // Update local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = cartItems.map(item =>
        item.item === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  // const handleClearCart = () => {
  //   localStorage.removeItem("cartItems");
  //   window.location.reload();
  // };

  return (
    <div>
      <h1>Cart</h1>

      <div className="itemsList">
        <div className="cartItem">
          <p style={{ width: '100px' }}>Name</p>
          <p>Image</p>
          <p>Price $</p>
          <p>Qty</p>
        </div>
        <Divider></Divider>
        <div className="cartItems">
          {cartProducts.length > 0 ? (
            cartProducts.map((item) => (
              <div key={item._id}>
                <div className="cartItem">
                  <p style={{ width: '100px' }}>{item.name}</p>
                  <img
                    className="cartItemImage"
                    src={item.image_url}
                    alt="item"
                  ></img>
                  <p>{item.price}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  />
                </div>
                <Divider></Divider>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>

      <div className="cartButtons">
        <Button variant="contained" >Checkout</Button>
        <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
