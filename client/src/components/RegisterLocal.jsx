import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../actions/index";

export default function Register() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    dateBorn: "",
  });


const validatorEmail = (valor)=>{
 if(/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(valor))
  {return true}
  else return false
}
const onlyCharacters = /^[a-zA-Z\s]+$/


  function handleChange(e) {
    if(e.target.name==="name"&& onlyCharacters.test(e.target.value) || e.target.value==="")
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if(e.target.name==="lastname"&& onlyCharacters.test(e.target.value) || e.target.value==="")
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if(e.target.name==="email"){
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });}
    if(e.target.name==="password"){
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    if(e.target.name==="dateBorn"){
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    if(validatorEmail(input.email)){
      if(input.name.length>0&&input.lastname.length>0&&input.password.length>0&&input.dateBorn.length>0){
        RegisterUser(input);
        window.location.href = "/LocalLogin"
        setInput({
          name: "",
          lastname: "",
          email: "",
          password: "",
          dateBorn: "",
        });
      }
     
      else{
        alert("complete your data")
      }
    }
    else if(input.email.length===0){
      alert("complete your data")
      }
  else{
    alert("wrong email format")
  }
    
  
    
  }
  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>

      <h1>lets register us!</h1>

      <form>
        <div>
          <input
            name="name"
            value={input.name}
            autoComplete="off"
            placeholder="Name..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
        </div>

        <div>
          <input
            name="lastname"
            value={input.lastname}
            autoComplete="off"
            placeholder="LastName..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
        </div>

        <div>
          <input
            name="email"
            value={input.email}
            autoComplete="off"
            placeholder="Email..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
        </div>

        <div>
          <input
          type="password"
            name="password"
            value={input.password}
            autoComplete="off"
            placeholder="Password..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {/* {errors.name && (
        <p className={s.errors} >{errors.name}</p>
      )} */}
        </div>

        <div>
          <input
            type="date"
            name="dateBorn"
            value={input.dateBorn}
            autoComplete="off"
            placeholder="Date of Birth..."
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          {/* {errors.released && (
      <p className={s.errors} >{errors.released}</p>
      )}  */}
        </div>

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
      </form>
    </div>
  );
}
