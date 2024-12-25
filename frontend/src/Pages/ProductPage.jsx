import React, { useState, useEffect } from "react";
// import Layout from "../Components/Layout";
import "../Styles/Product.css";
import products from "../products.json";
import Categories from "../Components/Categories";

const ProductPage = () => {
  //Search function
  const [searchWord, setSearchWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (searchWord === "") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }

    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }
  }, [searchWord, selectedCategory]);

  return (
    <>
      <Categories setSelectedCategory={setSelectedCategory}></Categories>
      <div className="productsBody">
        <div className="searchDiv">
          <input
            className="searchBar"
            placeholder="Search"
            onChange={(e) => setSearchWord(e.target.value)}
          ></input>
        </div>

        <h1 className="productsTitle">Products</h1>

        <div className="grid-container">
          {filteredProducts.map((product) => (
            <div className="item">
              <h3>{product.name}</h3>
              <div>
                <img
                  className="itemImage"
                  src={product.image_url}
                  alt="item"
                ></img>
              </div>
              <p className="price">Price: ${product.price}</p>
              {product.qty <= 0 ? (
                <button className="noAddToCart">Item Unavailable</button>
              ) : (
                <button className="addToCart">Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
