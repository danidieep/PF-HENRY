import React from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteArtwork } from '../actions/index'

export default function DetailBoard({id}){
    const dispatch = useDispatch()

    function handleDelete(e){
        e.preventDefault()
        dispatch(deleteArtwork(e.target.name))
        alert('Artwork deleted')
    }

    return(
        <div>
          <button name={id} value={id} onClick={(e) => { handleDelete(e) }} >Eliminar</button>
          <Link to = "/PutArtwork">
          <button>Modificar</button>
          </Link>
          

        </div>
    )
}
