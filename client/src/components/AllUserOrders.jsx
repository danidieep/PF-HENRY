import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOneOrder } from "../actions";
import styles from "./ModulesCss/AllUserOrders.module.css"
import {Link} from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"

export default function AllUserOrders() {
  const dispatch = useDispatch();

  let state = {
    order: ""
}
function subirAlState(event) {
  state.order = event.target.value.toLowerCase()

}

function send(event) {
  event.preventDefault()
  if (state.order.length > 0) {
      dispatch(getOneOrder(state.order))
      state.order=0
  }

  
}

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

    useEffect(() => {
        dispatch(getAllOrders());
      }, []);

      const allOrders = useSelector((state) => state.allOrders)
      const oneOrder = useSelector((state)=> state.getOneOrder )
      console.log(allOrders)
  return (
    <div className={styles.container}>
      <Link to="/MainPage">
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Artket</h1>
      </div>
      </Link>
       <div className={styles.body}>
        <div className={styles.panelLeft}>
          <h1 className={styles.panelLeft_title} >Look for an order</h1>
          <div className={styles.panelLeft_searchBar}>
           <form onSubmit={(e)=>send(e)}>
            <input type='text' className={styles.panelLeft_searchBar_input} placeholder="Search" autoComplete="off" id="inputSearch" onChange={(event) => { subirAlState(event) }} />
            <button className={styles.panelLeft_searchBar_button} type="submit"><AiOutlineSearch/></button>
           </form>
          </div>
         { oneOrder.length? 
         <div className={styles.orderFound}>
            <body>{oneOrder[0].orderId}</body>
            <body>{oneOrder[0].paymentId}</body>
            <body>{oneOrder[0].paymentStatus}</body>
            <body></body>
          </div>
           : false}
        </div>
        <div className={styles.panelRight} >
        {
            allOrders[0]?allOrders.map(e => {
                return (

                <div>

                    <div className={styles.item}>

                    <h3>orden id{e.orderId}</h3>
                    <h3>estado de pago: {e.paymentStatus}</h3>

                </div>


                {/* <div>
                    <h2>ordenes rechazadas:</h2>
                    <h3>orden id{e.orderId}</h3>
                    <h3>estado de pago: {e.paymentStatus}</h3>

                </div>  */}

                </div>
                    
                    
                )
            }):<di>no hay</di>
        }
        </div>
        </div>
      
    </div>
  );
}
