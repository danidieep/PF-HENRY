import React, { useState } from "react";
import { resetPassword } from "../actions";
import styles from "./ModulesCss/LogIn.module.css";
import { Link } from "react-router-dom";


export default function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    email: "",
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
      email: ""
    });
    setTimeout(() => {
      setOpen(!open);
    }, 1000);

    setTimeout(() => {
    window.location.href="/LocalLogin"
    }, 600);
  }




  return (
    <div className={styles.containerAll}>
      <div className={styles.header}>
         <Link to='/MainPage'>
             <h1 className={styles.logoForm} >Arteck</h1>
         </Link>
       
      </div>
      <div className={styles.containerResetPw}>

        <div className={styles.formContainer}>
          <form >
            <h2 className={styles.LoginMsg} style={{padding:"0"}}>Reset your password</h2>
            <body className={styles.LoginMsg} style={{padding:"0"}}>
          Enviaremos la nueva contraseña a tu email
         </body>
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

        <button className={styles.buttonRegister} type="submit" onClick={e=>handleSubmit(e)}>
              submit
            </button><br />
        <br />
          </form>
          To Sign in click <Link to="/LocalLogin">
           here
          </Link>
        </div>
      </div>
    </div>
  );
}
