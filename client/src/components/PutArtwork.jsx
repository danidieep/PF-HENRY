import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { putArtwork, cleanProductId, getProductById } from '../actions/index'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PutArtwork() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

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



  function handleSubmit(e) {
    e.preventDefault()

    dispatch(putArtwork(input))
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

      <Fragment>
        <button onClick={() => window.location.href = "/MainPage"}>back</button>

        <form onSubmit={e => handleSubmit(e)} >
          <h1>MODIFICAR OBRA DE ARTE:</h1>
          <br />
          {/* -------------------------   TITLE       */}
          <label>title: </label>
          <input type="input" name="title" value={input.title} placeholder='title...' onChange={(e) => { handleChange(e) }} />

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
          </div>
          <br />

          {/* -------------------------   image       */}
          <div>
            <label>image: </label>
            <input
              type="input"
              name="image"
              value={input.image}
              autoComplete="off"
              placeholder="imagen..."
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <br />

          {/* -------------------------   creator       */}
          <div>
            <label>creator: </label>
            <input
              type="input"
              name="creator"
              value={input.creator}
              autoComplete="off"
              placeholder="creator..."
              onChange={(e) => {
                handleChange(e);
              }}
            />
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
          </div>
          <br />

          {/* -------------------------   price       */}
          <div>
            <label>price: </label>
            <input type="input" name="price" value={input.price} autoComplete="off" placeholder="Title..." onChange={e => { handleChange(e) }} />

            <br></br>
          </div>
          <br />
          <button type='submit' onClick={e => handleSubmit(e)} >Modificar</button>

        </form>

        <ToastContainer />

      </Fragment> : <p>Loading...</p>
  )
}