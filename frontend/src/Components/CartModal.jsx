import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

const CartModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCartItems = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsId = cartItems.map(item => item.item);
    try {
      const response = await axios.post("/api/products/bulk", { ids: cartItemsId });
      const products = response.data;
      products.forEach(product => {
        const cartItem = cartItems.find(item => item.item === product._id);
        product.quantity = cartItem.quantity;
      });
      setCartProducts(products);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCartItems();
    }
  }, [open]);

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

  const handleCheckoutClick = () => {
    navigate("/checkout");
    handleClose();
  };

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
          <Button variant="contained" onClick={handleCheckoutClick}>Checkout</Button>
          <Button variant="contained" onClick={handleClearCart}>Clear</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CartModal;
