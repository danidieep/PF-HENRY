import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArtwork, getArtists } from "../actions/index";
import { useState, useEffect } from "react";
import axios from "axios";

// function validate(input){
//     let errors = {}
//     if(!input.title){
//       errors.title = 'Se requiere un Nombre'
//     }

//     if(!input.date){
//        errors.date = "La fecha requerida";
//     }

//     if(!input.collecting_institution){
//         errors.collecting_institution = 'Se requiere una institucion'
//     }

//     if (!urlImg(input.image)) {
//        errors.image = "La URL no es valida";
//     }

//     if(!input.creator){
//        errors.dimensions = 'Se requiere dimensions'
//     }

//     if(!input.dimensions){
//         errors.dimensions = 'Se requiere dimensions'
//     }

//     if(!input.medio){
//         errors.medio = 'Se requiere medio'
//     }

//     if(!input.price){
//         errors.price = 'Se requiere price'
//     }

//     return errors

//   }

//    const urlImg = (url) => {
//      return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
//    }

export default function PostArtwork() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getArtists());
  }, []);

  const artists = useSelector((state) => state.artistsList);

  const [input, setInput] = useState({
    title: "",
    date: "",
    collecting_institution: "",
    image: "",
    creator: "",
    dimensions: "",
    medio: "",
    price: "",
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

  function handleSelect(e) {
    setInput({
      ...input,
      creator: e.target.value,
    });
    // setErrors(validate({
    //   ...input,
    //   creator:[...input.creator, e.target.value],
    // }))
  }

  function handleSubmit(e, role) {
    e.preventDefault();
    if (Object.keys(errors).length !== 0) {
      alert("Debes llenar el Formulario primero");
    } else {
      dispatch(postArtwork(input, role));
      alert("obra de arte Creada");
    }

    setInput({
      title: "",
      date: "",
      collecting_institution: "",
      image: "",
      creator: "",
      dimensions: "",
      medio: "",
      price: "",
    });
  }

  const uploadImage = async (e) => {
    const files = e.target.files[0];
    const data = new FormData();

    data.append("file", files);
    data.append("upload_preset", "artket");
    data.append("api_key", "194228613445554");
    setLoading(true);
    const res = await axios
      .post("https://api.cloudinary.com/v1_1/daxy95gra/image/upload", data, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((response) => {
        const imagen = response.data;
        const fileURL = imagen;
        setInput({ ...input, image: fileURL.secure_url });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Fragment>
      <button onClick={() => (window.location.href = "/MainPage")}>back</button>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>CREAR OBRA DE ARTE:</h1>
        <br />
        {/* -------------------------   TITLE       */}
        <label>title: </label>
        <input
          type="input"
          name="title"
          value={input.title}
          placeholder="title..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.title && <p>{errors.title}</p>}

        <br />

        {/* -------------------------   date       */}
        <label>año de creacion: </label>
        <input
          type="number"
          name="date"
          value={input.date}
          autoComplete="off"
          placeholder="date..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.date && <p>{errors.date}</p>}

        <br />

        {/* -------------------------   collecting_institution       */}
        <div>
          <label>institucion de ubicacion: </label>
          <input
            type="input"
            name="collecting_institution"
            value={input.collecting_institution}
            autoComplete="off"
            placeholder="institucion..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.collecting_institution && (
            <p>{errors.collecting_institution}</p>
          )}
        </div>
        <br />

        {/* -------------------------   image       */}
        <div>
          <label>image: </label>
          {/* <input type="input" name="image" value={input.image} autoComplete="off" placeholder="imagen..." onChange={e => {handleChange(e)}}/> */}
          <input
            type="file"
            name="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <br />

        {/* -------------------------   creator       */}
        <div>
          <label>creator: </label>
          <select
            onChange={(e) => {
              handleSelect(e);
            }}
          >
            {artists?.map((a) => {
              return (
                <option key={a.id} name={a.name} value={a.name}>
                  {a.name}
                </option>
              );
            })}
          </select>
          {errors.creator && <p>{errors.creator}</p>}
        </div>
        <br />

        {/* -------------------------   dimensions       */}
        <div>
          <label>dimensions: </label>
          <input
            type="input"
            name="dimensions"
            value={input.dimensions}
            autoComplete="off"
            placeholder="Title..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.dimensions && <p>{errors.dimensions}</p>}
        </div>
        <br />

        {/* -------------------------   medio       */}
        <div>
          <label>medio: </label>
          <input
            type="input"
            name="medio"
            value={input.medio}
            autoComplete="off"
            placeholder="medio..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.medio && <p>{errors.medio}</p>}
        </div>
        <br />

        {/* -------------------------   price       */}
        <div>
          <label>price: </label>
          <input
            type="input"
            name="price"
            value={input.price}
            autoComplete="off"
            placeholder="Title..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {errors.price && <p>{errors.price}</p>}
          <br></br>
        </div>
        <br />
        <button type="submit" onClick={(e) => handleSubmit(e, user[0].role ? user[0].role : null)}>
          Crear
        </button>
      </form>
    </Fragment>
  );
}
