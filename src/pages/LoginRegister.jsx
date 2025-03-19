import React from "react";
import "../components/CSS/LoginRegister.css";

function LoginRegister() {
  return (
    <>
      <div className="lr-main">
        <div className="lr-container">
          <input type="checkbox" className="" id="chk" aria-hidden="true" />

          <div className="signup">
            <form action="">
              <label className="form-heading" htmlFor="chk" aria-hidden="true">
                Sign Up
              </label>
              <p className="form-subheading">
                Register if you haven't already!
              </p>
              <input
                type="text"
                name="signup-name"
                placeholder="FirstName LastName"
                id="signup-name"
                required
                className="form-input"
              />
              <input
                type="email"
                name="signup-email"
                placeholder="abc@gmail.com"
                id="signup-email"
                required
                className="form-input"
              />
              <input
                type="password"
                name="signup-pswd"
                id="signup-pswd"
                placeholder="Enter your new password"
                required
                className="form-input"
              />
              <button className="form-buton signup-btn" name="signup-btn">
                Sign Up
              </button>
            </form>
          </div>

          <div className="login">
            <form action="">
              <label className="form-heading" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <p className="form-subheading">
                Continue from where you left off.
              </p>
              <input
                type="email"
                name="login-email"
                placeholder="Enter your email"
                id="login-email"
                required
                className="form-input"
              />
              <input
                type="password"
                name="login-pswd"
                id="login-pswd"
                placeholder="Enter your password"
                required
                className="form-input"
              />
              <button className="form-buton login-btn" name="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
