import react from "react"
import MainPage from "./MainPage"
import { Link } from "react-router-dom"

import styles from "./ModulesCss/LandingPage.module.css"



export default function LandingPage(){
    return(
        <div className={styles.container}>
        
             <Link to = "/MainPage">
             <button className={styles.button}>
               go to home
             </button>
             </Link>
         
        </div>
    )
}