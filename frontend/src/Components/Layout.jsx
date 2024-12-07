import React from "react";
import "../Styles/Layout.css";
import Categories from "./Categories";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    alert("Cart Clicked");
  };

  const handleAccountClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="navBar">
        <div className="navPart">
          <div onClick={handleAccountClick} style={{ cursor: "pointer" }}>
            <AccountCircleIcon sx={{ color: "orange", fontSize: 40 }} />
          </div>
          <img className="logo" src="../images/logo.jpg" alt="logo"></img>
          <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
            <ShoppingCartIcon sx={{ color: "orange", fontSize: 40 }} />
          </div>
        </div>
        <Categories></Categories>
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
