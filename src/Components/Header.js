import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const items = useSelector((state) => state.cart.total_items);
  return (
    <nav className="navbar bg-body-secondary ">
      <div className="container">
        <span className="navbar-brand ">
          <b>
            <h4>Products</h4>
          </b>
        </span>
        <ul className="nav justify-content-end">
       <li> <Link to ="" className="navlink" style={{ textDecoration: "none",color: "black", cursor: "pointer", fontWeight:'700',marginRight:'30px' }} >Home</Link></li>
        <li><Link style={{ textDecoration: "none" }} className="navlink" to="/cart">
          <i
            className="fa-solid fa-cart-shopping"
            style={{ color: "black", cursor: "pointer" }}
          ></i>
          <span className="ms-2">{items}</span>
        </Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
