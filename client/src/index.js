import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { REACT_AUTH0_DOMAIN, REACT_AUTH0_CLIENT_ID } = process.env;

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  
    <Auth0Provider
      domain="dev-5vxlb3fc.us.auth0.com"
      clientId="MK0Fr4yKJD3FDxuR9jiuietNpwjyTl0o"
      redirectUri={window.location.origin}
      audience="unique_identifier"
      scope="openid profile email permissions"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  ,
  document.getElementById("root")
);

reportWebVitals();
