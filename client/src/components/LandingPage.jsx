import react from "react"
import MainPage from "./MainPage"
import { Link } from "react-router-dom"

import styles from "./ModulesCss/LandingPage.module.css"



export default function LandingPage(){
    return(
        <div className={styles.container}>
            <header>
              <button>About us</button>
              <button>Login</button>
              <button>Register</button>
            </header>
            <body>
             <Link to = "/MainPage">
             <button className={styles.button}>
              Go to gallery
             </button>
             </Link>
            </body>
        </div>
    )
}