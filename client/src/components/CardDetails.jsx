import { useDispatch, useSelector } from "react-redux"
import { deleteProductFromCarrito,addProductToCarrito,getProductById, cleanProductId } from "../actions/index"
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "./Loader"
import Message from "./Message"
import styles from "./ModulesCss/CardsDetails.module.css"
import { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { useMemo } from "react"





export default function CardDetails(props) {
  const { id } = useParams();
  const { email, getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);
  const state = useSelector((state) => state);
  const [cantCompr, setCantCompr] = useState(0);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("cart"))===null){localStorage.setItem("cart", JSON.stringify([]))}
    dispatch(cleanProductId())
    dispatch(getProductById(id))
    console.log(product[0]);
  }, [])

  

  const addToCartOrDelete = async ()=>{
   const ArtInCuesiton = state.carrito.filter(element=> element.title===product[0].title)
    if(ArtInCuesiton.length){
     dispatch(deleteProductFromCarrito(product[0].id))
      alert("artWork deleted from cart")
      console.log(JSON.parse(localStorage.getItem("cart")))
    }
    else{
      dispatch( addProductToCarrito(product[0].id))
      alert("artWork added to cart")
    }
  }



  // const addCount = (action) =>{
  //  if(cantCompr>0){
  //   if(action==="-")setCantCompr(cantCompr-1)
  //   }
  // if(cantCompr>=0){
  //   if(action==="+")setCantCompr(cantCompr + 1)
  //   }
  // }

  return (
    <div className={styles.containerDetails} key={id}>
      <header>
        {/* <div className={styles.content2}> */}
        <div className={styles.header}>
          <div>
            <Link to="/MainPage">
              <button className={styles.btnHome}>
                Home
              </button>
             
            </Link>
          </div>
          <div></div>
          <div>
            <h1 className={styles.logo}>Artket</h1>
          </div>
          <div></div>
          <div>
            <button className={styles.btnUser}>
              <img src="https://i.imgur.com/LtoCkNW.png" alt="" />
            </button>
            <Link to="/ShopCart">
              <button className={styles.btnCarrito}>
                <img src="https://i.imgur.com/WsQE0Cn.png" alt="" />
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div id='conteinerDetail'>
        {
          product.length > 0 ?
            <div>
              <div className={styles.data}>
                <h1 className={styles.artist}>{product[0].creator}</h1>
                <div className={styles.detailsText}>
                  <h3 className={styles.detailsTittle}> {product[0].title}, {product[0].date}</h3>
                  <h3 className={styles.detailsH3}> {product[0].collecting_institution}</h3>
                  <h3 className={styles.detailsH3}> {product[0].medio}</h3>
                  <h3 className={styles.detailsH3}> {product[0].dimensions}</h3>
                  <h3 className={styles.detailsH3}>$ {product[0].price}</h3>
                  <div className={styles.buttonAddCartPos}>
                    {/* <button onClick={()=>addCount("-")}>-</button> */}


                    {true?
                   ( <button className={styles.buttonAddCart}
                     onClick={addToCartOrDelete}>Add to cart</button>)
                   : <button className={styles.buttonAddCart}
                   onClick={addToCartOrDelete}>Delete from cart</button>
                  
                  }
                    {/* <button onClick={()=>addCount("+")}>+</button> */}
                    {/* <span>cantidad a comprar: {cantCompr}</span> */}
                  </div>
                </div>
                <div className={styles.imgDetails}>
                  <img src={product[0].image ? product[0].image : "https://www.elsoldemexico.com.mx/doble-via/zcq7d4-perro.jpg/alternates/LANDSCAPE_768/perro.jpg"} alt="img not found" width="450px" height="400px" />
                </div>

              </div>
            </div> : <div>{Loader}</div>
        }
      </div>
    </div>
  );
}
