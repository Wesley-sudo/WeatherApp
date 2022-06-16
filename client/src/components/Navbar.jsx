import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="home-link" to="/">
          Weather App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{ user.displayName }</li>
          <li className="listItem" onClick={ logout }>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="login-link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;