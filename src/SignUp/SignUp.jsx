  import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import mylogo from '../images/mylogo.png';
import Alert from '../pages/Alert';
import InputControls from "../InputControls/InputControls";
import styles from "./Signup.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
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
    if (!username || !email || !password) {
      return showalert("All fields are required", "warning");
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
        username,
        email,
        password,
      });
     // console.log("Signup response:", res.data);

    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      showalert("Signup successful!", "success");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      showalert(err.response?.data?.message || "Signup failed", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.signupbox}>
      <div className={styles.userbox}>
        <img src={mylogo} alt="logo" className={styles.logo} width={170} height={170} />
        <Alert alert={alert} />
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <InputControls type="text" onChange={(e) => setUsername(e.target.value)} />

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
            <button disabled={isSubmitting}>Sign Up</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login" style={{color:'blue'}}>Login</Link>
        </p>
      </div>
    </div>
  );
}
