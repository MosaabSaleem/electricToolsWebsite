import React, { useState } from "react";
import "../Styles/Layout.css";
// import Categories from "./Categories";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import axios from "axios";

const Layout = ({ children }) => {
  //Cart Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();

  // const handleCartClick = () => {
  //   alert("Cart Clicked");
  // };

  const fetchCartItems = async () => {
    console.log("fetching cart items");
    const cartItemsId = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("cartItemsId:", cartItemsId);
    try {
      const response = await axios.post("/api/products/bulk", { ids: cartItemsId });
      const products = response.data;
      setCartProducts(products);
      console.log("fetched cart products:", products);
    }
    catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const handleAccountClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="navBar">
        <div className="navPart">
          <div onClick={handleAccountClick} style={{ cursor: "pointer" }}>
            <AccountCircleIcon sx={{ color: "orange", fontSize: 40 }} />
          </div>
          <div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
            <img className="logo" src="../images/logo.jpg" alt="logo"></img>
          </div>
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            <ShoppingCartIcon sx={{ color: "orange", fontSize: 40 }} />
          </div>
        </div>
        {/* <Categories></Categories> */}
      </div>
      <CartModal open={open} handleClose={handleClose} fetchCartItems={fetchCartItems} cartProducts={cartProducts}></CartModal>
      <main>{children}</main>
    </>
  );
};

export default Layout;
