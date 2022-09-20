import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import styles from "./ModulesCss/LogOut.module.css"

export default function LogOut() {
    const { logout} = useAuth0()
    return(
      <button className={styles.logout} onClick={()=> logout({returnTo: window.location.origin})}>Log Out</button>
    )
}

