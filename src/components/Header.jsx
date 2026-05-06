import { LOGO_URL } from "../../public/utils/constants";

import { useState } from "react";

import { Link } from "react-router-dom";
const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Logout");

  console.log("Header rendered");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="logo.png" />
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>

          <button
            className="login-btn"
            onClick={() => {
              btnNameReact === "Login"
                ? setbtnNameReact("Logout")
                : setbtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
