import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { deleteArtwork, getProducts } from "../actions/index";
import styles from "./ModulesCss/Cards.module.css";
import { Link } from "react-router-dom";
import swal from "sweetalert"

export default function Cards({ data }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteArtwork(e.target.name, user));
    dispatch(getProducts());
  }



  const alertaDeEliminar = (e) => {
    swal({
      title: "Delete",
      text: "Are you sure you want to delete this artwork?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then((respuesta) => {
      if (respuesta) {
        handleDelete(e)
      }
    }
    )
  }

  return (
    <div>

      <div className={styles.card}>
        <div className={styles.allwithoutimage}>
          <Link to={`/Products/${data.id}`}>
            <h3 className={styles.name}>{data.title}</h3>
            <div className={styles.types_container}>
              <h3 className={styles.types}>{data.creator}</h3>
              <h3 className={styles.types}>{`$${data.price}`}</h3>
            </div>
          </Link>

          {user.length ? (
            user[0].role ? (
              <div>

                <button
                  className={styles.buttons}
                  name={data.id}
                  value={data.id}
                  onClick={(event) => {
                    alertaDeEliminar(event);
                  }}
                >
                  Delete
                </button>

                <Link to={`/PutArtwork/${data.id}`}>
                  <button
                    className={styles.buttons}
                  >Modify</button>
                </Link>
              </div>
            ) : null
          ) : null}
        </div>

        <Link to={`/Products/${data.id}`}>
          <img className={styles.img} src={data.image} alt="product_img" />

        </Link>
      </div>
    </div>
  );
}
