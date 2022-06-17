const SignUp = () => {

    return (
        <div className="signup-container">
          <h1 className="signup-title">Sign Up Form</h1>
          <div className="form-wrapper">
             <form action="http://localhost:3001/auth/signup" method="POST">
                <div className="flexer">
                    <div className="left-half">
                        <div className="displayname-input">
                            <label className="labels" htmlFor="displayname">Display Name:</label>
                            <input className="displayname" name="displayname" type="text" />
                        </div>
                        <div className="name-input">
                            <label className="labels" htmlFor="name">Name:</label>
                            <input className="name" name="name" type="text" />
                        </div>
                        <div className="lastname-input">
                            <label className="labels" htmlFor="lastname">Last Name:</label>
                            <input className="lastname" name="lastname" type="text" />
                        </div>
                    </div>
                    <div className="right-half">
                        <div className="email-input">
                            <label className="labels" htmlFor="email">Email Address:</label>
                            <input className="email" name="email" type="text" />
                        </div>
                        <div className="location-input">
                            <label className="labels" htmlFor="location">Address:</label>
                            <input className="location" name="location" type="text" />
                        </div>
                        <div className="password-input">
                            <label className="labels" htmlFor="password">Password:</label>
                            <input className="password" name="password" type="password" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="register-button">Register</button>
             </form>
          </div>
        </div>
      );
}

export default SignUp;