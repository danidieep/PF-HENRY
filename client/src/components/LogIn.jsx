import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import {LogInUser} from "../actions/index"
import { useAuth0 } from "@auth0/auth0-react"
import styles from "./ModulesCss/LogIn.module.css"

export default function LogIn() {
   const { loginWithRedirect } = useAuth0();
   //  const dispatch = useDispatch()

   //  const [input, setInput] = useState({
   //      email: '',
   //      password: '',
        
   //     })

   //     function handleChange(e) {
   //      setInput({
   //        ...input,
   //        [e.target.name] : e.target.value
   //      })
   //      //  setErrors(validate({
   //      //   ...input,
   //      //   [e.target.name] : e.target.value
   //      //  }))
   //     }  

   //     function handleSubmit(e){
   //      e.preventDefault()
   //      //   if(Object.keys(errors).length !== 0){
   //      //     alert('Debes llenar el Formulario primero')
          
   //      //   } else {
   //         //dispatch(LogInUser(input))
           
   //      //   }
   //         setInput({
   //          email: '',
   //          password: '',
   //         })
   //      }
    return(
      //   <div>
      //       <h1>Log In</h1>

      //    <div>
      //       <input  name="email" value={input.email} autoComplete="off" placeholder="Email..." onChange={e => {handleChange(e)}}/>
      //       {/* {errors.email && (
      //       <p>{errors.email}</p>
      //       )} */}
      //    </div>

      //    <div>
      //       <input  name="password" value={input.password} autoComplete="off" placeholder="Password..." onChange={e => {handleChange(e)}}/>
      //      {/* {errors.password && (
      //      <p>{errors.password}</p>
      //      )} */}
      //    </div>

      //    <button  type='submit' onClick={e => handleSubmit(e)} >Log In</button>

      //   </div>

      <button className={styles.login} onClick={()=> loginWithRedirect()}>Log In</button>
    )
}