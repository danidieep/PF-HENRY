import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ModulesCss/LogOut.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendUserInfo, vaciarUser } from "../actions/index";
import { useEffect } from "react";

export default function LogOut() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  let state = useSelector((state) => state);
  const dispatch = useDispatch();

  const logOutLocal = () => {
    localStorage.setItem("user", JSON.stringify([]));
    dispatch(vaciarUser());
  };

  const logOutAuth0 = () =>{
logout()
localStorage.setItem("user", JSON.stringify([]))
dispatch(vaciarUser())

  }
  const logInUser = () => {
     loginWithRedirect();
  };

  const userLocalStorage = JSON.parse(localStorage.getItem("user"))

  return (
    <div className={styles.content}>
      {!isAuthenticated && !userLocalStorage.length ?(
        <div className={styles.content_login}>
        <Link className={styles.buttonsLink} to="/LocalRegister"><div><button className={styles.logins} >Sign up</button></div></Link>
        <Link className={styles.buttonsLink} to="/LocalLogin"><div><button className={styles.logins}  >Sign in</button></div></Link>
        </div>
      ) : isAuthenticated? (
        <div className={styles.content_login} >
          
          <Link className={styles.buttonsLink} to="/Profile">
            <button className={styles.logins} >Profile</button>
          </Link>
            <div className={styles.buttonsLink}><button onClick={logOutAuth0} className={styles.logins} >Log out</button></div>
          
        </div>
      ) : !isAuthenticated && userLocalStorage.length ? (

        <div className={styles.content_login}>
          <Link to="/Profile" className={styles.buttonsLink}>
            <button className={styles.logins} >Profile</button>
          </Link>
          <div className={styles.buttonsLink}><button onClick={logOutLocal} className={styles.logins} >Log out</button></div>
        </div>

      ) : (
        <div>
        <div> error</div>
        <button onClick={logout}  className={styles.logins} >logout</button>
        </div>
      )}
    </div>
  );
}
