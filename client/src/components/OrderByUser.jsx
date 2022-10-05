import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getOrderByUser,
  getOrderUserDetail,
  filterOrderRejectedrUser,
  filterOrderAprovedUser,
} from "../actions";
import { Link } from "react-router-dom";
import styles from "./ModulesCss/AllUserOrders.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Loader } from "./Loader";


export default function OrderByUser() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const ordersUser = useSelector((state) => state.orderUserFiltered); //estan llegando todas las ordenes del user

  const oneOrder = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOrderByUser(user[0].email)); //todas odenes del user
  }, []);

  let state = {
    order: "",
  };
  function subirAlState(event) {
    state.order = event.target.value.toLowerCase();
  }

  function send(event) {
    event.preventDefault();
    if (state.order.length > 0) {
      dispatch(getOrderUserDetail(state.order));
      state.order = 0;
    }
  }

  function clickItem(order) {
    dispatch(getOrderUserDetail(order));
  }

  {console.log(user)}
  return (

    <div className={styles.container}>
      <Link to="/MainPage">
        <div className={styles.header}>
          <h1 className={styles.logoForm}>Artket</h1>
        </div>
      </Link>
      <div className={styles.body}>
        <div className={styles.panelLeft}>
          <h1 className={styles.panelLeft_title}>Look for an order</h1>
          <div className={styles.panelLeft_searchBar}>
            <form onSubmit={(e) => send(e)}>
              <input
                type="text"
                className={styles.panelLeft_searchBar_input}
                placeholder="Search"
                autoComplete="off"
                id="inputSearch"
                onChange={(event) => {
                  subirAlState(event);
                }}
              />
              <button
                className={styles.panelLeft_searchBar_button}
                type="submit"
              >
                <AiOutlineSearch />
              </button>
            </form>
          </div>
          {oneOrder.length ? (
            <div className={styles.orderFound}>
              {console.log(oneOrder)}
              <body>Order id: {oneOrder[0].orderId}</body>
              <body>Payment id: {oneOrder[0].paymentId}</body>
              <body>Status: {oneOrder[0].paymentStatus}</body>
              <body>Date: {oneOrder[0].date_created}</body>
              <body>Total amount: {oneOrder[0].paymentAmount}</body>
              <body>Order: {oneOrder[0].adress}</body>
              {/* <body>Payment details: {oneOrder[0].paymentDetail}</body> */}
              {oneOrder[0].items.map((e) => {
                return (
                  <div className={styles.artworksBox} key={e.id}>
                    <div className={styles.artworksBox_img}>
                      <img style={{ width: "100%" }} src={e.picture_url} />
                    </div>
                    <div className={styles.artwotkBox_data}>
                      <body>Artwork id: {e.id}</body>
                      <body>Title: {e.title}</body>
                      <body>quantity: {e.quantity}</body>
                      <body>price: {e.unit_price}</body>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            false
          )}
        </div>
        <div className={styles.panelRight}>
          <div className={styles.filter_container}>
            <button
              className={styles.filter_button}
              onClick={() => dispatch(filterOrderRejectedrUser())}
            >
              Filter by rejected
            </button>
            <button
              className={styles.filter_button}
              onClick={() => dispatch(filterOrderAprovedUser())}
            >
              Filter by aproved
            </button>
          </div>
          {ordersUser[0] ? (
            ordersUser.map((e) => {
              return (
                <div key={e.orderId}>
                  <div>
                    <button
                      className={styles.item}
                      onClick={() => clickItem(e.orderId)}
                    >
                      <h3>Order id: {e.orderId}</h3>
                      <h3>Status: {e.paymentStatus}</h3>
                      <h3>Date: {e.date_created}</h3>
                    </button>
                  </div>

                  {/* <div>
                    <h2>ordenes rechazadas:</h2>
                    <h3>orden id{e.orderId}</h3>
                    <h3>estado de pago: {e.paymentStatus}</h3>

                </div>  */}
                </div>
              );
            })
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
