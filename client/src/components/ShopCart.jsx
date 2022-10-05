import { useDispatch, useSelector } from "react-redux";
import {
  getProductsFromCarritoDB,
  deleteProductFromCarrito,
  getPay,
} from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import styles from "./ModulesCss/Carrito.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PayForm from "./PayForm";
import LogOut from "./LogOut";
import { BsFillHeartFill } from "react-icons/bs"
import { BsFillCartFill } from "react-icons/bs"
import { BsFillBagCheckFill } from "react-icons/bs";

export default function ShopCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const carrito = useSelector((state) => state.carrito);
  const payForm = useSelector((state) => state.payForm);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favoritos);
  const product = useSelector((state) => state.productDetails);
  const email = JSON.parse(localStorage.getItem("user"))[0].email;
  const [open, setOpen] = useState(false);

  const eliminar = (id) => {
    deleteProductFromCarrito({ artId: id, email });

    const modalController = () => {
      setOpen(!open);
    };

    setTimeout(() => {
      dispatch(getProductsFromCarritoDB(email));
    }, 1000);
    alertDeleteFromCarrito();
  };

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
    });
  }

  function alertItemBought() {
    toast.success(
      `Thanks for purcharsing: ${product[0].title}, check your e-mail for futher information`,
      {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  useEffect(() => {
    precioTotal();
  }, [carrito]);

  const [estado, setEstado] = useState("");

  function precioTotal() {
    let suma = 0;
    carrito.forEach((e) => (suma = suma + Number(e.price)));
    setEstado(suma);
  }
  function handleSubmit(e) {
    setOpen(!open);
  }

  return (
    <div className={styles.containerCarrito}>
      <header >
        <div className={styles.header}>
          <div className={styles.filtersDiv}>
            <Link className={styles.link} to="/mainpage">
              <button className={styles.logoDetails}>
                <h2 className={styles.logo}>Artket</h2>
              </button>
            </Link>
          </div>
          <div><h1 className={styles.divTittle}>Your cart</h1></div>
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
      {carrito.length === 0 ? (
        <div className={styles.favEmpty}>
          <div>
            <p>You have nothing on your cart</p>
            <p>Don't know what to buy? Lots of arkwort are waiting for you!</p>
          </div>
        </div>
      ) : (
        false
      )}
      {carrito.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <Link to={"/Products/" + element.id}>
                <img className={styles.imgCarrito} src={element.image} alt="" />
              </Link>
              <h1 className={styles.titleCarrito}>{element.title}</h1>
              <h5 className={styles.titleBy}>by {element.creator}</h5>
              <h1 className={styles.priceCarrito}> ${element.price}</h1>
              <div className={styles.btnCarritoPos}>
                {/* <button
                  className={styles.btnCarrito}
                  onClick={() => buyArtworkSubmit}
                >
                  Buy Now!
                </button> */}
                <button
                  className={styles.btnBuyAll}
                  onClick={() => eliminar(element.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {carrito.length > 0 ? (
        <div className={styles.comprarTodoContainer}>
          <div className={styles.comprarTodo}>
            <h2>Total price: {estado}</h2>
            {open === false ? (
              <div>
                <button
                  className={styles.btnBuyAll}
                  onClick={(e) => handleSubmit(e)}
                >
                  Buy all
                </button>
              </div>
            ) : (
              <PayForm carrito={carrito} user={user}></PayForm>
            )}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
