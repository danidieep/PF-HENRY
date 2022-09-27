import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogLocal } from "../actions/index";
import styles from "./ModulesCss/LogIn.module.css"

export default function LoginLocal() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(LogLocal(input));
    setInput({
      email: "",
      password: "",
    });

    setTimeout(() => {
      window.location.href = "/MainPage"
   
    }, 600);
    
  }

  return (
    <div className={styles.containerRegister}>
      <div className={styles.formContainer}>


        <h1 className={styles.logoForm}>Arteck</h1>

        <form>
          <div className={styles.optForm}>
            <input
              name="email"
              value={input.email}
              autoComplete="off"
              placeholder="Email..."
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className={styles.optForm}>
            <input
              type="password"
              name="password"
              value={input.password}
              autoComplete="off"
              placeholder="Password..."
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className={styles.buttonRegisterPos}>
            <button className={styles.buttonRegister} type="submit" onClick={(e) => handleSubmit(e)}>
              Login
            </button>
            <Link to='/MainPage'>
              <button className={styles.buttonRegister}>Home</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
