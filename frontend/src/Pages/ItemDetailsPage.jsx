import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, InputLabel } from "@mui/material";
import "../Styles/Item.css";

const ItemDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    qty: "",
    description: "",
  });


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/products/${id}`, item);
    } catch (error) {
      console.error("Error updating item:", error);
    }
    alert("Item updated successfully");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
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
          <Input placeholder="Image" name="image" value={item.image} onChange={handleChange}></Input>
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
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="contained" onClick={() => navigate("/admin")}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
