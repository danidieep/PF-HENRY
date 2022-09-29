import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromFavourites ,getFavourites, } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from './ModulesCss/Carrito.module.css'




export default function Favoritos() {

  const user = JSON.parse(localStorage.getItem("user"))
  const favoritos = useSelector((state) => state.favoritos)
  const dispatch = useDispatch();

const email = JSON.parse(localStorage.getItem("user"))[0].email


  const eliminar = (id)=>{
    deleteProductFromFavourites({ artId: id, email }, )
    
    setTimeout(() => {
      dispatch(getFavourites(email))
    }, 1000);
  }


  useEffect(() => {
    dispatch(getFavourites(user[0].email));
  }, []);


    return(
        <div>
            <div >
               <h1>Favoritos </h1>
            </div>

            {favoritos.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <img className={styles.imgCarrito} src={element.image} alt="" />
              <h1 className={styles.titleCarrito}>{element.title}</h1>
              <h1 className={styles.priceCarrito}> ${element.price}</h1>
              <div className={styles.btnCarritoPos}>
                <button className={styles.btnCarrito} onClick={() => alert("Agregado a favoritos")}>agregar favorito</button>
                 <button className={styles.btnCarrito} onClick={()=> eliminar(element.id)}>Delete</button> 
              </div>
            </div>
          </div>


        );
      })}


        </div>
    )
}
