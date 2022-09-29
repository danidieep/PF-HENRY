import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogLocal } from "../actions/index";
import styles from "./ModulesCss/LogIn.module.css"
import {FcGoogle} from "react-icons/fc"
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginLocal() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

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

    <div>
       <div className={styles.header}>
      <h1 className={styles.logoForm}>Arteck</h1>
      </div>
    <div className={styles.containerRegister}>

      <div className={styles.formContainer}>

        <h2 className={styles.LoginMsg} >Welcome! use your data to log in</h2>
      

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
        <div>
        

        <button onClick={loginWithRedirect} className={styles.buttonGoogle}><FcGoogle className={styles.Google}/> <span className={styles.buttonGoogleText}>Continue with Google</span></button>
        </div>
        
      </div>
    </div>
    </div>
  );
}
