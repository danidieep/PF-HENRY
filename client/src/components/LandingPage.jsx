import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"
import Register from "./Register"
import LogIn from "./LogIn"
import styles from "./ModulesCss/LandingPage.module.css"



export default function LandingPage() {

  const { loginWithRedirect } = useAuth0()
  const [isShownRegister, setIsShownRegister] = useState(false)
  const [isShownLogIn, setIsShownLogIn] = useState(false)
  const [isShownAbout, setIsShownAbout] = useState(false)

  function handleClickRegister() {
    setIsShownLogIn(false)
    setIsShownAbout(false)
    setIsShownRegister(true)
  }

  function handleClickLogIn() {
    setIsShownRegister(false)
    setIsShownAbout(false)
    setIsShownLogIn(true)
  }

  function handleClickAboutUs() {
    setIsShownLogIn(false)
    setIsShownRegister(false)
    setIsShownAbout(true)
  }

  return (
    <div className={styles.container}>

      <button onClick={() => handleClickAboutUs()} className={styles.aboutus}>About us</button>

      <button onClick={() => handleClickRegister()} className={styles.register}>Register</button>


      {/* <button className={styles.login} onClick={() => loginWithRedirect()}>Log in</button> */}
      <button className={styles.login} onClick={() => handleClickLogIn()}>Log in</button>


      <div className={styles.logoButton}>
        <div className={styles.logoLink}>
          {/* CUANDO APRETO ALGUN BOTON REGISTER/LOGIN/ABOUTUS ME MUESTRA EL COMPONENTE */}
          {
            isShownRegister && <Register />
          }
          {
            isShownLogIn && <LogIn />

          }
          {
            isShownAbout && (
              <div>
                <p className={styles.pAboutUs}>Artket is privately owned and operated with over 25 years experience in the fine art business, we've earned a valued reputation as knowledgeable reliable dealers in fine art. We understand the importance of purchasing fine art and want all of our customers to feel comfortable and confident with their purchase. "Quality customer service is our top priority. Whether you're a designer, collector, or just looking to fill that empty space we will assist you from beginning to end, and make your art purchase an enjoyable one".</p>
                <Link to="/MainPage">
                  <button className={styles.goToGalery}>
                    Go to Galery
                  </button>
                </Link>
              </div>

            )
          }
          {
            !isShownLogIn && !isShownRegister && !isShownAbout && (
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
