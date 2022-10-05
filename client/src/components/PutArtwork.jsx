import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { putArtwork, cleanProductId, getProductById,getProducts } from '../actions/index'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import styles from "./ModulesCss/LogIn.module.css"
import { Link } from "react-router-dom"
import {GiSandsOfTime} from "react-icons/gi"


export default function PutArtwork() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [estado, setEstado] = useState(false);


  const load = () =>{
    setEstado(true);
    setTimeout(() => {
      setEstado(false)
    }, 2500);
  }

  const dispatch = useDispatch()
  const product = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(cleanProductId())
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
  
  const [loading, setLoading] = useState(false)

  const uploadImage = async (e) => {
    const files = e.target.files[0]
    const data = new FormData()

    data.append('file', files)
    data.append('upload_preset', 'artket')
    data.append("api_key", "194228613445554")
    setLoading(true)
    load()
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

    if(input.title==="" && input.date==="" && input.collecting_institution===""
    && input.image==="" &&input.dimensions==="" && input.creator==="" && 
    input.medio==="" && input.price===""){
      toast.error(`Complete the data`, {
        position: "top-center",
        theme: 'light',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    else{
    dispatch(putArtwork(input, user[0].role, user[0].role))
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
  
    // setTimeout(() => {
    //   dispatch(getProducts())
    // }, 3000);
   
  }
  }



  return (
    product.length ?

      <div className={styles.containerAll}>
        <div className={styles.header}>
        <Link to='/MainPage'>
        <h1 className={styles.logoForm}>Arteck</h1>
              </Link>
         
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


              <button  disabled={estado} className={styles.buttonRegister} type='submit' onClick={e => handleSubmit(e)}>
              {!estado? "Save changes" :<GiSandsOfTime/>}</button> <br />

              
            </form>

          </div>

        </div>
      </div>
      : false

  )
}