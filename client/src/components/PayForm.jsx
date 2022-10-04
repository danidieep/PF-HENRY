import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAdress, getPay, postAdress, putAdress } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function PayForm(data) {
  const [adress, setAdress] = useState({
    street: "",
    number: "",
    postalCode: "",
  });

  const [error, setError] = useState({});

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
    setInput(() => {
      const newState = {
        ...input,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState));
      return newState;
    });
  }

  function handleSubmit(e) {
    if (
      input.street.length === 0 ||
      input.number.length === 0 ||
      input.postalCode.length === 0
    ) {
      alertCompleteData();
    } else {
      e.preventDefault();
      postAdress(input, data.user[0].email);
      getPay(data.carrito, data.user);
    }
  }

  function handleSubmit1(e) {
    e.preventDefault();
    postAdress(input, data.user[0].email);
    getPay(data.carrito, data.user);
  }

  function handleSubmitChanged(e) {
    if (
      input.street.length === 0 ||
      input.number.length === 0 ||
      input.postalCode.length === 0
    ) {
      alertCompleteData();
    } else {
      e.preventDefault();
      putAdress(input, data.user[0].email);
      getPay(data.carrito, data.user);
    }
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

  function alertCompleteData() {
    toast.warn(`Complete all the info`, {
      position: "top-center",
      theme: "light",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      {adress.street ? (
        <div key="4">
          <h4>
            Do you want us to send the package to this address? {adress.street}{" "}
            {adress.number}
          </h4>
          <button onClick={modalController}>No</button>
          <br></br>
          {open ? (
            <div key={open}>
              {/* -------------------------   STREET       */}
              <div key="street">
                <label>Street: </label>
                <input
                  type="text"
                  name="street"
                  value={input.street}
                  autoComplete="off"
                  placeholder={"street..."}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              {/* -------------------------   NUMBER       */}
              <div key="number">
                <label>Number: </label>
                <input
                  type="number"
                  name="number"
                  value={input.number}
                  autoComplete="off"
                  placeholder={"number..."}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              {/* -------------------------   POSTAL CODE       */}
              <div key="postalCode">
                <label>PostalCode: </label>
                <input
                  type="number"
                  name="postalCode"
                  value={input.postalCode}
                  autoComplete="off"
                  placeholder={"postalCode..."}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
              </div>
              <button type="submit" onClick={(e) => handleSubmitChanged(e)}>
                Ready
              </button>
            </div>
          ) : (
            <div>
              <button type="submit" onClick={(e) => handleSubmit1(e)}>
                Yes
              </button>
            </div>
          )}
        </div>
      ) : (
        <div key="5">
          {/* -------------------------   STREET       */}
          <div key="street:">
            <label>Street: </label>
            <input
              type="text"
              name="street"
              value={input.street}
              autoComplete="off"
              placeholder={"street..."}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>
          {/* -------------------------   NUMBER       */}
          <div key="number:">
            <label>Number: </label>
            <input
              type="number"
              name="number"
              value={input.number}
              autoComplete="off"
              placeholder={"number..."}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>
          {/* -------------------------   POSTAL CODE       */}
          <div key="postalcode:">
            <label>PostalCode: </label>
            <input
              type="number"
              name="postalCode"
              value={input.postalCode}
              autoComplete="off"
              placeholder={"postalCode..."}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Ready
          </button>
        </div>
      )}
    </div>
  );
}

function validate(input) {
  let error = {};
  if (input.street.length === 0) error.street = "The street is required";
  if (input.number.length === 0) error.number = "The number is required";
  if (input.postalCode.length === 0)
    error.postalCode = "The postal code is required";
  return error;
}
