import { Link } from "react-router-dom";
import { getBuyHistory } from "../actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ModulesCss/AdminPanel.module.css";

export default function AdminPanel() {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getBuyHistory());
  }, []);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {user.length ? (
        user[0].role ? (
          <div className={styles.container}>
            <h1>Admin panel</h1>
            <div className={styles.container_cosas}>
              <div className={styles.buttonsBox}>
                <div>
                  <Link to="/Users">
                    <button className={styles.buttons}>Manage users</button>
                  </Link>
                </div>
                <div>
                  <Link to="/PostArtwork">
                    <button className={styles.buttons}>Create Artwork</button>
                  </Link>
                </div>
                <div>
                  <Link to="/PostArtist">
                    <button className={styles.buttons}>Create artist</button>
                  </Link>
                </div>
                <div>
                  <Link to="/AllUserOrders">
                    <button className={styles.buttons}>All orders</button>
                  </Link>
                </div>
                <div>
                  <Link to="/ArtworksSoldout">
                    <button className={styles.buttons}>Artworks Sold Out</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
