
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import mylogo from '../images/mylogo.png';
import Alert from "../pages/Alert";
import InputControls from "../InputControls/InputControls";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const showalert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 1500);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) return showalert("All fields are required", "warning");

  setIsSubmitting(true);
  try {
    const res = await axios.post( `${import.meta.env.VITE_API_BASE}/api/auth/login`, { email, password });
   // console.log("Login response:", res.data);

    
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    showalert("Login successful!", "success");
    setTimeout(() => navigate("/"), 1000);
  } catch (err) {
    console.error(err);
    showalert(err.response?.data?.message || "Login failed", "danger");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className={styles.loginbox}>
      <div className={styles.userbox}>
        <img src={mylogo} alt="logo" className={styles.logo} width={170} height={170} />
        <Alert alert={alert} />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <InputControls type="email" onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
          <InputControls
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.footer}>
            <button disabled={isSubmitting}>Login</button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/signup" style={{color:'blue'}}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
