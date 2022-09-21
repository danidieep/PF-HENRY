
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import Register from "./Register"
import styles from "./ModulesCss/LandingPage.module.css"



export default function LandingPage() {

  const { loginWithRedirect } = useAuth0()
  const [isShown, setIsShown] = useState()

  function handleClickRegister(e) {
    setIsShown(current => !current)
  }

  return (
    <div className={styles.container}>

      <button className={styles.aboutus}>About us</button>

      <button onClick={e => handleClickRegister(e)} className={styles.register}>Register</button>

      <button className={styles.login} onClick={() => loginWithRedirect()}>Log in</button>



      <div className={styles.logoButton}>
        <div className={styles.logoLink}>
          {/* CUANDO APRETO EL BOTON REGISTER ME MUESTRA PARA REGISTRARME */}
          {
            isShown && <Register />
          }

          {
            !isShown && (
              <div>
                <h1 className={styles.logo}>Artket</h1>
                <Link to="/MainPage">
                  <button className={styles.goToGalery}>
                    Go to Galery
                  </button>
                </Link>
              </div>
            )}
        </div>

        <img className={styles.venus} src="https://i.imgur.com/w28JKZQ.png" alt="" />
      </div>


      <div className={styles.contact}>
        <div className={styles.contactNumber}>
          <p className={styles.contactTittle}>Arket </p>
          <p>tel: (+32) 344 132 497 <br />
            mail: contact@arket.gom</p>
        </div>
        <div className={styles.iconsRedes}>
          <img src="https://i.imgur.com/WXEjJph.png" height='40' width='40' alt="" />
          <img src="https://i.imgur.com/6If26Yo.png" height='40' width='40' alt="" />
          <img src="https://i.imgur.com/Dvdr4iU.png" height='40' width='40' alt="" />
        </div>
        <div className={styles.visaMaster}>
          <img src="https://i.imgur.com/2LeN4Gg.png" height='40' width='64' alt="" />
          <img src="https://i.imgur.com/i5DSRQH.png" height='40' width='64' alt="" />
        </div>
      </div>
    </div>
  )
}