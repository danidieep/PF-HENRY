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
          <button onClick={() => logInUser()}>Log/Reg with auth0</button>

          <Link to="/LocalRegister">
            <button>Local register</button>
          </Link>
          <Link to="/LocalLogin">
            <button>Local Login</button>
          </Link>
        </div>
      ) : isAuthenticated? (
        <div>
          <Link to="/Profile">
            <button>Profile</button>
          </Link>
          <button onClick={logOutAuth0}>Log out</button>
        </div>
      ) : !isAuthenticated && userLocalStorage.length ? (
        <div>
          <Link to="/Profile">
            <button>Profile</button>
          </Link>
          <button onClick={logOutLocal}>Log out</button>
        </div>
      ) : (
        <div>
        <div> error</div>
        <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  );
}
