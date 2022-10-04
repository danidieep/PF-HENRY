import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCarrito,
  addProductToCarrito,
  getProductById,
  cleanProductId,
  getProductsFromCarritoDB,
  deleteProductFromFavourites,
  getFavourites,
  addProductToFavourites,
} from "../actions/index";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "./Loader";
import Message from "./Message";
import styles from "./ModulesCss/CardsDetails.module.css";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";
import LogOut from "./LogOut";
import { GiSandsOfTime } from "react-icons/gi";

export default function CardDetails(props) {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const carrito = useSelector((state) => state.carrito);
  const favoritos = useSelector((state) => state.favoritos);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const product = JSON.parse(localStorage.getItem("product"));
  const state = useSelector((state) => state);
  const [esta, setEsta] = useState(false);
  const [estaEnfavoritos, setEstaEnFavoritos] = useState(false);

  useEffect(() => {
    dispatch(cleanProductId());

    dispatch(getProductById(id));
    if (user.length) dispatch(getProductsFromCarritoDB(user[0].email));
    if (user.length) dispatch(getFavourites(user[0].email));
    return () => {
      localStorage.setItem("product", JSON.stringify([]));
    };
  }, []);

  const estaono = () => {
    if (state.carrito.length && product.length) {
      const a = state.carrito.filter((e) => e.title === product[0].title);
      if (a.length) setEsta(true);
      if (!a.length) setEsta(false);
    }
  };

  const [estado, setEstado] = useState(false);
  const [estadoFav, setEstadoFav] = useState(false);

  const desactivado = () => {
    setEstado(true);
    setTimeout(() => {
      setEstado(false);
    }, 2500);
  };

  const desactivadoFav = () => {
    setEstadoFav(true);
    setTimeout(() => {
      setEstadoFav(false);
    }, 2500);
  };

  const estaonoEnfavoritos = () => {
    if (state.favoritos.length && product.length) {
      const a = state.favoritos.filter((e) => e.title === product[0].title);
      if (a.length) setEstaEnFavoritos(true);
      if (!a.length) setEstaEnFavoritos(false);
    }
  };

  useEffect(() => {
    if (state.carrito.length) estaono();
  }, [state.carrito]);

  useEffect(() => {
    if (state.favoritos.length) estaonoEnfavoritos();
  }, [state.favoritos]);

  const addToCartOrDelete = async () => {
    const email = user[0].email;
    const ArtInCuesiton = state.carrito.filter(
      (element) => element.title === product[0].title
    );
    if (ArtInCuesiton.length && esta) {
      deleteProductFromCarrito({ artId: product[0].id, email });
      desactivado();
      setEsta(false);
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email));
      }, 600);
      alertDeleteFromCarritoAtDetails();
    } else if (!esta) {
      desactivado();
      setEsta(true);
      addProductToCarrito({ artId: product[0].id, email });
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email));
      }, 1000);

      alertAddToCarrito();
    }
  };

  const addToFavouritosOrDelete = async () => {
    const email = user[0].email;
    const ArtInCuesiton1 = state.favoritos.filter(
      (element) => element.title === product[0].title
    );
    if (ArtInCuesiton1.length && estaEnfavoritos) {
      desactivadoFav();
      deleteProductFromFavourites({ artId: product[0].id, email });
      setEstaEnFavoritos(false);
      setTimeout(() => {
        dispatch(getFavourites(email));
      }, 1000);

      console.log("a");
      alertDeleteFromFavouritesAtDetails();
    } else if (!estaEnfavoritos) {
      desactivadoFav();
      setEstaEnFavoritos(true);
      addProductToFavourites({ artId: product[0].id, email });
      setTimeout(() => {
        dispatch(getFavourites(email));
      }, 1000);

      alertAddtoFavouritesAtDetails();
    }
  };

  function alertAddToCarrito() {
    toast.success("Adding to cart!", {
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
    toast.success("Deleting from cart!", {
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
    toast.success("Adding to Favourites!", {
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
    toast.success("Deleting from Favourites!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className={styles.containerDetails} key={id}>
      <header>
        <div className={styles.tapaHeader}></div>
        <div className={styles.header}>
          <div className={styles.filtersDiv}>
            <Link className={styles.link} to="/mainpage">
              <button className={styles.logoDetails}>
                <h2 className={styles.logo}>Artket</h2>
              </button>
            </Link>
            <div></div>
            <div></div>
            <div></div>
            <div className={styles.restoDeItems}>
              <div className={styles.cartAndProfileAndFav}>
                {JSON.parse(localStorage.getItem("user")).length ? (
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
                          <h4 className={styles.cantItems}>
                            {favoritos.length}
                          </h4>
                        </button>
                      </Link>
                    </div>
                    <div className={styles.profileBtn}>
                      <LogOut></LogOut>
                    </div>
                  </div>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="conteinerDetail">
        {product.length > 0 ? (
          <div>
            <div className={styles.data}>
              <div className={styles.dataText}>
                <h1 className={styles.artist}>{product[0].creator}</h1>
                <h3 className={styles.detailsTittle}>
                  {product[0].title}, {product[0].date}
                </h3>
                <div className={styles.detailsText}>
                  <h3 className={styles.detailsPrice}>$ {product[0].price}</h3>
                  {/* <div>
                    <h3 className={styles.artworkdetailsH3}>
                      Artwork details</h3>
                  </div> */}
                  <h3 className={styles.detailsH3}>
                    {product[0].collecting_institution}
                  </h3>
                  <h3 className={styles.detailsH3}> {product[0].medio}</h3>
                  <h3 className={styles.detailsH3}> {product[0].dimensions}</h3>
                  <div className={styles.buttonAddCartPos}>
                    <div className={styles.btnsDetailsPos}>
                      {user.length && !esta ? (
                        <button
                          disabled={estado}
                          className={styles.buttonAddCart}
                          onClick={() => {
                            if (user.length) {
                              addToCartOrDelete();
                            }
                          }}
                        >
                          {!estado ? (
                            <h4> Add to cart </h4>
                          ) : (
                            <h4>
                              <GiSandsOfTime />
                            </h4>
                          )}
                        </button>
                      ) : user.length && esta ? (
                        <button
                          disabled={estado}
                          className={styles.buttonAddCart}
                          onClick={addToCartOrDelete}
                        >
                          {!estado ? (
                            <h4> Delete from cart </h4>
                          ) : (
                            <h4>
                              <GiSandsOfTime />
                            </h4>
                          )}
                        </button>
                      ) : (
                        false
                      )}
                    </div>

                    <div className={styles.btnsDetailsPos}>
                      {user.length && !estaEnfavoritos ? (
                        <button
                          disabled={estadoFav}
                          className={styles.buttonAddCart}
                          onClick={() => {
                            if (user.length) {
                              addToFavouritosOrDelete();
                            }
                          }}
                        >
                          {!estadoFav ? (
                            <h4> Add to favourites </h4>
                          ) : (
                            <h4>
                              <GiSandsOfTime />
                            </h4>
                          )}
                        </button>
                      ) : user.length && estaEnfavoritos ? (
                        <button
                          disabled={estadoFav}
                          className={styles.buttonAddCart}
                          onClick={addToFavouritosOrDelete}
                        >
                          {!estadoFav ? (
                            <h4> Delete from favourites </h4>
                          ) : (
                            <h4>
                              <GiSandsOfTime />
                            </h4>
                          )}
                        </button>
                      ) : (
                        false
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.imgDetails}>
                <img
                  className={styles.imgDetailsPos}
                  src={
                    product[0].image
                      ? product[0].image
                      : "https://www.elsoldemexico.com.mx/doble-via/zcq7d4-perro.jpg/alternates/LANDSCAPE_768/perro.jpg"
                  }
                  alt="img not found"
                  // max-width="450px"
                  // max-height="400px"
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
