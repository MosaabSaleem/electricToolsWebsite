import React, { useState, useEffect } from "react";
import "../Styles/Product.css";
import Categories from "../Components/Categories";
import axios from "axios";
import { debounce } from "lodash";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = debounce((word) => {
    if (word === "") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchWord);
  }, [searchWord]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const tempProducts = products.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredProducts(tempProducts);
    }
  }, [selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = async (id) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.item === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ item: id, quantity: 1 });
    }
    //cartItems.push({ item: id, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    showPopUpHandler();
  };

  const [showPopUp, setShowPopUp] = useState(false);
  const showPopUpHandler = () => {
    setShowPopUp(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showPopUp]);

  let popUp = null;
  if (showPopUp) {
    popUp = <div className="addedToCartPopUp">Item Added to Cart!</div>;
  }

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

        {popUp}

        <h1 className="productsTitle">Products</h1>

        <div className="grid-container">
          {filteredProducts.map((product) => (
            <div className="item" key={product._id}>
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
