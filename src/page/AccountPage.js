import "./Login.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import testImage from "../images/blue.jpg";
import { Link } from "react-router-dom";

function AccountPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createUser, login, currentUser } = useAuth();

  const handleFormSubmitSignUp = async (event) => {
    // console.log(formData.email);

    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
    } else {
      try {
        await createUser(formData.email, formData.password);
        // navigate("/home")
      } catch {
        // setError("Failed to create an account")
      }
    }
  };

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

  return (
    <>
      <div className="container--main-h">
        <h1 className="page--head">Create account page</h1>
       
        <form className="form--main">
          <label className="form--label">email</label>
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
          <input
            className="input--form"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormChange}
            required
          />
          <input
            className="input--sub"
            onClick={handleFormSubmitSignUp}
            type="submit"
            value="Create Account"
          />
          <Link to={'/login'} className="have--account">
            I Already have an account{formData.email}
          </Link>
        </form>
      </div>
    </>
  );
}

export default AccountPage;
