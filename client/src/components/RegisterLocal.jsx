import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../actions/index";
import styles from "./ModulesCss/LogIn.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    dateBorn: "",
  });

  const validatorEmail = (valor) => {
    if (
      /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
        valor
      )
    ) {
      return true;
    } else return false;
  };
  const onlyCharacters = /^[a-zA-Z\s]+$/;

  function handleChange(e) {
    if (
      (e.target.name === "name" && onlyCharacters.test(e.target.value)) ||
      e.target.value === ""
    )
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    if (
      (e.target.name === "lastname" && onlyCharacters.test(e.target.value)) ||
      e.target.value === ""
    )
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    if (e.target.name === "email") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "password") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "dateBorn") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

  }

  function alertCompleteData() {
    toast.warn(`Complete all the info`, {
      position: "top-center",
      theme: 'dark',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function alertWorngEmailFormat() {
    toast.warn(`Wrong email format`, {
      position: "top-center",
      theme: 'dark',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validatorEmail(input.email)) {
      if (
        input.name.length > 0 &&
        input.lastname.length > 0 &&
        input.password.length > 0 &&
        input.dateBorn.length > 0
      ) {
        RegisterUser(input);
        
        setInput({
          name: "",
          lastname: "",
          email: "",
          password: "",
          dateBorn: "",
        });
        } else {
          console.log("a")
        }}
      else if(input.email.length === 0) {
        alertCompleteData()
      }
      else {
        alertWorngEmailFormat()
      }
    }
  

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Arteck</h1>
      </div>

      <div className={styles.containerRegister}>

        <div className={styles.formContainer}>
          <h2 className={styles.LoginMsg} >Complete your data to register!</h2>

          <ToastContainer />


          <form>
            <div className={styles.optForm}>
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

            <div className={styles.optForm}>
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

            <div className={styles.optForm}>
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

            <div className={styles.optForm}>
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

            <div className={styles.optForm}>
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
            <div className={styles.buttonRegisterPos}>
              <button
                className={styles.buttonRegister}
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>
              <Link to="/MainPage">
                <button className={styles.buttonRegister}>Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

    }