import React from "react";
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { formToPay } from '../actions/index'
import { Link } from "react-router-dom";

export default function PayForm() {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        
        street:'',
        number:'',
        postalCode:''
      })

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }

      function handleSubmit(e) {
        e.preventDefault()
    
        dispatch(formToPay(input))
        setInput({
            street:'',
            number:'',
            postalCode:''
        })
      }

  return (
    <div>
        {/* -------------------------   STREET       */}
      <div>
        <label>Street: </label>
        <input
         type="text"
         name="street"
         value={input.street}
         autoComplete="off"
         placeholder={'street...'}
         onChange={(e) => {
           handleChange(e);
         }}></input>
      </div>
    {/* -------------------------   NUMBER       */}
      <div>
        <label>Number: </label>
        <input
        type="number"
        name="number"
        value={input.number}
        autoComplete="off"
        placeholder={'number...'}
        onChange={(e) => {
          handleChange(e);
        }}></input>
      </div>
       {/* -------------------------   POSTAL CODE       */} 
      <div> 
        <label>PostalCode: </label>
        <input
         type="number"
         name="postalCode"
         value={input.postalCode}
         autoComplete="off"
         placeholder={'postalCode...'}
         onChange={(e) => {
           handleChange(e);
         }}></input>
      </div>

      <Link >
      <button type='submit' onClick={e => handleSubmit(e)}>Ready</button>
      </Link>
      
      
    </div>
  );
}
