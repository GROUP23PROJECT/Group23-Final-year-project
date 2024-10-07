import "./Login.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import testImage from "../images/blue.jpg"
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createUser, login, currentUser } = useAuth();
  
  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFromData) => {
      return {
        ...prevFromData,
        [name] : value
        // [name]: type === "checkbox" ? checked : value,
      };
    });
  };


  const handleFormSubmitLogin = async (event) => {
    event.preventDefault()

    try {
      await login(formData.email, formData.password)
      // navigate("/home")
    } catch {
      // setError("Failed to create an account")
    }
  }
  const handleFormSubmitSignUp = async (event) => {
    event.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match")
    }
    else{
      try {
        await createUser(formData.email, formData.password)
        // navigate("/home")
      } catch {
        // setError("Failed to create an account")
      }
    }
  }


  return (
    <>
    

      <div className='container--main-h'>
        <h1 className='page--head'>Login page</h1>
        
        <form className='form--main'>

        <label className='form--label' >email</label>
        <input
            className="input--form"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            required
            name="email"
            placeholder="email"
          />
          <label className="form--label">password</label>
          <input
            className="input--form"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            placeholder="Password"
            required
          />
       <input onClick={handleFormSubmitLogin} className='input--sub' value="Login"/>
       <Link to={'/AccountPage'} className='have--account'>Create Account now</Link>
        </form>
      </div>
    </>
  );
}

export default LoginPage;