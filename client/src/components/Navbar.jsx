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
        <div className="profile">
          <img className="avatar"src={ user.local.photo } alt=""  />
          <div className="givenName">{ user.local.name.givenName }</div>
          <Link className="about-link" to="about">About</Link>
          <div className="logout" onClick={ logout }>Log out</div>
        </div>
      ) : (
        <div>
          <Link className="about-link" to="about">About</Link>
          <Link className="login-link" to="login">Login</Link> 
        </div>
      )}
    </div>
  );
};

export default Navbar;