import React from "react";
import { Modal, Box, Button, Input } from "@mui/material";
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

const NewProductModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleSaveClick = () => {
    navigate("/checkout");
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1>Add New Product</h1>

        <div className="productForm">
          <Input placeholder="Name"></Input>
          <Input placeholder="Price"></Input>
          <Input placeholder="Description"></Input>
          <Input placeholder="Image"></Input>
          <Input placeholder="Qty"></Input>
          <Input placeholder="Category"></Input>
        </div>

        <div className="cartButtons">
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewProductModal;
