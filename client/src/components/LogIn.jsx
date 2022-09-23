import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./ModulesCss/LogIn.module.css";
import { useEffect } from "react";
import { sendUserInfo } from "../actions";
import { useDispatch } from "react-redux";

export default function LogIn() {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  //  async function callProtectedApi() {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     console.log(token, 'token desde el front');
  //     const response = await axios.get("http://localhost:3001/protected", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   // axios
  //   //   .get("http://localhost:3001/protected")
  //   //   .then((response) => console.log(response.data))
  //   //   .catch((err) => console.log(err.message));
  // }

  const logInUser = async () => {
    await loginWithRedirect();
  };

  useEffect(() => {
    try {
      if (user.length !== 0) {
        console.log(user);
        sendUserInfo(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  return !isAuthenticated ? (
    <div>
      <Link to="/Register">
        <button className={styles.login}>Register</button>
      </Link>

      <button className={styles.login} onClick={() => logInUser()}>
        Log In
      </button>
      <ul>
        <li>{/* <button onClick={callApi}>Call API Route</button> */}</li>
        <li>
          {/* <button onClick={callProtectedApi}>Call API Protected Route</button> */}
        </li>
      </ul>
    </div>
  ) : (
    false
  );
}
