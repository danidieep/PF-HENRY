import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromFavourites, getFavourites, } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from './ModulesCss/Carrito.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Favoritos() {

  const user = JSON.parse(localStorage.getItem("user"))
  const favoritos = useSelector((state) => state.favoritos)
  const dispatch = useDispatch();

  const email = JSON.parse(localStorage.getItem("user"))[0].email


  const eliminar = (id) => {
    deleteProductFromFavourites({ artId: id, email },)

    toast.success(`Artwork deleted from favourites!`, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    setTimeout(() => {
      dispatch(getFavourites(email))
    }, 1000);

  }


  useEffect(() => {
    dispatch(getFavourites(user[0].email));
  }, []);

  return (
    <div className={styles.containerCarrito}>

      <div className={styles.yourCarrito}>
        <ToastContainer />
        <header>
          <h1>Favorites</h1>
        </header>
      </div>

      {favoritos.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <img className={styles.imgCarrito} src={element.image} alt="" />
              <h1 className={styles.titleCarrito}>{element.title}</h1>
              <h1 className={styles.priceCarrito}> ${element.price}</h1>
              <div className={styles.btnCarritoPos}>
                <Link to={`/Products/${element.id}`}>
                  <button className={styles.btnCarrito}>View artwork</button>
                </Link>
                <button className={styles.btnCarrito} onClick={() => eliminar(element.id)}>Delete</button>
              </div>
            </div>
          </div>


        );
      })}
      <div className={styles.btnHomePos}>
        <Link to='/MainPage'>
          <button className={styles.btnHome}>Home</button>
        </Link>
      </div>

    </div>
  )
}
