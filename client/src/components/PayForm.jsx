import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAdress, getPay, postAdress, putAdress } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ModulesCss/LogIn.module.css"

export default function PayForm(data) {
  const [adress, setAdress] = useState({
    street: "",
    number: "",
    postalCode: "",
  });

  const [open, setOpen] = useState(false);
  const modalController = () => {
    setOpen(!open);
  };

  const [input, setInput] = useState({
    street: "",
    number: "",
    postalCode: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postAdress(input, data.user[0].email);
    getPay(data.carrito, data.user, input.street.length && input.number.length && input.postalCode.length ? input : adress);
  }

  function handleSubmitChanged(e) {
    e.preventDefault();
    putAdress(input, data.user[0].email);
    getPay(data.carrito, data.user, input.street.length && input.number.length && input.postalCode.length ? input : adress);
  }

  useEffect(() => {
    getAdress(data.user[0].email).then((res) => {
      setAdress({
        street: res.data.street,
        number: res.data.number,
        postalCode: res.data.postalCode,
      });
    });
  }, []);

  // function handleChangeAdress() {
  //   setAdress({
  //     street: "",
  //     number: "",
  //     postalCode: "",
  //   });
  // }

  return (
    <div>
      {adress.street ? (
        <div>
          <h4>
            Do you want us to send the package to this adress? <br />{adress.street}{" "}
            {adress.number}
          </h4>
          <div>
            <button className={styles.btnBuyAll} type="submit" onClick={(e) => handleSubmit(e)}>
              Yes
            </button>

            <button className={styles.btnBuyAll} onClick={modalController}>No</button>
          </div>
          <br></br>
          {open ? (
            <div className={styles.formPay} key={open}>
              {/* -------------------------   STREET       */}
              <h1>Change your adress</h1>
              <div className={styles.formPayContainer}>
                <div className={styles.optForm}>
                  {/* <label>Street: </label> */}
                  <input
                    type="text"
                    name="street"
                    value={input.street}
                    autoComplete="off"
                    placeholder={"Street"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                </div>
                {/* -------------------------   NUMBER       */}
                <div className={styles.optForm}>
                  {/* <label>Number: </label> */}
                  <input
                    type="number"
                    name="number"
                    value={input.number}
                    autoComplete="off"
                    placeholder={"Number"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                </div>
                {/* -------------------------   POSTAL CODE       */}
                <div className={styles.optForm}>
                  {/* <label>PostalCode: </label> */}
                  <input
                    type="number"
                    name="postalCode"
                    value={input.postalCode}
                    autoComplete="off"
                    placeholder={"Postalcode"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                </div>
              </div>
              <Link>
                <button className={styles.btnReadyChangeAdress} type="submit" onClick={(e) => handleSubmitChanged(e)}>
                  Ready
                </button>
              </Link>
            </div>
          ) : false


          }
        </div>
      ) : (
        <div className={styles.formPay} key={adress.street}>
          {/* -------------------------   STREET       */}
          <div className={styles.formPayContainer}>
            <div className={styles.optForm}>
              {/* <label>Street: </label> */}
              <input
                type="text"
                name="street"
                value={input.street}
                autoComplete="off"
                placeholder={"Street"}
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
            {/* -------------------------   NUMBER       */}
            <div className={styles.optForm}>
              {/* <label>Number: </label> */}
              <input
                type="number"
                name="number"
                value={input.number}
                autoComplete="off"
                placeholder={"Number"}
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
            {/* -------------------------   POSTAL CODE       */}
            <div className={styles.optForm}>
              {/* <label>PostalCode: </label> */}
              <input
                type="number"
                name="postalCode"
                value={input.postalCode}
                autoComplete="off"
                placeholder={"Postalcode"}
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
          </div>
          <Link>
            <button className={styles.btnReadyChangeAdress} type="submit" onClick={(e) => handleSubmit(e)}>
              Ready
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}