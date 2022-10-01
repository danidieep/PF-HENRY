import React, { useState } from "react";
import { resetPassword } from "../actions";
import styles from "./ModulesCss/LogIn.module.css";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const modalController = () => {
    setOpen(!open);
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword(input)
    setInput({
      email: "",
      password: "",
      confirm_password: "",
    });
    setTimeout(() => {
      setOpen(!open);
    }, 1000);
  }

  return (
    <div className={styles.containerAll}>
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Arteck</h1>
      </div>
      <div className={styles.containerResetPw}>

        <div className={styles.formContainer}>
          <form>
            <h3>Reset your password</h3>
            <div className={styles.optForm}>
              <input
                name="email"
                value={input.email}
                autoComplete="off"
                placeholder="Email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className={styles.optForm}>
              <input
                name="password"
                value={input.password}
                autoComplete="off"
                placeholder="New password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className={styles.optForm}>
              <input
                name="confirm_password"
                value={input.confirm_password}
                autoComplete="off"
                placeholder="Confirm password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <button className={styles.buttonRegister} type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button><br />
            <Link to='/MainPage'>
              <button className={styles.buttonRegister}>Home</button>
            </Link>

          </form>
        </div>

      </div>
    </div>
  );
}
