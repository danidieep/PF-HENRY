
import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {RegisterUser} from "../actions/index"

export default function Register() {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name:'',
        lastname: '',
        email: '',
        password: '',
        dateBorn: '',
       
       })

       function handleChange(e) {
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        //  setErrors(validate({
        //   ...input,
        //   [e.target.name] : e.target.value
        //  }))
       }  

       function handleSubmit(e){
        e.preventDefault()
        //   if(Object.keys(errors).length !== 0){
        //     alert('Debes llenar el Formulario primero')
          
        //   } else {
           dispatch(RegisterUser(input))
           alert('Usuario Creado')
        //   }
           setInput({
            name:'',
            lastname: '',
            email: '',
            password: '',
            dateBorn: '',
        })
        
       }
    return (
        <div>
          <button onClick={()=>window.history.back()}>Back</button>

   <h1 >lets register us!</h1>

   <form>

    <div>
      <input  name="name" value={input.name} autoComplete="off" placeholder="Name..." onChange={e => {handleChange(e)}}/>
      {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
    </div>

    <div>
      <input  name="lastname" value={input.lastname} autoComplete="off" placeholder="LastName..." onChange={e => {handleChange(e)}}/>
      {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
    </div>

    <div>
      <input  name="email" value={input.email} autoComplete="off" placeholder="Email..." onChange={e => {handleChange(e)}}/>
      {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
    </div>

    <div>
      <input  name="password" value={input.password} autoComplete="off" placeholder="Password..." onChange={e => {handleChange(e)}}/>
      {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
    </div>

    <div >
      <input type='date' name="dateBorn" value={input.dateBorn} autoComplete="off" placeholder="Date of Birth..." onChange={e => {handleChange(e)}}></input>
      {/* {errors.released && (
      <p className={s.errors} >{errors.released}</p>
      )}  */}
    </div>

    <button  type='submit' onClick={e => handleSubmit(e)} >Register</button>

    </form>


        </div>
    )
}