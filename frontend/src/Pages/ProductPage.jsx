import React from "react";
import Layout from "../Components/Layout";
import '../Styles/Product.css';
import products from '../products.json';

const ProductPage = () => {

  return (
    <Layout>
      <div className="searchDiv">
        <input className="searchBar" placeholder="Search"></input>
      </div>
      
      <h1>Products</h1>

      <div className="grid-container">
        {products.map((product) => (
          <div className="item">
            <h3>{product.name}</h3>
            <p className="price"></p>
            {product.qty <= 0 ?
              <button className="noAddToCart">Item Unavailable</button> :
              <button className="AddToCart">Add to Cart</button>
            }
          </div>
        ))}
      </div>
      
    </Layout>
  );
};

export default ProductPage;
