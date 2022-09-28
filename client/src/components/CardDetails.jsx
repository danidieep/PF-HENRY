import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCarrito,
  addProductToCarrito,
  getProductById,
  cleanProductId,
  getProductsFromCarritoDB
} from "../actions/index";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import styles from "./ModulesCss/CardsDetails.module.css";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CardDetails(props) {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  const user = JSON.parse(localStorage.getItem("user"))

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);
  const state = useSelector((state) => state);
  const [esta, setEsta] = useState(false);

  useEffect(() => {
    dispatch(cleanProductId());
    dispatch(getProductById(id));
    if(user.length)dispatch(getProductsFromCarritoDB(user[0].email))
  }, []);

  const estaono = ()=>{
    
      const a = state.carrito.filter(e => e.title === product[0].title)
      if(a.length)setEsta(true)
      if(!a.length)setEsta(false)
   
   
  }

  useEffect(() => {
    if(state.carrito.length) estaono()
  }, [state.carrito]);


  const addToCartOrDelete = async () => {
   
    const email = user[0].email;
    const ArtInCuesiton = state.carrito.filter(
      (element) => element.title === product[0].title
    );
    if (ArtInCuesiton.length) {
      deleteProductFromCarrito({ artId: product[0].id, email }, )
      setEsta(false)
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email))
      }, 600);
      

      console.log("a")
      alert("Deleted from cart");
    } else {
      addProductToCarrito({ artId: product[0].id, email }, );
      setTimeout(() => {
        dispatch(getProductsFromCarritoDB(email))
      }, 600);
      
      alert("Added to cart");
    }
  };

  // const addToCartOrDelete = async ()=>{
  //  const ArtInCuesiton = state.carrito.filter(element=> element.title===product[0].title)
  //   if(ArtInCuesiton.length){
  //    dispatch(deleteProductFromCarrito({itemId:product[0].id, userId: state.user[0].id}))
  //     alert("artWork deleted from cart")
  // console.log(JSON.parse(localStorage.getItem("cart")))
  // }
  //  else{
  //     dispatch( addProductToCarrito({itemId:product[0].id, userId: state.user[0].id}))
  // alert("artWork added to cart")
  // }
  // }

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

          {user.length?<div>
            <Link to="/Profile">
            <button className={styles.btnUser}>
              <img src="https://i.imgur.com/LtoCkNW.png" alt="" />
            </button>
            </Link>
            <Link to="/ShopCart">
              <button className={styles.btnCarrito}>
                <img src="https://i.imgur.com/WsQE0Cn.png" alt="" />
              </button>
            </Link>
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

                  {user.length && !esta? (
                    <button
                      className={styles.buttonAddCart}
                      onClick={() => {
                        if (user.length) {
                          addToCartOrDelete();
                        } else {
                          alert("Login required");
                        }
                      }}
                    >
                      Add to cart
                    </button>
                  ) : user.length?
                    <button
                      className={styles.buttonAddCart}
                      onClick={addToCartOrDelete}
                    >
                      Delete from cart
                    </button>
                    :
                    false
                  }
                    
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
