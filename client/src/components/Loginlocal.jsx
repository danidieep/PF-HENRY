import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogLocal } from "../actions/index";

export default function LoginLocal() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(LogLocal(input));
    setInput({
      email: "",
      password: "",
    });

    setTimeout(() => {
      window.location.href = "/MainPage"
   
    }, 300);
    
  }

  return (
    <div>
      <button onClick={() => window.history.back()}> Back</button>

      <h1>Login</h1>

      <form>
        <input
          name="email"
          value={input.email}
          autoComplete="off"
          placeholder="Email..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br></br>
        <input
        type="password"
          name="password"
          value={input.password}
          autoComplete="off"
          placeholder="Password..."
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br></br>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
    </div>
  );
}
