import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAdress, getPay, postAdress, putAdress } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ModulesCss/LogIn.module.css";
import { toast } from "react-toastify";

export default function PayForm(data) {
  function validate(input) {
    let errors = {};
    if (!input.street) {
      errors.street = "street required";
    } else if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.street)) {
      errors.street = "Invalid street";
    }
    if (!input.number) {
      errors.number = "number required";
    }
    if (!input.postalCode) {
      errors.postalCode = "postalCode required";
    }

    return errors;
  }
  const [errors, setErrors] = useState({});
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
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.street === '' || input.number === '' || input.postalCode === '') {
      toast.error("Complete de data", {
        position: "top-center",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      postAdress(input, data.user[0].email);
      getPay(
        data.carrito,
        data.user,
        input.street.length && input.number.length && input.postalCode.length
          ? input
          : adress
      );
    }
  }

  function handleSubmitChanged(e) {
    e.preventDefault();
    if (input.street === "" || input.number === "" || input.postalCode === "") {
      toast.error("Complete de data", {
        position: "top-center",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      putAdress(input, data.user[0].email);
      getPay(
        data.carrito,
        data.user,
        input.street.length && input.number.length && input.postalCode.length
          ? input
          : adress
      );
    }
  }

  function handleSubmit2(e) {
    e.preventDefault();
    getPay(
      data.carrito,
      data.user,
      input.street.length && input.number.length && input.postalCode.length
        ? input
        : adress
    );
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

  function alertPutArtwork() {

  }

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
            Do you want us to send the package to this adress? <br />
            {adress.street} {adress.number}
          </h4>
          <div>
            <button
              className={styles.btnBuyAll}
              type="submit"
              onClick={(e) => handleSubmit2(e)}
            >
              Yes
            </button>

            <button className={styles.btnBuyAll} onClick={modalController}>
              No
            </button>
          </div>
          <br></br>
          {open === true ? (
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
                  {errors.street && <p>{errors.street}</p>}
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
                  {errors.number && <p>{errors.number}</p>}
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
                  {errors.postalCode && <p>{errors.postalCode}</p>}
                </div>
              </div>
              <Link>
                <button
                  className={styles.btnReadyChangeAdress}
                  type="submit"
                  onClick={(e) => handleSubmitChanged(e)}
                >
                  Ready
                </button>
              </Link>
            </div>
          ) : null}
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
            <button
              className={styles.btnReadyChangeAdress}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Ready
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
