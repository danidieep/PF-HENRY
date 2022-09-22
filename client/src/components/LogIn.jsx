import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import styles from "./ModulesCss/LogIn.module.css"

export default function LogIn() {
   const { loginWithRedirect, isAuthenticated } = useAuth0();
  
    return(
      
      !isAuthenticated ? 
      <div>
       <Link to = "/Register">
             <button className={styles.login}>Register</button>
             </Link>
    
      <button className={styles.login} onClick={()=> loginWithRedirect()}>Log In</button>
      </div>
      
      : false
    )
}
