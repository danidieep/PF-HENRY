import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./ModulesCss/LogIn.module.css";
import { useEffect } from "react";
import { sendUserInfo } from "../actions";
import { useDispatch } from "react-redux";

export default function LogIn() {
   const { loginWithRedirect, isAuthenticated } = useAuth0();

   
  
    return(
      <div></div>
    )
}
