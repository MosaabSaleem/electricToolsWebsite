import React from "react";
import "../Styles/Layout.css";
import products from "../products.json";
import { Chip } from "@mui/material";

const Layout = () => {
  let categories = [];
  products.forEach((product) => {
    categories.push(product.category);
  });

  return (
    <div className="categories">
      {categories.map((category) => (
        <Chip label={category} sx={{ backgroundColor: "orange" }}></Chip>
      ))}
    </div>
  );
};

export default Layout;
