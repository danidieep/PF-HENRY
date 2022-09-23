import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import styles from "./ModulesCss/LogOut.module.css"
import { Link } from 'react-router-dom'


export default function LogOut() {
    const { logout, isAuthenticated} = useAuth0()

    return(
      isAuthenticated ?
      <div>
         <Link to="/Profile">
      <button className={styles.logout}>My account</button>
      </Link>
      <button className={styles.logout} onClick={()=> logout()}>Log Out</button>
      </div>
      : 
      false
      
    )
}

