import React, { useEffect } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";

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

const CartModal = ({ open, handleClose, fetchCartItems, cartProducts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      fetchCartItems();
    }
  }, [open]);

  const handleCheckoutClick = () => {
    navigate("/checkout");
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
            <p>qty</p>
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
                    <p>{item.selectedQuantity}</p>
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
