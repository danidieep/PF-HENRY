import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { postArtists } from "../actions/index";
import { useState } from "react";
import styles from "./ModulesCss/LogIn.module.css";
import { Link } from "react-router-dom";

export default function ArtistsPost() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const [input, setInput] = useState({
    name: "",
    birthday: "",
    hometown: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(validate({
    //     ...input,
    //     [e.target.name] : e.target.value
    //    }))
  }

  function handleSubmit(e, role) {
    e.preventDefault();
    if (Object.keys(errors).length !== 0) {
      alert("Debes llenar el Formulario primero");
    } else {
      postArtists(input, role)
    }

    setInput({
      name: "",
      birthday: "",
      hometown: "",
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.containerAll}>
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Arteck</h1>
      </div>
      <div className={styles.containerResetPw}>

        <div className={styles.formContainer}>
          <form>
            <h2 className={styles.LoginMsg}>Add artist</h2>
            <div className={styles.optForm}>
              <input
                type="input"
                name="name"
                value={input.name}
                placeholder="Name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <br />

            <div className={styles.optForm}>
              <input
                type="number"
                name="birthday"
                value={input.birthday}
                autoComplete="off"
                placeholder="Year of birth"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.birthday && <p>{errors.birthday}</p>}
            </div>
            <br />

            {/* -------------------------   collecting_institution       */}
            <div className={styles.optForm}>
              <input
                type="input"
                name="hometown"
                value={input.hometown}
                autoComplete="off"
                placeholder="Hometown"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.hometown && (
                <p>{errors.hometown}</p>
              )}
            </div>
            <br />
            <button className={styles.buttonRegister} type="submit" onClick={(e) => handleSubmit(e)}>
              Add
            </button><br />
            <Link to='/MainPage'>
              <button className={styles.buttonRegister}>Home</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
