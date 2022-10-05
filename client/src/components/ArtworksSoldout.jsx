import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../actions";
import style from "./ModulesCss/ArtSold.module.css";

export default function ArtworksSoldout() {
  const dispatch = useDispatch();
  const artworksSolds = useSelector((state) => state.artworksBuyed);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className={style.container}>
      <Link to="/MainPage">
        <div className={style.header}>
          <h1 className={style.logoForm}>Artket</h1>
        </div>
      </Link>
      <div className={style.box}>
        <div>
          <h1 className={style.LoginMsg}>Obras vendidas</h1>
        </div>
        <div className={style.arts_box}>
          {artworksSolds.map((e) => {
            return (
              <div className={style.arts_data}>
                <h6>{e.title}</h6>
                <h6>{e.date}</h6>
                <img className={style.image} src={e.image}></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
