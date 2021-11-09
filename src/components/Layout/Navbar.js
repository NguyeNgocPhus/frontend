import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
const Navbar = () => {
  const stateAuth = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };

  const authLink = (
    <ul>
      <li>
        <Link to="/profiles">
          <span> Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <span> Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logoutUser} to="/">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLink = (
    <ul>
      <li>
        <Link to="/profiles">
          <span> Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <>{stateAuth ? authLink : guestLink}</>}
    </nav>
  );
};
export default Navbar;
