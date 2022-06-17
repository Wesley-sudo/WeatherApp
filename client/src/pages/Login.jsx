import { Link } from "react-router-dom";

import Google from "../img/google.png";
import Github from "../img/github.png";
import Facebook from "../img/facebook.png";

const Login = () => {
  const google = () => { window.open("http://localhost:3001/auth/google", "_self") };
  const github = () => { window.open("http://localhost:3001/auth/github", "_self") };
  const facebook = () => { window.open("http://localhost:3001/auth/facebook", "_self") };

  return (
    <div className="login-container">
      <h1 className="login-title">Choose a Login Method</h1>
      <div className="form-wrapper">
        <div className="left-half">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line"/>
          <div className="or">OR</div>
        </div>
        <div className="right-half">
          <form action="http://localhost:3001/auth/login" method="POST">
            <input name="email" type="text" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit" className="submit" >Login</button>
            <Link className="signup-link" to="../signup">
              <button className="submit" >Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;