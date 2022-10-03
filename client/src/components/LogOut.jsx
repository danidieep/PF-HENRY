import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./ModulesCss/LogOut.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendUserInfo, vaciarUser } from "../actions/index";
import { useEffect } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { HiUserCircle } from "react-icons/hi"

export default function LogOut() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  let state = useSelector((state) => state);
  const dispatch = useDispatch();

  const usuarioEnLocalStorage = JSON.parse(localStorage.getItem("user"))
  const logOutLocal = () => {
    localStorage.setItem("user", JSON.stringify([]));
    dispatch(vaciarUser());
    toast('See you later!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const logOutAuth0 = () => {
    setTimeout(() => {
      logout()
    }, 600);

    localStorage.setItem("user", JSON.stringify([]))
    dispatch(vaciarUser())
    toast('See you later!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }
  const logInUser = () => {
    loginWithRedirect();

  };

  const userLocalStorage = JSON.parse(localStorage.getItem("user"))




  const logOut = () => {
    swal({
      title: "Hey!",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(respuesta => {
      if (respuesta && isAuthenticated) {
        localStorage.setItem("user", JSON.stringify([]));
        logout();
        setTimeout(() => {
          window.location.reload()
        }, 300);
      } else if (respuesta && userLocalStorage.length) {
        console.log("asdads")
        localStorage.setItem("user", JSON.stringify([]));
        setTimeout(() => {
          window.location.reload()
        }, 300);

      }
    })
  }


  return (
    <div className={styles.content}>
      {!isAuthenticated && !userLocalStorage.length ? (
        <div className={styles.content_login}>
          <Link className={styles.buttonsLink} to="/LocalRegister"><div><button className={styles.logins} >Sign up</button></div></Link>
          <Link className={styles.buttonsLink} to="/LocalLogin"><div><button className={styles.logins}  >Sign in</button></div></Link>
        </div>
      ) : isAuthenticated ? (
        <nav>
          <ul className={styles.menuHor}>
            <li><button className={styles.buttonsProfBase}><HiUserCircle /></button>
              <ul className={styles.menuVert}>
                <li><button onClick={() => window.location.href = "/Profile"} className={styles.buttonsProf} >My profile</button></li>
                <li><button onClick={logOut} className={styles.buttonsProf} >Log out</button></li>
              </ul>
            </li>
          </ul>
        </nav>
      ) : !isAuthenticated && userLocalStorage.length ? (

        <nav>
          <ul className={styles.menuHor}>
            <li><button className={styles.buttonsProfBase}><HiUserCircle /></button>
              <ul className={styles.menuVert}>
                <li><button onClick={() => window.location.href = "/Profile"} className={styles.buttonsProf} >My profile</button></li>
                <li><button onClick={logOut} className={styles.buttonsProf} >Log out</button></li>
              </ul>
            </li>
          </ul>
        </nav>
      ) : (
        <div>
          <div> error</div>
          <button onClick={logout} className={styles.logins} >logout</button>
        </div>
      )}
    </div>
  );
}
