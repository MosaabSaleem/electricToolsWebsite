import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../Styles/Product.css";
import "../Styles/Admin.css";
import axios from "axios";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewProductModal from "../Components/NewProductModal";

const AdminPage = () => {
  const adminName = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "null";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/getProducts");
        setProducts(res.data);
        console.log(products);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleItemClick = (item) => {
    navigate(`/item/${item._id}`);
  }

  const handleAddClick = () => {
    navigate("/newItem");
  }

  return (
    <div>
      <h1 className="adminTitle">Admin Page - {adminName}</h1>
      <div className="stockListContainer">
        <div className="stockList">
          <div className="stockListTitles">
            <p style={{ width: "100px" }}>Name</p>
            <p>Category</p>
            <p>Image</p>
            <p>Price $</p>
            <p>qty</p>
          </div>
          <Divider></Divider>
          <div className="stockItems">
            {filteredProducts.map((item) => (
              <>
                <div className="stockItem" onClick={() => handleItemClick(item)}>
                  <p style={{ width: "100px" }}>{item.name}</p>
                  <p>{item.category}</p>
                  <img
                    className="stockItemImage"
                    src={item.image_url}
                    alt="item"
                  ></img>
                  <p>{item.price}</p>
                  <p>{item.qty}</p>
                </div>
                <Divider></Divider>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="buttonsContainer">
        <div className="adminButtons">
          <Button variant="contained" onClick={handleAddClick}>New</Button>
          <Button variant="contained" onClick={handleHomeClick}>
            Home
          </Button>
        </div>
      </div>

      <NewProductModal open={open} handleClose={handleClose}></NewProductModal>
    </div>
  );
};

export default AdminPage;
