import { useDispatch, useSelector } from "react-redux";
import { getProductsFromCarritoDB, deleteProductFromCarrito } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './ModulesCss/Carrito.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShopCart() {

  const user = JSON.parse(localStorage.getItem("user"))
  const carrito = useSelector((state) => state.carrito)
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);
  const email = JSON.parse(localStorage.getItem("user"))[0].email
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
    toast.success(`${product[0].title} has been deleted from your cart`, {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
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
                <button className={styles.btnCarrito} onClick={() => comprar(element.id)}>Buy Now!</button>
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
