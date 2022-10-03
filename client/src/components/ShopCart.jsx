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

export default function ShopCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const carrito = useSelector((state) => state.carrito);
  const payForm = useSelector((state) => state.payForm);
  const dispatch = useDispatch();
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

  const comprar = (id) => {
    deleteProductFromCarrito({ artId: id, email });

    setTimeout(() => {
      dispatch(getProductsFromCarritoDB(email));
    }, 1000);
    alertItemBought();
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
      <div className={styles.yourCarrito}>
        <ToastContainer />

      </div>
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
                <button
                  className={styles.btnCarrito}
                  onClick={() => comprar(element.id)}
                >
                  Buy Now!
                </button>
                <button
                  className={styles.btnCarrito}
                  onClick={() => eliminar(element.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <h2>precio total: {estado}</h2>
        {open === false ? (
          <div>
            <button onClick={(e) => handleSubmit(e)}>Comprar todo</button>
          </div>
        ) : (
          <PayForm 
          carrito={carrito}
          user={user}
          ></PayForm>
        )}
      </div>

      <div className={styles.btnHomePos}>
        <Link to="/MainPage">
          <button className={styles.btnHome}>Home</button>
        </Link>
      </div> 
    </div>
  );
}

