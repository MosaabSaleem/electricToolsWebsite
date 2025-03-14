import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, InputLabel } from "@mui/material";
import "../Styles/Item.css";

const ItemDetailsPage = () => {
  const fileInputRef = useRef(null);
  //const [imagePath, setImagePath] = useState("");
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    category: "",
    image_url: "",
    price: "",
    qty: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = '../images/' + file.name
      //setImagePath('../images/' + file.name);
      console.log('Selected file:', file.name);
      setItem((prevItem) => ({ ...prevItem, image_url: filePath }));
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`/api/products`, item);
    } catch (error) {
      console.error("Error updating item:", error);
    }
    alert("Item added successfully");
    navigate("/admin");
  };

  return (
    <div>
      <h1 className="itemTitle">Item Details</h1>
      <div className="itemContainer">
        <div className="itemForm">
          <InputLabel>Name</InputLabel>
          <Input placeholder="Name" name="name" value={item.name} onChange={handleChange}></Input>
          <InputLabel>Category</InputLabel>
          <Input placeholder="Category" name="category" value={item.category} onChange={handleChange}></Input>
          <InputLabel>Image</InputLabel>
          <div>
          <Input placeholder="Image" name="image_url" value={item.image_url} onChange={handleChange}></Input>
          <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange}></input>
          </div>
          <InputLabel>Price</InputLabel>
          <Input placeholder="Price" name="price" value={item.price} onChange={handleChange}></Input>
          <InputLabel>Qty</InputLabel>
          <Input placeholder="Qty" name="qty" value={item.qty} onChange={handleChange}></Input>
          <InputLabel>Description</InputLabel>
          <Input placeholder="Description" name="description" value={item.description} onChange={handleChange}></Input>
        </div>
      </div>

      <div className="buttonsContainer">
        <div className="adminButtons">
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="contained" color="error" onClick={() => navigate("/admin")}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
