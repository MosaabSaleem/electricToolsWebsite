import React from "react";
import Layout from "../Components/Layout";
import '../Styles/Product.css';
import products from '../products.json';

const ProductPage = () => {

  return (
    <Layout>
      <div className="productsBody">
        <div className="searchDiv">
          <input className="searchBar" placeholder="Search"></input>
        </div>
        
        <h1 className="productsTitle">Products</h1>

        <div className="grid-container">
          {products.map((product) => (
            <div className="item">
              <h3>{product.name}</h3>
              <div>
                <img className="itemImage" src={product.image_url} alt="item"></img>
              </div>
              <p className="price">Price: ${product.price}</p>
              {product.qty <= 0 ?
                <button className="noAddToCart">Item Unavailable</button> :
                <button className="addToCart">Add to Cart</button>
              }
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
