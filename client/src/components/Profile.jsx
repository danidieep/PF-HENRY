import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser, findUserById } from "../actions";
<<<<<<< HEAD
import styles from "./ModulesCss/Profile.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



=======
import styles from "./ModulesCss/Profile.module.css";
>>>>>>> 436ca4c341d1482dd02de271110fee87c55554cd

export default function Profile() {
  const data = useAuth0();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const validatorEmail = (valor) => {
    if (
      /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
        valor
      )
    ) {
      return true;
    } else return false;
  };
  const onlyCharacters = /^[a-zA-Z\s]+$/;

  const user = JSON.parse(localStorage.getItem("user"));


  const delete_User = () => {
<<<<<<< HEAD
    localStorage.setItem("user", JSON.stringify([]))
    deleteUser(user[0].id)
    data.logout()
  }

  useEffect(() => {
    console.log(user);
  })

=======
    localStorage.setItem("user", JSON.stringify([]));
    deleteUser(user[0].id);
    data.logout();
  };
>>>>>>> 436ca4c341d1482dd02de271110fee87c55554cd

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    id: user[0].id,
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    if (input.email !== "") {
      if (validatorEmail(input.email)) {
        e.preventDefault();
        dispatch(updateUser(input));
        setTimeout(() => {
          dispatch(findUserById(user[0].id));
        }, 200);

        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        alert("wrong email format");
      }
<<<<<<< HEAD
      else {
        alertWrongEmailFormat()

      }
    }
    else {
=======
    } else {
>>>>>>> 436ca4c341d1482dd02de271110fee87c55554cd
      e.preventDefault();
      dispatch(updateUser(input));
      setTimeout(() => {
        dispatch(findUserById(user[0].id));
      }, 200);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }

<<<<<<< HEAD
  function alertWrongEmailFormat() {
    toast.warning(`Wrong email format`, {
      position: "top-center",
      theme: 'dark',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

=======
>>>>>>> 436ca4c341d1482dd02de271110fee87c55554cd
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        {user.length ? (
          <div>
            <h1>My profile</h1>
            <br />
            <hr />
            <br />
            <br />
<<<<<<< HEAD
            <ToastContainer />
            {data.isAuthenticated ?
              <img className={styles.imgProfile1} src={user[0].picture} width='120' height='120'></img>
              :
              <img className={styles.imgProfile} src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" width='120' height='120' />
            }
=======
            {data.isAuthenticated ? (
              <img
                className={styles.imgProfile1}
                src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                width="120"
                height="120"
              ></img>
            ) : (
              <img
                className={styles.imgProfile}
                src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                width="120"
                height="120"
              />
            )}
>>>>>>> 436ca4c341d1482dd02de271110fee87c55554cd

            {!edit ? (
              <div>
                <h2>
                  {user[0].name} {user[0].lastname}{" "}
                </h2>
                <h2>{user[0].email}</h2>
                <br />

                {data.isAuthenticated ? (
                  <div></div>
                ) : (
                  <button onClick={() => setEdit(!edit)}>edit</button>
                )}
              </div>
            ) : (
              <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <h2>Name: {user[0].name} </h2>
                  <input
                    placeholder="New name..."
                    onChange={(e) => handleChange(e)}
                    name="name"
                  ></input>
                  <h2>LastName: {user[0].lastname}</h2>
                  <input
                    placeholder="new Lastname..."
                    onChange={(e) => handleChange(e)}
                    name="lastname"
                  ></input>
                  <h2>Email: {user[0].email}</h2>
                  <input
                    placeholder="new email..."
                    onChange={(e) => handleChange(e)}
                    name="email"
                  ></input>
                  <h2>Password:</h2>
                  <input
                    type="password"
                    placeholder="new password..."
                    onChange={(e) => handleChange(e)}
                    name="password"
                  ></input>
                  <br></br>
                  <br></br>
                  <button type="submit">save changes</button>
                </form>
                <br></br>
                <button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => delete_User()}
                >
                  Delete user
                </button>
                <br></br>
                <button onClick={() => setEdit(!edit)}>cancel</button>
              </div>
            )}
            <br />
          </div>
        ) : (
          <div>Loading</div>
        )}
        <button
          className={styles.btnHome}
          onClick={() => (window.location.href = "/MainPage")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
