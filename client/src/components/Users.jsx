import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  RegisterUserFromAdminPanel,
  banUser,
  madeAdminUser,
  resetPassword,
  deleteUser,
} from "../actions";
import styles from "./ModulesCss/users.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { FaUserCircle } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BiShield } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export default function Users() {
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
    alertaDeEliminar();
  };

  const alertaDeEliminar = () => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete your profile?",
      icon: "warning",
      buttons: ["Cancel", "Accept"],
    }).then((respuesta) => {
      if (respuesta) {
        localStorage.setItem("user", JSON.stringify([]));
        deleteUser(user[0].id);
        data.logout();
      }
    });
  };

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    dateBorn: "",
  });

  function handleChange(e) {
    if (
      (e.target.name === "name" && onlyCharacters.test(e.target.value)) ||
      e.target.value === ""
    )
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    if (
      (e.target.name === "lastname" && onlyCharacters.test(e.target.value)) ||
      e.target.value === ""
    )
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    if (e.target.name === "email") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "password") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "dateBorn") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  }

  function alertCompleteData() {
    toast.warn(`Complete all the info`, {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertWorngEmailFormat() {
    toast.warn(`Wrong email format`, {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validatorEmail(input.email)) {
      if (
        input.name.length > 0 &&
        input.lastname.length > 0 &&
        input.password.length > 0 &&
        input.dateBorn.length > 0
      ) {
        RegisterUserFromAdminPanel(input);

        setInput({
          name: "",
          lastname: "",
          email: "",
          password: "",
          dateBorn: "",
        });
      } else {
        console.log("a");
      }
    } else if (input.email.length === 0) {
      alertCompleteData();
    } else {
      alertWorngEmailFormat();
    }
  }

  return (
    <div className={styles.profileContainer}>
      <Link to="/MainPage">
        <div className={styles.header}>
          <h1 className={styles.logoForm}>Arteck</h1>
        </div>
      </Link>
      <div className={styles.profile}>
        <div className={styles.panelLeft}>
          <div className={styles.containerRegister}>
            <div className={styles.formContainer}>
              <h2 className={styles.LoginMsg}>Create user!</h2>

              <form>
                <div className={styles.optForm}>
                  <input
                    name="name"
                    value={input.name}
                    autoComplete="off"
                    placeholder="Name..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {/* {errors.name && (
<p className={s.errors} >{errors.name}</p>
)} */}
                </div>

                <div className={styles.optForm}>
                  <input
                    name="lastname"
                    value={input.lastname}
                    autoComplete="off"
                    placeholder="LastName..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {/* {errors.name && (
<p className={s.errors} >{errors.name}</p>
)} */}
                </div>

                <div className={styles.optForm}>
                  <input
                    name="email"
                    value={input.email}
                    autoComplete="off"
                    placeholder="Email..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {/* {errors.name && (
<p className={s.errors} >{errors.name}</p>
)} */}
                </div>

                <div className={styles.optForm}>
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
                  {/* {errors.name && (
<p className={s.errors} >{errors.name}</p>
)} */}
                </div>

                <div className={styles.optForm}>
                  <input
                    type="date"
                    name="dateBorn"
                    value={input.dateBorn}
                    autoComplete="off"
                    placeholder="Date of Birth..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                  {/* {errors.released && (
<p className={s.errors} >{errors.released}</p>
)}  */}
                </div>
                <div className={styles.buttonRegisterPos}>
                  <button
                    className={styles.buttonRegister}
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Create user
                  </button>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>

        {user.length ? (
          <div className={styles.panelRight}>
            <div className={styles.optionsUser}>
              {state.users.map((e) => {
                return (
                  <div>
                    <hr />
                    <div className={styles.item}>
                      <h1>user : {e.email}</h1>
                      <button className={styles.buttonRegister}>Delete</button>
                      <button className={styles.buttonRegister}>
                        Made admin
                      </button>
                      <button className={styles.buttonRegister}>
                        Restore Password
                      </button>
                      <button className={styles.buttonRegister}>
                        Ban user
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}

              <button
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              ></button>
            </div>

            {/* {!edit ? (
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
                  <h2>Image: {user[0].image}</h2>
                  <input type='file' name="file" onChange={e => { uploadImage(e) }} />


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
                  onClick={() => alertaDeEliminar()}
                >
                  Delete user
                </button>
                <br></br>
                <button onClick={() => setEdit(!edit)}>cancel</button>
              </div>
            )} */}
            <br />
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteUser,
//   getUSers,
// } from "../actions";
// import styles from "./ModulesCss/users.module.css"
// import { Link } from "react-router-dom";

// export default function Users() {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     dispatch(getUSers({ role: user[0].role }));
//   }, []);

//   const delete_User = (user, ban) => {
//     deleteUser(user.value, ban);
//     setTimeout(() => {
//       window.location.reload();
//     }, 300);
//   };

//   return (
//     <div>
//        <div className={styles.header}>
//         <Link to="/MainPage">
//           <h1 className={styles.logoForm}>Arteck</h1>
//         </Link>
//       </div>

//       <button
//         onClick={() => {
//           window.location.href = "/MainPage";
//         }}
//       >
//         Back
//       </button>
//       {users.map((el) =>
//         el.role === false ? (
//           <div key={el.id}>
//             <h2>{el.name}</h2>
//             <h2>{el.lastname}</h2>
//             <h5>{el.email}</h5>
//             <h5>{el.dateBorn}</h5>
//             {el.ban === true ? <h6>Usuario banneado</h6> : <h6>Usuario disponible</h6>}
//             <button onClick={(e) => delete_User(e.target, el.ban)} value={el.id}>
//               {el.ban === true ? 'Desbanear' : 'Banear'}
//             </button>
//           </div>
//         ) : null
//       )}
//     </div>
//   );
// }
