import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromFavourites, getFavourites, } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from './ModulesCss/Carrito.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogOut from "./LogOut";
import { BsFillHeartFill } from "react-icons/bs"
import { BsFillCartFill } from "react-icons/bs"
import { BsFillBagCheckFill } from "react-icons/bs";



export default function Favoritos() {

  const user = JSON.parse(localStorage.getItem("user"))
  const favoritos = useSelector((state) => state.favoritos)
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito)
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
      <header >
        <div className={styles.header}>
          <div className={styles.filtersDiv}>
            <Link className={styles.link} to='/mainpage'>
              <button className={styles.logoDetails}
              ><h2 className={styles.logo}>Artket</h2></button>
            </Link>
          </div>
          <div><h1 className={styles.divTittle}>Favorites</h1></div>
          <div className={styles.cartAndProfileAndFav} >
            {JSON.parse(localStorage.getItem("user")).length ?
              <div className={styles.CartAndFav}>


                <div className={styles.iconsHeader}>
                  <Link to="/ShopCart">

                    <button className={styles.btnCarrito}>
                      <BsFillCartFill />
                      <h4 className={styles.cantItems}>{carrito.length}</h4>
                    </button>



                  </Link>
                </div>
                <div className={styles.iconsHeader}>
                  <Link to="/Favourites">
                    <button className={styles.btnFav}>
                      <BsFillHeartFill />
                      <h4 className={styles.cantItems}>{favoritos.length}</h4>
                    </button>

                  </Link>
                </div>
                <div className={styles.iconsHeader}>
                  <Link to="/OrderByUser">
                    <button className={styles.btnFav}>
                      <BsFillBagCheckFill
                        style={{ marginBottom: "0.45rem" }}
                      />
                    </button>
                  </Link>
                </div>
                <div className={styles.profileBtn}>
                  <LogOut></LogOut>
                </div>
              </div>
              : false
            }




          </div>


        </div>
      </header>
      <div className={styles.yourCarrito}>
        <ToastContainer />


      </div>
      {
        favoritos.length === 0 ?
          <div className={styles.favEmpty}>
            <div>
              <p>You have nothing on your favorites list.</p>
              <p>Don't know what to buy? Lots of arkwort are waiting for you!</p>
            </div>
          </div>
          : false
      }

      {favoritos.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <Link to={`/Products/${element.id}`}>
                <img className={styles.imgCarrito} src={element.image} alt="" />
              </Link>
              <h1 className={styles.titleCarrito}>{element.title}</h1>
              <h5 className={styles.titleBy}>by {element.creator}</h5>
              <h1 className={styles.priceCarrito}> ${element.price}</h1>
              <div className={styles.btnCarritoPos}>
                <button className={styles.btnBuyAll} onClick={() => eliminar(element.id)}>Delete</button>
              </div>
            </div>
          </div>


        );
      })}
      <div className={styles.btnHomePos}>
        {/* <Link to='/MainPage'>
          <button className={styles.btnHome}>Home</button>
        </Link> */}
      </div>

    </div>
  )
}
