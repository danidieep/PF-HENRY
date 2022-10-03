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

  const allOrders = useSelector((state) => state.allOrders);
  return (
    <div>
      <h1>Todas las ordenes para el admin</h1>

      {allOrders ? (
        allOrders.map((e) => {
          return <h3>completar con info a renderizar</h3>;
        })
      ) : (
        <di>no hay</di>
      )}
    </div>
  );
}
