import { useDispatch, useSelector } from "react-redux"
import { deleteProductFromCarrito,addProductToCarrito,getProductById, cleanProductId } from "../actions/index"
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "./Loader"
import Message from "./Message"
import styles from "./ModulesCss/CardsDetails.module.css"
import { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react"





export default function CardDetails(props) {
  const { id } = useParams();
  const {email} = useAuth0()

  const dispatch = useDispatch()
  const product = useSelector((state) => state.productDetails)
  const state = useSelector(state => state)
 
 const [carrito, setCarrito] = useState({})

  useEffect(() => {
   
    dispatch(cleanProductId())
    dispatch(getProductById(id))
    
  }, [])

     useEffect(()=>{
  
       localStorage.setItem("cart",JSON.stringify(state.carrito))
     },[state.carrito])
   

  const addToCartOrDelete = async ()=>{
    const ArtInCuesiton = state.carrito.filter(element=> element.title===product[0].title)
    const asd = state.carrito.map(e => e)
    if(ArtInCuesiton.length){
      console.log(state.carrito)
      localStorage.removeItem("cart",JSON.stringify(state.carrito))
      dispatch(deleteProductFromCarrito(product[0]))
      
    }
    else{
      dispatch(addProductToCarrito(product[0]))
      localStorage.setItem("cart",JSON.stringify(state.carrito))
     
    }
  }



  return (

    <div className={styles.containerDetails} key={id} >

      <header >
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
            
            <button className={styles.btnUser}><img src="https://i.imgur.com/LtoCkNW.png" alt="" /></button>
            <Link to="/ShopCart">
            <button className={styles.btnCarrito}><img src="https://i.imgur.com/WsQE0Cn.png" alt="" /></button>
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


                    {!state.carrito.includes(product[0])?
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
