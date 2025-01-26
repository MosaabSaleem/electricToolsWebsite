import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Divider } from "@mui/material";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};

const CartModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const finalCartItems = [];

  //Fetching the cart item ids from local storage. Then getting the full details from the database
  const fetchCartItems = async () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsId = cartItems.map(item => item.item);
    try {
      const response = await axios.post("/api/products/bulk", { ids: cartItemsId });
      const products = response.data;
      products.forEach(product => {
        const cartItem = cartItems.find(item => item.item === product._id);
        product.quantity = cartItem.quantity;
      });
      finalCartItems.push(products);
      setCartProducts(products);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  //Had to do it this way so cart can be updated when opened
  useEffect(() => {
    if (open) {
      fetchCartItems();
    }
  }, [open]);

  //changing the quantity of the item in the cart. This affects the id list and detail list
  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      const updatedProducts = cartProducts.map(product =>
        product._id === productId ? { ...product, quantity } : product
      );
      setCartProducts(updatedProducts);
      // Update local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = cartItems.map(item =>
        item.item === productId ? { ...item, quantity } : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      console.log("updatedCartItems", updatedCartItems);
      console.log("cartItems", cartProducts);

    }
  };

  //removing the item from the cart. This affects the id list and detail list
  const handleRemoveItem = (productId) => {
    const updatedProducts = cartProducts.filter(product => product._id !== productId);
    setCartProducts(updatedProducts);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = cartItems.filter(item => item.item !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  //redirecting to the checkout page. saves the final cart to local storage to take to checkout
  const handleCheckoutClick = async () => {
    // try {
    //   localStorage.setItem("finalCartProducts", JSON.stringify(cartProducts));
    //   const response = await axios.post("/create-checkout-session", { items: cartProducts });
    //   const { id } = response.data;
    //   const stripe = window.Stripe("pk_test_51QdPAbP2gp2kn1rnRPub4TtoVXqNPnOOr7L4f1D78rCQjOg41s764j9CMyIfESE8yqRodEwbzkRSVSxq5Uwh7kxZ00z4x5tMTQ");
    //   await stripe.redirectToCheckout({ sessionId: id });
    // } catch (error) {
    //   console.error("Error creating checkout session:", error);
    // }
    console.log("final cartProducts contains", cartProducts);
    if (cartProducts.length > 0) {
    localStorage.setItem("finalCartProducts", JSON.stringify(cartProducts));
    //navigate("/checkout");
    handleClose();
    } else {
      alert("Please add items to cart");
    }
  };

  //removes the ids list from local storage
  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1>Cart</h1>

        <div className="itemsList">
          {/* <div className="cartItemTitles">
            <p style={{ width: '100px' }}>Name</p>
            <p>Image</p>
            <p>Price $</p>
            <p>Qty</p>
          </div> */}
          <Divider></Divider>
          <div className="cartItems">
            {cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <div key={item._id}>
                  <div className="cartItem">
                    <p style={{ width: '100px' }}>{item.name}</p>
                    <img
                      className="cartItemImage"
                      src={item.image_url}
                      alt="item"
                    ></img>
                    <p>{item.price}</p>
                    <input
                      className="quantityInput"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    />
                    <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                  </div>
                  <Divider></Divider>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <p>Total: ${Math.round((cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)*100))/100}</p>
        </div>

        <div className="cartButtons">
          <Button variant="contained" onClick={handleCheckoutClick}>Checkout</Button>
          <Button variant="contained" onClick={handleClearCart}>Clear</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CartModal;
