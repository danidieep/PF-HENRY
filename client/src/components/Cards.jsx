import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import React from "react"
import { deleteArtwork, getProducts } from '../actions/index'
import styles from "./ModulesCss/Cards.module.css"
import { Link } from "react-router-dom"





export default function Cards({data}){
const state = useSelector(state=>state)
const dispatch = useDispatch()

function handleDelete(e){
  e.preventDefault()
  dispatch(deleteArtwork(e.target.name))
  dispatch(getProducts())
  
}

     return(
      <div>
         <div>
          <button name={data.id} value={data.id} onClick={(e) => { handleDelete(e) }} >Eliminar</button>

          <Link to ={`/PutArtwork/${data.id}`} >
          <button>Modificar</button>
          </Link>
          

        </div>
              
           
           <div className={styles.card}>
             <Link to={`/Products/${data.id}`}>
             <h3 className={styles.name} >{data.title}</h3>
             <img className={styles.img} src={data.image} alt="product_img" />
             <div className={styles.types_container}>
              <h3 className={styles.types}>{data.creator}</h3>
              <h3 className={styles.types}>{`$${data.price}`}</h3>
              
            </div>
            </Link>
           </div>
         
      </div>
       )
       }
