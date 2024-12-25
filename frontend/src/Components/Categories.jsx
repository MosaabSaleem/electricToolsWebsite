import React from "react";
import "../Styles/Layout.css";
import products from "../products.json";
import { Chip } from "@mui/material";

const Layout = ({setSelectedCategory}) => {
  let categories = ["All"];
  products.forEach((product) => {
    categories.push(product.category);
  });

  const handleCategoryClick = ({categoryName}) => {
    setSelectedCategory(categoryName);
    console.log("got the category", categoryName)
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <Chip label={category} onClick={() => handleCategoryClick(category)} sx={{ backgroundColor: "orange" }}></Chip>
      ))}
    </div>
  );
};

export default Layout;
