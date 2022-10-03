import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArtwork, getArtists } from "../actions/index";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ModulesCss/LogIn.module.css";
import { Link } from "react-router-dom";

export default function PostArtwork() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

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

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Arteck</h1>
      </div>
      <div className={styles.containerRegister}>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Add artwork:</h1>
            <br />
            {/* -------------------------   TITLE       */}
            <div className={styles.optForm}>
              <input
                type="input"
                name="title"
                value={input.title}
                placeholder="Title"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.title && <p>{errors.title}</p>}
            </div>
            <br />

            {/* -------------------------   date       */}
            <div className={styles.optForm}>
              <input
                type="number"
                name="date"
                value={input.date}
                autoComplete="off"
                placeholder="Year"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.date && <p>{errors.date}</p>}
            </div>
            <br />

            {/* -------------------------   collecting_institution       */}

            <div className={styles.optForm}>
              <input
                type="input"
                name="collecting_institution"
                value={input.collecting_institution}
                autoComplete="off"
                placeholder="Institution"
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
            <div className={styles.optForm}>
              <label>image: </label>
              <br />
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
            <div className={styles.optForm}>
              <select
                onChange={(e) => {
                  handleSelect(e);
                }}
                defaultValue="base"
              >
                <option disabled={true} value="base">
                  Artist
                </option>
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
            <div className={styles.optForm}>
              <input
                type="input"
                name="dimensions"
                value={input.dimensions}
                autoComplete="off"
                placeholder="Dimensions"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.dimensions && <p>{errors.dimensions}</p>}
            </div>
            <br />

            {/* -------------------------   medio       */}
            <div className={styles.optForm}>
              <input
                type="input"
                name="medio"
                value={input.medio}
                autoComplete="off"
                placeholder="Medium"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.medio && <p>{errors.medio}</p>}
            </div>
            <br />

            {/* -------------------------   price       */}
            <div className={styles.optForm}>
              <input
                type="input"
                name="price"
                value={input.price}
                autoComplete="off"
                placeholder="Price"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errors.price && <p>{errors.price}</p>}
              <br></br>
            </div>
            <br />
            <button
              className={styles.buttonRegister}
              type="submit"
              onClick={(e) =>
                handleSubmit(e, user[0].role ? user[0].role : null)
              }
            >
              Crear
            </button>
            <br />
            <Link to="/MainPage">
              <button className={styles.buttonRegister}>Home</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
