import { Link } from "react-router-dom";
import styles from "./ModulesCss/LandingPage.module.css";
import LogOut from "./LogOut";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const data = useAuth0();

  const { isAuthenticated, user } = useAuth0();
  const userLocalStorage = JSON.parse(localStorage.getItem("user"))




  return (
    <div className={styles.container}>




      <div className={styles.header}>
        <div></div>
        <LogOut></LogOut>



      </div>
      <div className={styles.logoButton}>
        <div className={styles.logoLink}>
          <h1 className={styles.logo}>Artket</h1>
          <Link to="/MainPage">
            <button className={styles.goToGalery}>Go to Galery</button>
          </Link>
        </div>
        <img
          className={styles.venus}
          src="https://i.imgur.com/w28JKZQ.png"
          alt=""
        />
      </div>

      <div className={styles.contact}>
        <div className={styles.contactNumber}>
          <p className={styles.contactTittle}>Arket </p>
          <p>
            tel: (+32) 344 132 497 <br />
            mail: contact@arket.com
          </p>
        </div>
        <div className={styles.iconsRedes}>
          <img
            src="https://i.imgur.com/WXEjJph.png"
            height="40"
            width="40"
            alt=""
          />
          <img
            src="https://i.imgur.com/6If26Yo.png"
            height="40"
            width="40"
            alt=""
          />
          <img
            src="https://i.imgur.com/Dvdr4iU.png"
            height="40"
            width="40"
            alt=""
          />
        </div>
        <div className={styles.visaMaster}>
          <img
            src="https://i.imgur.com/2LeN4Gg.png"
            height="40"
            width="64"
            alt=""
          />
          <img
            src="https://i.imgur.com/i5DSRQH.png"
            height="40"
            width="64"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
