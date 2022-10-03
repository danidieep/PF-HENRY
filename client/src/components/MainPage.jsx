import React from "react";
import { useEffect } from "react";
import {
  sendEmail,
  filterByMedium,
  deletefilter,
  getProducts,
  OrderByPrice,
  showAllProducts,
  getArtists,
  filterByArtist,
  AddFilters,
  getProductsFromCarritoDB,
} from "../actions";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
import Loader from "./Loader";
import styles from "./ModulesCss/MainPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./AdminPanel";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";

let ProductsPorPage = 6;

export default function MainPage(props) {
  const carrito = useSelector((state) => state.carrito);
  const favoritos = useSelector((state) => state.favoritos);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  let CountOf = Math.ceil(state.productsFiltered.length / ProductsPorPage);
  let arrCountOf = [];
  arrCountOf = state.productsFiltered.slice(0, CountOf);

  const { user, isAuthenticated } = useAuth0();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(ProductsPorPage);
  const [current, setCurrent] = useState(1);
  const [filters, setFilters] = useState("base");

  React.useEffect(() => {
    if (state.allProducts.length === 0) dispatch(getProducts());
    if (state.artistsList.length === 0) dispatch(getArtists());
    applyFilter();
    if (user && user.length) dispatch(getProductsFromCarritoDB(user[0].email));
  }, [state.filters]);

  const handlerNext = () => {
    if (current < CountOf) {
      setNum1(num1 + ProductsPorPage);
      setNum2(num2 + ProductsPorPage);
      setCurrent(current + 1);
    }
  };

  const handlerPrev = () => {
    if (current >= 2) {
      setNum1(num1 - ProductsPorPage);
      setNum2(num2 - ProductsPorPage);
      setCurrent(current - 1);
    }
  };

  const handleReset = () => {
    setNum1(0);
    setNum2(ProductsPorPage);
    setCurrent(1);
  };

  const applyFilter = (e) => {
    state.filters.forEach((element) => {
      if (element.type === "artist") {
        dispatch(filterByArtist(element.name));
      }

      if (element.type === "medium") {
        dispatch(filterByMedium(element.name));
      }
    });
  };

  const OrderByPriceSelector = (name) => {
    // dispatch(OrderByPrice(type))
    dispatch(OrderByPrice(name));
  };

  const artistSelector = (name) => {
    dispatch(AddFilters({ type: "artist", name }));
    handleReset();
  };

  const deleteFilter_ = (name) => {
    dispatch(deletefilter(name));
  };

  const mediumSelector = (name) => {
    dispatch(AddFilters({ type: "medium", name }));
    // dispatch(filterByMedium(type))
    handleReset();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const userLocal = JSON.parse(localStorage.getItem("user"));
    dispatch(sendEmail((userLocal.email = user.email)));
    alertNewslatter();
  };

  function alertNewslatter() {
    toast.info("You have been suscribed to our newsletter!", {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <div className={styles.tapaHeader}></div>
          <div className={styles.header}>
            <div className={styles.restoDeItems}>
              <div className={styles.filtersDiv}>
                <button
                  className={styles.logo}
                  onClick={() => dispatch(showAllProducts())}
                >
                  <h2 className={styles.logo}>Artket</h2>
                </button>
                {/* <p className={styles.filter}>Filters</p> */}
                <div className={styles.select}>
                  <nav>
                    <ul className={styles.menuHor}>
                      <li>
                        <button className={styles.buttonsProfBase}>
                          Order by price
                        </button>
                        <ul className={styles.menuVert}>
                          <li>
                            <button
                              value="OrderByMoreExpensive"
                              onClick={(e) =>
                                OrderByPriceSelector(e.target.value)
                              }
                              className={styles.buttonsProf}
                            >
                              More expensive
                            </button>
                          </li>
                          <li>
                            <button
                              value="OrderByLessExpensive"
                              onClick={(e) =>
                                OrderByPriceSelector(e.target.value)
                              }
                              className={styles.buttonsProf}
                            >
                              Less expensive
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className={styles.select}>
                  <nav>
                    <ul className={styles.menuHor}>
                      <li>
                        <button className={styles.buttonsProfBase}>
                          Artists
                        </button>
                        <ul className={styles.menuVert}>
                          {state.artistsList.map((element) => {
                            return (
                              <li>
                                <button
                                  value={element.name}
                                  onClick={(e) =>
                                    artistSelector(e.target.value)
                                  }
                                  className={styles.buttonsProf}
                                >
                                  {element.name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className={styles.select}>
                  <nav>
                    <ul className={styles.menuHor}>
                      <li>
                        <button className={styles.buttonsProfBase}>
                          Mediums
                        </button>
                        <ul className={styles.menuVert}>
                          {state.mediums.map((element) => {
                            return (
                              <li>
                                <button
                                  value={element}
                                  onClick={(e) =>
                                    mediumSelector(e.target.value)
                                  }
                                  className={styles.buttonsProf}
                                >
                                  {element}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className={styles.SearchBarHome}>
                  <SearchBar handleReset={handleReset}></SearchBar>
                </div>
              </div>
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
                  </div>
                ) : (
                  false
                )}

                <div></div>

                <div>
                  <LogOut></LogOut>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CARRUSEL */}
        <div>
          {user && user.length ? (
            !user[0].role && state.productsFiltered.length > 5 ? (
              <carrusel>
                <p className={styles.featured}>Featured</p>
                <div className={styles.carrusel}>
                  <div>
                    <ul>
                      {state.productsFiltered
                        .slice(num1, num2)
                        .slice(0, 5)
                        .map((element) => {
                          return (
                            <li>
                              <img src={element.image}></img>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </carrusel>
            ) : (
              false
            )
          ) : (
            <carrusel>
              <p className={styles.featured}>Featured</p>
              <div className={styles.carrusel}>
                <div>
                  <ul>
                    {state.productsFiltered
                      .slice(num1, num2)
                      .slice(0, 5)
                      .map((element) => {
                        return (
                          <li>
                            <img src={element.image}></img>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </carrusel>
          )}
        </div>
        {/* FILTROS */}

        <AdminPanel />

        {/* LIMPIAR FILTROS */}
        {state.filters.length > 0 ? (
          <div>
            <h3 className={styles.filtersAplied}>Filters aplied:</h3>
          </div>
        ) : (
          false
        )}
        {state.filters.map((element) => {
          return (
            <div key={1}>
              <span>{element.name}</span>
              <button
                onClick={() => deleteFilter_(element)}
                className={styles.buttonsFilter}
              >
                X
              </button>
            </div>
          );
        })}
        <div className={styles.body}>
          <div className={styles.cardsContainer}>
            <p className={styles.galeryTitle}>Galery</p>
            {/* CARDS  */}

            {
              // si hay productos filtras y no hay mensaje de error
              state.productsFiltered.length > 0 ? (
                <div className={styles.cards}>
                  {state.productsFiltered.slice(num1, num2).map((element) => (
                    <div id="card">
                      <Cards data={element} key={element.id} />
                    </div>
                  ))}
                </div>
              ) : !state.allProducts && !state.filters.length ? (
                <div className={styles.contenedorLoading}>
                  <img
                    className="loading"
                    src="https://i.pinimg.com/originals/2e/b8/d0/2eb8d009f410f30866b6a34a374af797.gif"
                    alt=""
                  />
                </div>
              ) : state.allProducts && state.filters.length ? (
                <div>
                  <h1>NO HAY OBRAS CON ESOS FILTROS</h1>
                </div>
              ) : (
                false
              )
            }
          </div>
        </div>
        {/* PAGINADO */}
        <footer className={styles}>
          <div className={styles.paginado}>
            <button
              onClick={handlerPrev}
              className={styles.button31Paginado}
            >{`<`}</button>
            {arrCountOf.map((e, i) => (
              <button
                onClick={() => {
                  setNum1((i + 1) * ProductsPorPage - ProductsPorPage);
                  setNum2((i + 1) * ProductsPorPage);
                  setCurrent(i + 1);
                }}
                className={styles.button31Paginado}
                style={
                  i + 1 === current
                    ? { backgroundColor: "rgb(176, 119, 119)" }
                    : { color: "black" }
                }
              >
                {i + 1}
              </button>
            ))}
            <button
              className={styles.button31Paginado}
              onClick={handlerNext}
            >{`>`}</button>
          </div>
          <div className={styles.footer_info}>
            {JSON.parse(localStorage.getItem("user")).length ||
            isAuthenticated ? (
              <div>
                <p className={styles.newsletter}>
                  Wana recive info about our lastest sales? Register to our
                  newsleter to be updated at every time
                </p>
                <div className={styles.formNewsletter}>
                  <button
                    className={styles.btnSubscribe}
                    onClick={handleSubscribe}
                  >
                    Subscribe to Newsletter
                  </button>
                </div>
              </div>
            ) : (
              false
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
