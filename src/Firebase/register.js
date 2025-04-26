import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { message } from 'antd';
import mainImg from "./Main.jpg";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success("Login successful!", 5);
      // Redirect to home after registration
      navigate("/", { replace: true });
    } catch (err) {
      
      // To Handle specific Firebase errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in or use another email.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__outer">
        <div className="register-page__image-container">
          <img
            src={mainImg}
            alt="Sign up illustration"
            className="register-page__image"
            style={{ height: "70%", width: "80%" }}
          />
        </div>

        <form className="register-page__form" onSubmit={handleSubmit}>
          <h2 className="register-page__form-title">Sign Up</h2>

          <div className="register-page__form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={e => setFName(e.target.value)}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={e => setLName(e.target.value)}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="register-page__actions">
            <button type="submit" className="register-page__button">
              Sign Up
            </button>
            <ToastContainer />
          </div>

          <div className="register-page__forgot-password">
            Already registered? <a href="/">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;