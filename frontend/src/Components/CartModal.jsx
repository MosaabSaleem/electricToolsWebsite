import React from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import "../Styles/Cart.css";
import products from "../products.json";
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

const CartModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
  }

  const selectedItems = [
    {
      id: 1,
      selectedQuantity: 2,
    },
    {
      id: 3,
      selectedQuantity: 1,
    },
    {
      id: 5,
      selectedQuantity: 4,
    },
  ];

  const cartItems = products
    .filter((product) => selectedItems.some((selectedItem) => selectedItem.id === product.id))
    .map((product) => ({
      ...product,
      selectedQuantity: selectedItems.find((selectedItem) => selectedItem.id === product.id).selectedQuantity
    }));

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1>Cart</h1>

        <div className="itemsList">
          <div className="cartItem">
            <p style={{width: '100px'}}>Name</p>
            <p>Image</p>
            <p>Price $</p>
            <p>qty</p>
          </div>
          <Divider></Divider>
          <div className="cartItems">
          {cartItems.map((item) => (
            <> 
            <div className="cartItem">
              <p style={{width: '100px'}}>{item.name}</p>
              <img
                className="cartItemImage"
                src={item.image_url}
                alt="item"
              ></img>
              <p>{item.price}</p>
              <p>{item.selectedQuantity}</p>
            </div>
            <Divider></Divider>
            </>
          ))}
          </div>
        </div>

        <div className="cartButtons">
          <Button variant="contained" onClick={handleCheckoutClick}>Checkout</Button>
          <Button variant="contained">Clear</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CartModal;
