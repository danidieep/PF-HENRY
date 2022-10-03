import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUser, getOrderUserDetail } from "../actions";
import { Link } from "react-router-dom"

export default function OrderByUser() {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"))

    

    const ordersUser = useSelector((state) => state.orderUser);
    
    const oneOrderUser = useSelector((state) => state.orderDetail);

  useEffect(() => {
         dispatch(getOrderByUser(user[0].email));
        dispatch(getOrderUserDetail(ordersUser[0].orderId));
      }, []);

      console.log(user[0], 'user')
      console.log(ordersUser[0], 'orden')
  return (
    <div>

<Link to="/MainPage">
      <div className={styles.header}>
        <h1 className={styles.logoForm}>Artket</h1>
      </div>
      </Link>
      
    </div>
  );
}
