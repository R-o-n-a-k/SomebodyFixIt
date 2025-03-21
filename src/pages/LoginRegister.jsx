import React, { useState } from "react";
import "../components/CSS/LoginRegister.css";

function LoginRegister() {
  const [formValues, setFormValues] = useState({
    signUpName: "",
    signUpEmail: "",
    signUpPswd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <>
      <div className="lr-main">
        <div className="lr-container">
          <input type="checkbox" className="" id="chk" aria-hidden="true" />

          <div className="signup">
            <form onSubmit={handleFormSubmit}>
              <label className="form-heading" htmlFor="chk" aria-hidden="true">
                Sign Up
              </label>
              <p className="form-subheading">
                Register if you haven't already!
              </p>
              <input
                type="text"
                name="signUpName"
                value={formValues.signupName}
                onChange={handleInputChange}
                placeholder="FirstName LastName"
                id="signup-name"
                required
                className="form-input"
              />
              <input
                type="email"
                name="signUpEmail"
                value={formValues.signupEmail}
                onChange={handleInputChange}
                placeholder="abc@gmail.com"
                id="signup-email"
                required
                className="form-input"
              />
              <input
                type="password"
                name="signUpPswd"
                value={formValues.signupPswd}
                onChange={handleInputChange}
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
