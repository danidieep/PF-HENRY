import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions";

export default function AllUserOrders() {

    const dispatch = useDispatch();

    //vamos a renderizar

    useEffect(() => {
        dispatch(getAllOrders());
      }, []);

      const allOrders = useSelector((state) => state.allOrders)
      console.log(allOrders)
  return (
    <div>
        <h1>Todas las ordenes para el admin</h1>

        {
            allOrders[0]?allOrders.map(e => {
                return (

                <div>

                    <div>
                    <h2>ordenes aceptadas:</h2>
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
  );
}
