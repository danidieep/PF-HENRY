import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser, findUserById } from "../actions";
import styles from "./ModulesCss/Profile.module.css";
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

  return (
    <div className={styles.profileContainer}>
      {user.length ? (
        <div>
          <div className={styles.header}>
            <Link to="/MainPage">
              <h1 className={styles.logoForm}>Arteck</h1>
            </Link>
          </div>
          <div className={styles.profile}>
            <div className={styles.panelLeft}>
              <Link to="/OrderByUser">
                <body>
                  <BsBagCheck className={styles.iconsLeft} /> My buys
                </body>
              </Link>
              <hr style={{ width: "12rem", marginLeft: "1rem" }} />
              <Link to="/ShopCart">
                <body>
                  <AiOutlineShoppingCart className={styles.iconsLeft} /> Cart
                </body>
              </Link>
              <hr style={{ width: "12rem", marginLeft: "1rem" }} />
              <Link to="/Favourites">
                {" "}
                <body>
                  <GrFavorite className={styles.iconsLeft} /> Favourites
                </body>
              </Link>
              <hr style={{ width: "12rem", marginLeft: "1rem" }} />
            </div>

            {user.length ? (
              <div className={styles.panelRight}>
                <div className={styles.userData}>
                  {data.isAuthenticated && user[0].image === "" ? (
                    <img
                      style={{
                        borderRadius: "9999px",
                        marginLeft: "2rem",
                        marginTop: "0.25rem",
                      }}
                      className={styles.imgProfile1}
                      src={data.user.picture}
                      width="120"
                      height="120"
                    ></img>
                  ) : user.length && user[0].image !== null ? (
                    <img
                      className={styles.imgProfile}
                      // src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                      src={user[0].image}
                      width="120"
                      height="120"
                      style={{
                        borderRadius: "9999px",
                        marginLeft: "2rem",
                        marginTop: "0.25rem",
                      }}
                    />
                  ) : user.length ? (
                    <h1 className={styles.iconUser}>
                      <FaUserCircle />
                    </h1>
                  ) : (
                    false
                  )}

                  <div className={styles.nameAndRol}>
                    <div className={styles.name}>
                      <h1>
                        {user[0].name} {user[0].lastname}{" "}
                      </h1>
                    </div>
                    <div className={styles.rol}>
                      {user[0].role === true ? <h3>Admin</h3> : <h3>User</h3>}
                    </div>

                    {/* {data.isAuthenticated ? (
                  <div></div>
                ) : (
                  <button onClick={() => setEdit(!edit)}>edit</button>
                )} */}
                  </div>
                </div>

                <div className={styles.optionsUser}>
                  <div className={styles.item}>
                    <Link to="/ProfileEdit">
                      <div className={styles.item_data}>
                        <BiUserCircle className={styles.item_data_icon} />
                        <div className={styles.item_data_titles}>
                          <body className={styles.item_data_titles_main}>
                            Personal information
                          </body>
                          <body className={styles.item_data_titles_sub}>
                            Manage your personal data.
                          </body>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <hr />
                  <div className={styles.item}>
                    <Link to="Security">
                      <div className={styles.item_data}>
                        <BiShield className={styles.item_data_icon} />
                        <div className={styles.item_data_titles}>
                          <body className={styles.item_data_titles_main}>
                            {" "}
                            Security
                          </body>
                          <body className={styles.item_data_titles_sub}>
                            Set up your account security.
                          </body>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <hr />
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <div className={styles.item} onClick={delete_User}>
                      <div className={styles.item_data}>
                        <BiUserCircle
                          className={styles.item_data_icon}
                          style={{ color: "red" }}
                        />
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <body
                            className={styles.item_data_titles_main}
                            style={{ color: "red" }}
                          >
                            {" "}
                            Disable my account
                          </body>
                        </div>
                      </div>
                    </div>
                  </button>
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
              false
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "47rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "40rem",
              height: "20rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "1rem",
            }}
          >
            <div>
              <h1 style={{ color: "red" }}>Your user has been banned</h1>
              <br />
              <br />
              <Link to="/">
                <h4 style={{ color: "black" }}>Click here to return</h4>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
