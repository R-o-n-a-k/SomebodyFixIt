import React, { useState } from "react";
import "../components/CSS/LoginRegister.css";
import { useNavigate } from "react-router-dom";

import {
  initialFormValues,
  handleInputChange,
  handleFormSubmit,
  handleLogin,
} from "../utils/authFunctions"; // Path to your logic file

function LoginRegister({ setToken }) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);

  return (
    <>
      <div className="lr-main">
        <div className="lr-container">
          <input type="checkbox" className="" id="chk" aria-hidden="true" />

          <div className="signup">
            <form
              onSubmit={(e) => handleFormSubmit(e, formValues, setFormValues)}
            >
              <label className="form-heading" htmlFor="chk" aria-hidden="true">
                Sign Up
              </label>
              <p className="form-subheading">
                Register if you haven't already!
              </p>
              <input
                type="text"
                name="signUpName"
                value={formValues.signUpName}
                onChange={handleInputChange(formValues, setFormValues)}
                placeholder="FirstName LastName"
                title="Enter your full name"
                id="signup-name"
                required
                className="form-input"
              />
              <input
                type="email"
                name="signUpEmail"
                value={formValues.signUpEmail}
                onChange={handleInputChange(formValues, setFormValues)}
                placeholder="abc@gmail.com"
                title="Enter your email address"
                id="signup-email"
                required
                className="form-input"
              />
              <input
                type="password"
                name="signUpPswd"
                value={formValues.signUpPswd}
                onChange={handleInputChange(formValues, setFormValues)}
                id="signup-pswd"
                placeholder="Password with 6 digits"
                title="Enter your password with 6 digits"
                required
                minlength="6"
                maxlength="6"
                className="form-input"
              />
              <button className="form-buton signup-btn" name="signup-btn">
                Sign Up
              </button>
            </form>
          </div>

          <div className="login">
            <form
              onSubmit={(e) =>
                handleLogin(e, formValues, setFormValues, setToken, navigate)
              }
            >
              <label className="form-heading" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <p className="form-subheading">
                Continue from where you left off.
              </p>
              <input
                type="email"
                name="loginEmail"
                placeholder="Email"
                id="login-email"
                value={formValues.loginEmail}
                onChange={handleInputChange(formValues, setFormValues)}
                title="Enter your registered email"
                required
                className="form-input"
              />
              <input
                type="password"
                name="loginPswd"
                id="login-pswd"
                value={formValues.loginPswd}
                onChange={handleInputChange(formValues, setFormValues)}
                placeholder="Password"
                minlength="6"
                maxlength="6"
                title="Enter your registered password"
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
