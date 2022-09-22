import { useDispatch, useSelector } from "react-redux";
import { getProductById, cleanProductId } from "../actions/index";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import styles from "./ModulesCss/CardsDetails.module.css";
import { useEffect } from "react";

export default function CardDetails(props) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(cleanProductId());
    dispatch(getProductById(id));
  }, []);

  return (
    <div className={styles.container} key={id}>
      <div>
        <Link to="/MainPage">
          <button>Return to main page</button>
        </Link>
      </div>

      <div>
        {product.length > 0 ? (
          <div>
            <h1>{product[0].title}</h1>
            <img
              src={
                product[0].image
                  ? product[0].image
                  : "https://www.elsoldemexico.com.mx/doble-via/zcq7d4-perro.jpg/alternates/LANDSCAPE_768/perro.jpg"
              }
              alt="img not found"
              width="350px"
              height="300px"
            />
            <h3> Created in year: {product[0].date}</h3>

            <h3> Paint ubication: {product[0].collecting_institution}</h3>
            <h3> Artist: {product[0].artist}</h3>
            <h3> {product[0].medio}</h3>
            <h3> Dimensions: {product[0].dimensions}</h3>
            <h3> Price{product[0].price}</h3>
          </div>
        ) : (
          <div>{Loader}</div>
        )}
      </div>
    </div>
  );
}
