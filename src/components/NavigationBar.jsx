import React from "react";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const NavigationBar = ({title}) => {
  let navigate = useNavigate();
  
 const { logout  } = useAuth();

 const handelLogOut = async ()=> {

  try {
    await logout()
    // navigate("/")
  } catch {
    // setError("Failed to log out")
  }
}

  return (
    <div>
      <div className="nave">
        <div className="nav-title">{title}</div>
        <div className="nave-list">
          {/* <div className='nav-popular' >Popular</div> */}
          {/* <div className='nav-tv' >TV </div> */}
          {/* <Link to={'/'} className="nav-booking">Home page </Link> */}
          {/* <Link to={'/help'} className="nav-help">Help </Link> */}
          {/* <button class="button" onClick={handelLogOut}>
            <span class="button-content">segmentation </span>
          </button> */}
          <button class="button" onClick={handelLogOut}>
            <span class="button-content">Logout </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
