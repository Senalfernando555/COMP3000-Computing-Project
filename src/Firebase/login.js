import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { Alert, message } from 'antd';
import { auth } from "./firebase";
import mainImg from "./Main.jpg";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Login successful!", 5);
      
      // Redirect to home after successful login
      navigate("/home", { replace: true });
    } catch (err) {
      message.error(`Login failed: Check your login credentials`, 3);
    }
  };

  return (
    <div className="login-container">
    <div className="outer-container">
            <div className="background-div">
                <img className="Image" src={mainImg} alt="main" Style="height:70%; width:80%"/>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
            {error && <Alert type="error" showIcon message={error} />}
                
                <h2>Login</h2>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="loginbutton">
                        Submit
                    </button>
                    <ToastContainer />
                </div>

                <p className="forgot-passwordtext-right">
                    New user? <a href="/register">Register Here</a>
                </p>

                {/* <SignInWithGoogle /> */}
            </form>
        </div>
    </div>
    );
}

export default Login;
