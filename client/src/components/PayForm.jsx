import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAdress, getPay, postAdress, putAdress } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
    getPay(data.carrito, data.user);
  }

  function handleSubmitChanged(e) {
    e.preventDefault();
    putAdress(input, data.user[0].email);
    getPay(data.carrito, data.user);
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
            Do you want us to send the package to this address? {adress.street}{" "}
            {adress.number}
          </h4>
          <button onClick={modalController}>No</button>
          <br></br>
          {open ? (
            <div key={open}>
              {/* -------------------------   STREET       */}
              <div>
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
              <div>
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
              <div>
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
              <Link>
                <button type="submit" onClick={(e) => handleSubmitChanged(e)}>
                  Ready
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Yes
              </button>
            </div>
          )
          }
        </div>
      ) : (
        <div key={adress.street}>
          {/* -------------------------   STREET       */}
          <div>
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
          <div>
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
          <div>
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
          <Link>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Ready
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
