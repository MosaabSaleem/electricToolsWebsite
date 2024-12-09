import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import "../Styles/Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    alert("login");
  };

  return (
    <div className="loginBody">
      <div className="middleContainer">
        <div className="titleDiv">
          <h1>Please Login</h1>
        </div>
        
        <div className="inputDiv">
          <Input className="loginInput" placeholder="Email"></Input>
          <Input
            className="loginInput"
            placeholder="Password"
            type="password"
          ></Input>
        </div>
        
        <Button variant="contained" className='loginButton' sx={{paddingTop: "10px"}} onClick={handleLoginClick}>Login</Button>
        <Button variant="contained" className='loginButton' sx={{marginBottom: "10px"}} onClick={handleSignUpClick}>Back</Button>
      </div>
    </div>
  );
};

export default LoginPage;
