import React, { useState } from "react";
import { Modal, Box, Button, Input, InputLabel } from "@mui/material";
import "../Styles/Cart.css";
import "../Styles/Item.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

const NewProductModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    qty: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSaveClick = () => {
    navigate("/checkout");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1>Add New Product</h1>

        <div className="itemContainer">
        <div className="itemForm">
          <InputLabel>Name</InputLabel>
          <Input placeholder="Name" name="name" value={item.name} onChange={handleChange}></Input>
          <InputLabel>Category</InputLabel>
          <Input placeholder="Category" name="category" value={item.category} onChange={handleChange}></Input>
          <InputLabel>Image</InputLabel>
          <Input placeholder="Image" name="image" value={item.image} onChange={handleChange}></Input>
          <InputLabel>Price</InputLabel>
          <Input placeholder="Price" name="price" value={item.price} onChange={handleChange}></Input>
          <InputLabel>Qty</InputLabel>
          <Input placeholder="Qty" name="qty" value={item.qty} onChange={handleChange}></Input>
          <InputLabel>Description</InputLabel>
          <Input placeholder="Description" name="description" value={item.description} onChange={handleChange}></Input>
        </div>
      </div>

        <div className="cartButtons">
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default NewProductModal;
