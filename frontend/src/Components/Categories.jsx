import React from "react";
import "../Styles/Layout.css";
//import products from "../products.json";
import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Layout = ({setSelectedCategory}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/getProducts");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  let categories = ["All"];
  products.forEach((product) => {
    categories.push(product.category);
  });

  categories = [...new Set(categories)];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log("got the category", categoryName)
  };

  return (
    <div className="categoriesContainer">
      <div className="categories">
        {categories.map((category) => (
          <Chip label={category} onClick={() => handleCategoryClick(category)} sx={{ backgroundColor: "orange" }}></Chip>
        ))}
      </div>
    </div>
  );
};

export default Layout;
