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
        <h1>Your Cart </h1>
      </div>

      {carrito.map((element) => {
        return (
          <div className={styles.allCarritoContainer}>
            <div className={styles.carrito}>
              <img className={styles.imgCarrito} src={element.image} alt="" />
              <h1 className={styles.titleCarrito}>{element.title}</h1>
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

// useMemo(()=>{

//     if(state.carrito.length){
//       localStorage.setItem("cart",JSON.stringify(state.carrito))
//     }
//     if(state.carrito.length===0){

//       if( JSON.parse(localStorage.getItem("cart")===null)){ localStorage.setItem("cart",JSON.stringify([]))}
//       if( JSON.parse(localStorage.getItem("cart").length)){ state.carrito = JSON.parse(localStorage.getItem("cart")) }

//     }

// },[state.carrito])
