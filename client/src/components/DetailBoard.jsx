import React from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteArtwork } from '../actions/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailBoard({ id }) {
  const dispatch = useDispatch()

  function handleDelete(e) {
    e.preventDefault()
    dispatch(deleteArtwork(e.target.name))
    alertDeleteArtworkFromBoard()
  }

  function alertDeleteArtworkFromBoard() {
    toast.success(`Artwork deleted from board`, {
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

  return (
    <div>
      <button name={id} value={id} onClick={(e) => { handleDelete(e) }} >Eliminar</button>
      <Link to="/PutArtwork">
        <button>Modificar</button>
      </Link>

      <ToastContainer />

    </div>
  )
}
