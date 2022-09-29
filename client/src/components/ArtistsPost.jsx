import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { postArtists } from "../actions/index";
import { useState } from "react";

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
      alert("obra de arte Creada");
    }

    setInput({
        name: "",
        birthday: "",
        hometown: "",
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Fragment>
      <button onClick={() => (window.location.href = "/MainPage")}>back</button>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>CREAR Artistas:</h1>
        <br />
        {/* -------------------------   TITLE       */}
        <label>name: </label>
        <input
          type="input"
          name="name"
          value={input.name}
          placeholder="name..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.name && <p>{errors.name}</p>}

        <br />

        {/* -------------------------   date       */}
        <label>birth: </label>
        <input
          type="number"
          name="birthday"
          value={input.birthday}
          autoComplete="off"
          placeholder="birth..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.birthday && <p>{errors.birthday}</p>}

        <br />

        {/* -------------------------   collecting_institution       */}
        <div>
          <label>hometown: </label>
          <input
            type="input"
            name="hometown"
            value={input.hometown}
            autoComplete="off"
            placeholder="hometown..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.hometown && (
            <p>{errors.hometown}</p>
          )}
        </div>
        <br />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, user[0].role ? user[0].role : null)}
        >
          Crear
        </button>
      </form>
    </Fragment>
  );
}
