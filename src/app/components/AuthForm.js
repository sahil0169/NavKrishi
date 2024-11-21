// src/app/components/AuthForm.js
"use client";
import { useState } from "react";
import styles from "./auth.module.css";
const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await onSubmit(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign In</h2>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        
        {error && <p className={styles.error}>{error}</p>}
        
        <button type="submit" className={styles.button}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
