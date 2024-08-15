import "./Navbar.css";
import { Link } from "react-router-dom";
const linkStyle = {
  color: "white",
  textDecoration: "none",
};
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">MassMutual</h2>
      <ul>
        <li>
          <Link to="/Home" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/Vendor" style={linkStyle}>
            Vendor-contact
          </Link>
        </li>
        <li>
          <Link to="/Log" style={linkStyle}>
            Log-services
          </Link>
        </li>
        <li>
          <Link to="/queries" style={linkStyle}>
            Queries
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
