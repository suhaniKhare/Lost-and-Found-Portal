import { useState } from 'react';
import { Link } from "react-router-dom";
import iconImage from '../assets/ICON.png';
import './Navbar.css';

function Navbar() {
  const [showDropDown , setShowDropDown] = useState(false) ;

  const handleMouseEnter = ()=> setShowDropDown(true) ;
  const handleMouseLeave = () => setShowDropDown(false) ;

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          <img src={iconImage} alt="site-logo" className="logo-image" />
        </Link>
      </div>

      <ul className="nav-list">

        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        <li
          className="nav-item dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="drpbtn">Browse Item</button>
          {showDropDown && (
            <ul className="drpdown-content">
              <li>
                <Link to="/lost-items">Lost items</Link>
              </li>
              <li>
                <Link to="/found-items">Found items</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link to="/signup">Sign up</Link>
        </li>

        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
