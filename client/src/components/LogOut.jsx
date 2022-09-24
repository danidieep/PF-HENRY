import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import styles from "./ModulesCss/LogOut.module.css"
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {vaciarUser} from "../actions/index"




export default function LogOut() {
    const { loginWithRedirect,logout, isAuthenticated,user} = useAuth0()


    let state = useSelector(state => state)
    const dispatch = useDispatch()


    const logOutLocal = ()=>{
      localStorage.setItem("user",JSON.stringify([]))
     dispatch(vaciarUser())
    }

  

    return(
       
      <div>

        {!isAuthenticated && !state.user.length?
        <div>
        <button onClick={loginWithRedirect }>Log/Reg with auth0</button>

        <Link to ="/LocalRegister">
        <button>Local register</button>
        </Link>
        <Link to="/LocalLogin">
        <button>Local Login</button>
        </Link>
        </div>
        : 
        isAuthenticated && state.user.length?
        <div>
          <Link to="/Profile">
          <button>Profile</button>
          </Link>
          <button onClick={logout}>Log out</button>
        </div>
        :
        !isAuthenticated && state.user.length?
        <div>
          <Link to="/Profile">
          <button>Profile</button>
          </Link>
          <button onClick={logOutLocal}>Log out</button>
        </div>
        :false
        }

      </div>
    )
    }
