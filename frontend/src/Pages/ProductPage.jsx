import React, { useState, useEffect } from "react";
// import Layout from "../Components/Layout";
import "../Styles/Product.css";
//import products from "../products.json";
import Categories from "../Components/Categories";
import axios from "axios";

const ProductPage = () => {
  //localStorage.clear();
  //const existingItems = localStorage.getItem("cartItems");
  //const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]); 
  //Search function
  const [searchWord, setSearchWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const res = await axios.get("/getProducts");
        setProducts(res.data);
        console.log(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }
    // eslint-disable-next-line
  }, [searchWord]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }
    // eslint-disable-next-line
  }, [selectedCategory]);

  const handleAddToCart = async (id) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("saving id:", id, "CartItems:", cartItems);
    cartItems.push(id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

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
                <button className="addToCart" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
