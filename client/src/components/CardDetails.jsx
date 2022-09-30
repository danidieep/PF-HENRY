import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCarrito,
  addProductToCarrito,
  getProductById,
  cleanProductId,
  getProductsFromCarritoDB,
  deleteProductFromFavourites,
  getFavourites,
  addProductToFavourites

} from "../actions/index";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import styles from "./ModulesCss/CardsDetails.module.css";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CardDetails(props) {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const carrito = useSelector((state) => state.carrito)
  const favoritos = useSelector((state) => state.favoritos)
  const user = JSON.parse(localStorage.getItem("user"))

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);
  const state = useSelector((state) => state);
  const [esta, setEsta] = useState(false);
  const [estaEnfavoritos, setEstaEnFavoritos] = useState(false);

  useEffect(() => {
    dispatch(cleanProductId());
    dispatch(getProductById(id));
    if (user.length) dispatch(getProductsFromCarritoDB(user[0].email))
    if (user.length) dispatch(getFavourites(user[0].email))
  }, []);

  const estaono = () => {

    if (state.carrito.length && product.length) {
      const a = state.carrito.filter(e => e.title === product[0].title)
      if (a.length) setEsta(true)
      if (!a.length) setEsta(false)
    }

  }

  const estaonoEnfavoritos = () => {

    if (state.favoritos.length && product.length) {
      const a = state.favoritos.filter(e => e.title === product[0].title)
      if (a.length) setEstaEnFavoritos(true)
      if (!a.length) setEstaEnFavoritos(false)
    }

  }

  useEffect(() => {
    if (state.carrito.length) estaono()
  }, [state.carrito]);

  useEffect(() => {
    if (state.favoritos.length) estaonoEnfavoritos()
  }, [state.favoritos]);



  const addToCartOrDelete = async () => {

    const email = user[0].email;
    const ArtInCuesiton = state.carrito.filter(
      (element) => element.title === product[0].title
    );
    if (ArtInCuesiton.length && esta) {
      deleteProductFromCarrito({ artId: product[0].id, email },)
      setEsta(false)
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email))
      }, 600);
      alertDeleteFromCarritoAtDetails()

    } else if (!esta) {
      setEsta(true)
      addProductToCarrito({ artId: product[0].id, email },);
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email))
      }, 1000);

      alertAddToCarrito()
    }
  };



  const addToFavouritosOrDelete = async () => {

    const email = user[0].email;
    const ArtInCuesiton1 = state.favoritos.filter(
      (element) => element.title === product[0].title
    );
    if (ArtInCuesiton1.length && estaEnfavoritos) {
      deleteProductFromFavourites({ artId: product[0].id, email },)
      setEstaEnFavoritos(false)
      setTimeout(() => {
        dispatch(getFavourites(email))
      }, 1000);


      console.log("a")
      alertDeleteFromFavouritesAtDetails()
    } else if (!estaEnfavoritos) {
      setEstaEnFavoritos(true)
      addProductToFavourites({ artId: product[0].id, email },);
      setTimeout(() => {
        dispatch(getFavourites(email))
      }, 1000);

      alertAddtoFavouritesAtDetails()
    }
  };


  function alertAddToCarrito() {
    toast.success('Adding to cart!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertDeleteFromCarritoAtDetails() {
    toast.success('Deleting from cart!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertAddtoFavouritesAtDetails() {
    toast.success('Adding to Favourites!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertDeleteFromFavouritesAtDetails() {
    toast.success('Deleting from Favourites!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertLogInRequired() {
    toast.warn(`Login required`, {
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
    <div className={styles.containerDetails} key={id}>
      <header>
        {/* <div className={styles.content2}> */}
        <div className={styles.header}>
          <div>
            <Link to="/MainPage">
              <button className={styles.btnHome}>Home</button>
            </Link>
          </div>
          <div></div>
          <div>
            <h1 className={styles.logo}>Artket</h1>
          </div>
          <div></div>

          <ToastContainer />
          {user.length ? <div>
            <Link to="/Profile">
              <button className={styles.btnUser}>
                <img src="https://i.imgur.com/LtoCkNW.png" alt="" />
              </button>
            </Link>
            <Link to="/ShopCart">
              <button className={styles.btnCarrito}>
                <img src="https://i.imgur.com/WsQE0Cn.png" alt="" />
                <h4>{carrito.length}</h4>
              </button>
              
            </Link>
            <div>
                      <Link to="/Favourites">
                        <button className={styles.btnCarrito}>
                          Favorites
                          <h4>{favoritos.length}</h4>
                        </button>
                        
                      </Link>
                    </div> 

          </div>
            :
            false
          }

        </div>
      </header>
      <div id="conteinerDetail">
        {product.length > 0 ? (
          <div>
            <div className={styles.data}>
              <h1 className={styles.artist}>{product[0].creator}</h1>
              <div className={styles.detailsText}>
                <h3 className={styles.detailsTittle}>
                  {" "}
                  {product[0].title}, {product[0].date}
                </h3>
                <h3 className={styles.detailsH3}>
                  {" "}
                  {product[0].collecting_institution}
                </h3>
                <h3 className={styles.detailsH3}> {product[0].medio}</h3>
                <h3 className={styles.detailsH3}> {product[0].dimensions}</h3>
                <h3 className={styles.detailsH3}>$ {product[0].price}</h3>
                <div className={styles.buttonAddCartPos}>
                  {/* <button onClick={()=>addCount("-")}>-</button> */}

                  <div>
                    {user.length && !esta ? (
                      <button
                        className={styles.buttonAddCart}
                        onClick={() => {
                          if (user.length) {
                            addToCartOrDelete();
                          } else {
                            alertLogInRequired();
                          }
                        }}
                      >
                        Add to cart
                      </button>
                    ) : user.length && esta ?
                      <button
                        className={styles.buttonAddCart}
                        onClick={addToCartOrDelete}
                      >
                        Delete from cart
                      </button>
                      :
                      false
                    }
                  </div>
                  {/* <button onClick={()=>addCount("-")}>-</button> */}

                  <div>
                    {user.length && !estaEnfavoritos ? (
                      <button
                        className={styles.buttonAddCart}
                        onClick={() => {
                          if (user.length) {
                            addToFavouritosOrDelete();
                          } else {
                            alertLogInRequired();
                          }
                        }}
                      >
                        Add to Favourites
                      </button>
                    ) : user.length && estaEnfavoritos ?
                      <button
                        className={styles.buttonAddCart}
                        onClick={addToFavouritosOrDelete}
                      >
                        Delete from Favourites
                      </button>
                      :
                      false
                    }
                  </div>
                  {/* <button onClick={()=>addCount("+")}>+</button> */}
                  {/* <span>cantidad a comprar: {cantCompr}</span> */}
                </div>
              </div>
              <div className={styles.imgDetails}>
                <img
                  src={
                    product[0].image
                      ? product[0].image
                      : "https://www.elsoldemexico.com.mx/doble-via/zcq7d4-perro.jpg/alternates/LANDSCAPE_768/perro.jpg"
                  }
                  alt="img not found"
                  width="450px"
                  height="400px"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>{Loader}</div>
        )}
      </div>
    </div>
  );
}
