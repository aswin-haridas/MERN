import React from "react";
import "./Login.css";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Register = () => {
  return (
    <div className="wrapper">
      <div className="form-box">
        <form>
          <h1>Log in</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="First name"
              required
              aria-label="First name"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Last name"
              required
              aria-label="Last name"
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              aria-label="Username"
            />
            <FaRegUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              aria-label="Password"
            />
            <IoLockClosedOutline className="icon" />
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            Already have an account? <a href="#">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
