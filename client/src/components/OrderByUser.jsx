import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByUser } from "../actions";

export default function OrderByUser() {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getOrderByUser(user[0].email));
      }, []);

    const orderUser = useSelector((state) => state.orderUser);
  return (
    <div>
      {
        orderUser ? orderUser.map((e) => {
            return(
                <div>
                    info a renderizar de cada orden para mostrar en el user
                </div>
            )
        }):<div></div>
      }
    </div>
  );
}
