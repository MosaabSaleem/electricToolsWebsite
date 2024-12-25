import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import "../Styles/Product.css"
import axios from 'axios';

const AdminPage = () => {
  const adminName = localStorage.getItem("name") ? localStorage.getItem("name") : "null";

  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  
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

  return (
    <div>
      <h1 className='productsTitle'>Admin Page - {adminName}</h1>
      
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
              <p className="price">Qty: {product.qty}</p>
            </div>
          ))}
        </div>     

      <Button variant="contained">Save</Button>
      <Button variant="contained">New</Button>
      <Button variant="contained">Home</Button>
    </div>
  );
};

export default AdminPage;
