import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUser } from "../actions";
import { Link } from "react-router-dom"

export default function OrderByUser() {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getOrderByUser(user[0].email));
      }, []);

    const orderUser = useSelector((state) => state.orderUser);
    console.log(orderUser[0])
  return (
    <div>
      {
        orderUser[0] ? orderUser.map((e) => {
          const aux = e.items.map(e => {
            return(
            <div key={e.orderId}>
               <h3>obras de arte:</h3>
               <h4>titulo: {e.title}</h4>
               <h4>precio por unidad {e.unit_price}</h4>
            </div>
            )})
            
            return(
                <div key={e.orderId}>
                    <h1>order cliente:</h1>
                    <h3>{e.orderId}</h3>
                    
                    <h3>precio total: {e.paymentAmount} </h3>
                    <h3>{aux}</h3>

                    <Link to={`/OrderUser/${e.orderId}`}>
                    <button >DETALLE</button>
                    </Link>
                  <hr></hr>
                </div>
            )
        }):<div>Loading...</div>
      }
    </div>
  );
}
