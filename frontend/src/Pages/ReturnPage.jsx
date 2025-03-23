import React, { useState, useEffect } from "react";
import "../Styles/Return.css";
import { Navigate, useNavigate} from "react-router-dom";
import { Button } from "@mui/material";


const Return = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
  
    useEffect(() => {
      localStorage.removeItem("cartItems");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');
  
      fetch(`/api/stripe/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        });
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }

    const handleHome = () => {
      navigate("/");
    }
  
    if (status === 'complete') {
      return (
        <div className="outerBody">
          <div className="contentContainer">
            <h1>Thank you!</h1>
            <p className="returnTextContent">
              We appreciate your business! A confirmation email will be sent to {customerEmail}.
            </p>
            <p className="returnTextContent">
              If you have any questions, please email <a href="mailto:mosaab2102@outlook.com">mosaab2102@outlook.com</a>.
            </p>
            <Button onClick={handleHome} variant="contained" color="primary">Return Home</Button>
          </div>
        </div>
      )
    }
  
    return null;
  }

export default Return;