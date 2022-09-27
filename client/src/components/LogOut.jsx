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
    <div>
      {!isAuthenticated && !userLocalStorage.length ?(
        <div>
          <button onClick={() => logInUser()}  className={styles.logout} >Log/Reg with auth0</button>

          <Link to="/LocalRegister">
            <button className={styles.logout}>Local register</button>
          </Link>
          <Link to="/LocalLogin">
            <button  className={styles.logout} >Local Login</button>
          </Link>
        </div>
      ) : isAuthenticated? (
        <div>
          <Link to="/Profile">
            <button  className={styles.logout} >Profile</button>
          </Link>
          <button onClick={logOutAuth0}  className={styles.logout} >Log out</button>
        </div>
      ) : !isAuthenticated && userLocalStorage.length ? (
        <div>
          <Link to="/Profile">
            <button  className={styles.logout} >Profile</button>
          </Link>
          <button onClick={logOutLocal}  className={styles.logout} >Log out</button>
        </div>
      ) : (
        <div>
        <div> error</div>
        <button onClick={logout}  className={styles.logout} >logout</button>
        </div>
      )}
    </div>
  );
}
