import { useDispatch, useSelector } from "react-redux";
import { getProductsFromCarritoDB, deleteProductFromCarrito } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './ModulesCss/Carrito.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogOut from "./LogOut";
import { BsFillHeartFill } from "react-icons/bs"
import { BsFillCartFill } from "react-icons/bs"

export default function ShopCart() {

  const user = JSON.parse(localStorage.getItem("user"))
  const carrito = useSelector((state) => state.carrito)
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);
  const email = JSON.parse(localStorage.getItem("user"))[0].email
  const favoritos = useSelector((state) => state.favoritos)


  const eliminar = (id) => {
    deleteProductFromCarrito({ artId: id, email },)

    setTimeout(() => {
      dispatch(getProductsFromCarritoDB(email))
    }, 1000);
    alertDeleteFromCarrito()
  }

  const comprar = (id) => {
    deleteProductFromCarrito({ artId: id, email },)

    setTimeout(() => {
      dispatch(getProductsFromCarritoDB(email))
    }, 1000);
    alertItemBought()
  }


  useEffect(() => {
    dispatch(getProductsFromCarritoDB(user[0].email));
  }, []);

  function alertDeleteFromCarrito() {
    toast.success(`Artwork deleted from cart!`, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  function alertItemBought() {
    toast.success(`Thanks for purcharsing: ${product[0].title}, check your e-mail for futher information`, {
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
    <div className={styles.containerCarrito}>
      <header >
        <div className={styles.tapaHeader}></div>
        <div className={styles.header}>
          <div className={styles.filtersDiv}>
            <Link className={styles.link} to='/mainpage'>
              <button className={styles.logoDetails}
              ><h2 className={styles.logo}>Artket</h2></button>
            </Link>
            <div></div>
            <div><h1 className={styles.divTittle}>Your Cart</h1></div>
            <div></div>
            <div className={styles.restoDeItems}>
              <div className={styles.cartAndProfileAndFav} >
                {JSON.parse(localStorage.getItem("user")).length ?
                  <div className={styles.CartAndFav}>


                    <div className={styles.iconsHeader}>
                      <Link to="/ShopCart">

                        <button className={styles.btnCarritoNav}>
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
                    <div className={styles.profileBtn}>
                      <LogOut></LogOut>
                    </div>
                  </div>
                  : false
                }



              </div>
            </div>

          </div>
        </div>
      </header>
      <div className={styles.yourCarrito}>
        <ToastContainer />

      </div>
      {
        carrito.length === 0 ?
          <div className={styles.favEmpty}>
            <div>
              <p>You have nothing on your cart</p>
              <p>Don't know what to buy? Lots of arkwort are waiting for you!</p>
            </div>
          </div>
          : false
      }
      {carrito.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <Link to={'/Products/' + element.id}>
                <img className={styles.imgCarrito} src={element.image} alt="" />
              </Link>
              <h1 className={styles.titleCarrito}>{element.title}</h1>
              <h5 className={styles.titleBy}>by {element.creator}</h5>
              <h1 className={styles.priceCarrito}> ${element.price}</h1>
              <div className={styles.btnCarritoPos}>
                <button className={styles.btnCarrito} onClick={() => comprar(element.id)}>Buy Now!</button>
                <button className={styles.btnCarrito} onClick={() => eliminar(element.id)}>Delete</button>
              </div>
            </div>
          </div>


        );
      })}
      {/* <div className={styles.btnHomePos}>
        <Link to='/MainPage'>
          <button className={styles.btnHome}>Home</button>
        </Link>
      </div> */}
    </div>
  );
}

