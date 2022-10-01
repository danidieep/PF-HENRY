import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { putArtwork, cleanProductId, getProductById } from '../actions/index'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import styles from "./ModulesCss/LogIn.module.css"
import { Link } from "react-router-dom"


export default function PutArtwork() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch()
  const product = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(cleanProductId())
    console.log(product[0]);
  }, [])


  const [input, setInput] = useState({
    id: id,
    title: '',
    date: '',
    collecting_institution: '',
    image: '',
    creator: '',
    dimensions: '',
    medio: '',
    price: ''
  })


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  function alertPutArtwork() {
    toast.success(`${product[0].title} has been edited`, {
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
  const [loading, setLoading] = useState(false)

  const uploadImage = async (e) => {
    const files = e.target.files[0]
    const data = new FormData()

    data.append('file', files)
    data.append('upload_preset', 'artket')
    data.append("api_key", "194228613445554")
    setLoading(true)
    const res = await axios.post('https://api.cloudinary.com/v1_1/daxy95gra/image/upload',
      data, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }
    ).then(response => {
      const imagen = response.data
      const fileURL = imagen
      setInput({ ...input, image: fileURL.secure_url })

    }).catch(function (error) {
      console.log(error);
    });

  }


  function handleSubmit(e) {
    e.preventDefault()

    dispatch(putArtwork(input, user[0].role, user[0].role))
    alertPutArtwork()

    setInput({
      title: '',
      date: '',
      collecting_institution: '',
      image: '',
      creator: '',
      dimensions: '',
      medio: '',
      price: ''
    })
  }



  return (
    product.length ?

      <div className={styles.containerAll}>
        <div className={styles.header}>
          <h1 className={styles.logoForm}>Arteck</h1>
        </div>
        <div className={styles.containerRegister}>

          <div className={styles.formContainer}>
            <form onSubmit={e => handleSubmit(e)} >
              <h1>Edit artwork:</h1>
              <br />
              {/* -------------------------   TITLE       */}
              <div className={styles.optForm}>
                <label>Tittle</label> <br />
                <input type="input" name="title" value={input.title} placeholder={product[0].title} onChange={(e) => { handleChange(e) }} />

                <br />
              </div>
              {/* -------------------------   date       */}
              <div className={styles.optForm}>
                <label>Year</label> <br />
                <input
                  type="number"
                  name="date"
                  value={input.date}
                  autoComplete="off"
                  placeholder={product[0].date}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />

              {/* -------------------------   image       */}
              <div className={styles.optForm}>
                <label>image: </label><br />
                <input type='file' name="file" onChange={e => { uploadImage(e) }} />
              </div>
              <br />

              {/* -------------------------   creator       */}
              <div className={styles.optForm}>
                <label>Artist</label> <br />
                <input
                  type="input"
                  name="creator"
                  value={input.creator}
                  autoComplete="off"
                  placeholder={product[0].creator}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />

              {/* -------------------------   dimensions       */}
              <div className={styles.optForm}>
                <label>Dimensions</label> <br />
                <input
                  type="input"
                  name="dimensions"
                  value={input.dimensions}
                  autoComplete="off"
                  placeholder={product[0].dimensions}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />

              {/* -------------------------   medio       */}
              <div className={styles.optForm}>
                <label>Medium</label> <br />
                <input
                  type="input"
                  name="medio"
                  value={input.medio}
                  autoComplete="off"
                  placeholder={product[0].medio}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />

              {/* -------------------------   collecting_institution       */}
              <div className={styles.optForm}>
                <label>Collecting Institution</label> <br />
                <input
                  type="input"
                  name="collecting_institution"
                  value={input.collecting_institution}
                  autoComplete="off"
                  placeholder={product[0].collecting_institution}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />

              {/* -------------------------   price       */}
              <div className={styles.optForm}>
                <label>Price</label> <br />
                <input
                  type="input"
                  name="price"
                  value={input.price}
                  autoComplete="off"
                  placeholder={product[0].price}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <br />


              <button className={styles.buttonRegister} type='submit' onClick={e => handleSubmit(e)}>Save edit</button> <br />

              <Link to='/MainPage'>
                <button className={styles.buttonRegister}>Home</button>
              </Link>
            </form>

          </div>

        </div>
      </div>
      : false

  )
}