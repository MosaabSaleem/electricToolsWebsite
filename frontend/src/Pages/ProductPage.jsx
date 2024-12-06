import React from "react";
import Layout from "../Components/Layout";
import '../Styles/Product.css';

const ProductPage = () => {

  return (
    <Layout>
      <div className="searchDiv">
        <input className="searchBar" placeholder="Search"></input>
      </div>
      
      <h1>Hello World!</h1>
    </Layout>
  );
};

export default ProductPage;
