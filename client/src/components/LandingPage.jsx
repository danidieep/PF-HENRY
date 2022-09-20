import { Link } from "react-router-dom";

import styles from "./ModulesCss/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <button className={styles.aboutus}>About us</button>
      <Link to="/register">
        <button className={styles.register}>Register</button>
      </Link>

      <Link to="/logIn">
        <button className={styles.login}>Log in</button>
      </Link>

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
            mail: contact@arket.gom
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
