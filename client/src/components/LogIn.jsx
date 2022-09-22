import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { LogInUser } from "../actions/index"
import styles from "./ModulesCss/Register.module.css"

export default function LogIn() {

   const dispatch = useDispatch()

   const [input, setInput] = useState({
      email: '',
      password: '',

   })

   function handleChange(e) {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      })
      //  setErrors(validate({
      //   ...input,
      //   [e.target.name] : e.target.value
      //  }))
   }

   function handleSubmit(e) {
      e.preventDefault()
      //   if(Object.keys(errors).length !== 0){
      //     alert('Debes llenar el Formulario primero')

      //   } else {
      //dispatch(LogInUser(input))

      //   }
      setInput({
         email: '',
         password: '',
      })
   }
   return (
      <div className={styles.formContainer}>
         <h1 className={styles.logoForm}>Artket</h1>


         <div className={styles.optForm}>
            <input name="email" value={input.email} autoComplete="off" placeholder="Email..." onChange={e => { handleChange(e) }} />
            {/* {errors.email && (
            <p>{errors.email}</p>
            )} */}
         </div>

         <div className={styles.optForm}>
            <input name="password" value={input.password} autoComplete="off" placeholder="Password..." onChange={e => { handleChange(e) }} />
            {/* {errors.password && (
           <p>{errors.password}</p>
           )} */}
         </div>
         <div className={styles.buttonRegisterPos}>
            <button className={styles.buttonRegister} type='submit' onClick={e => handleSubmit(e)} >Log In</button>
         </div>
      </div>
   )
}
