import React, { useState } from "react";
import { resetPassword } from "../actions";
import styles from "./ModulesCss/LogIn.module.css";

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
    <div>
      {open === false ? (
        <button className={styles.buttonRegister} onClick={modalController}>
          Forgot your password?
        </button>
      ) : (
        <div>
          <form>
            <div>
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
            <div>
              <input
                name="password"
                value={input.password}
                autoComplete="off"
                placeholder="New password..."
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <input
                name="confirm_password"
                value={input.confirm_password}
                autoComplete="off"
                placeholder="Confirm password..."
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
