import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  };

  return (
    <header>
      <div className="Navbar">
        <div className="brand">
          <Link to="/">
            <h1>booking.io</h1>
          </Link>
        </div>
        <nav>
          <ul className="nav-items-desktop">
            <Link to="/">
              <li className="nav-item">Explore</li>
            </Link>
            {/* <li className="nav-item">Visitor Information</li>
            <li className="nav-item">Attractions</li> */}
            {/* <li className="nav-item">Tours</li> */}
            {/* <li className="nav-item">Buy Tickets</li> */}
            <div className="btn-panel-nav">
              <Link to="/view-bookings">
                <button className="login-btn-nav">View Bookings</button>
              </Link>
              {/* <Link to="/login">
                <button className="login-btn-nav">Login</button>
              </Link> */}
              {/* <Link to="/register">
                <button className="register-btn-nav">Register</button>
              </Link> */}
            </div>
          </ul>
        </nav>
        <button className="navbar-btn" onClick={handleClick}>
          {isOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>
      </div>

      {isOpen && (
        <ul className="nav-items-mobile">
          <Link to="/">
            <li className="nav-item">Explore</li>
          </Link>
          {/* <li className="nav-item">Visitor Information</li>
          <li className="nav-item">Attractions</li> */}
          {/* <li className="nav-item">Tours</li>
          <li className="nav-item">Buy Tickets</li> */}
          <div className="btn-panel-nav">
            <Link to="/view-bookings">
              <button className="login-btn-nav">View Bookings</button>
            </Link>
            {/* <Link to="/login">
              <button className="login-btn-nav">Login</button>
            </Link> */}
            {/* <Link to="/register">
              <button className="register-btn-nav">Register</button>
            </Link> */}
          </div>
        </ul>
      )}
    </header>
  );
};
export default Navbar;
