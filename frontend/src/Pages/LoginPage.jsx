import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";
import "../Styles/Login.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    //alert("login" + username + password);
    const email = username;
    try {
      const res = await axios.post("/api/users/verify", { email, password }, { withCredentials: true });
      if (res.data.verified) {
        const name = res.data.name;
        localStorage.setItem("name", name);
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="loginBody">
      <div className="middleContainer">
        <div className="titleDiv">
          <h1>Please Login</h1>
        </div>
        
        <div className="inputDiv">
          <Input className="loginInput" placeholder="Email" onChange={(e) => setUsername(e.target.value)}></Input>
          <Input
            className="loginInput"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
    
        {error && <p>{error}</p>}
        <Button variant="contained" className='loginButton' sx={{paddingTop: "10px"}} onClick={handleLoginClick}>Login</Button>
        <br></br>
        <Button variant="contained" className='loginButton' sx={{marginBottom: "10px"}} onClick={handleSignUpClick}>Back</Button>
      </div>
    </div>
  );
};

export default LoginPage;
