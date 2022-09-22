import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import React from "react"
import Loader from "./Loader"
import styles from "./ModulesCss/Cards.module.css"
import { Link } from "react-router-dom"


export default function Cards({ data }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();


export default function Cards({ data }) {
     const state = useSelector(state => state)
     const dispatch = useDispatch()

     console.log(data)
     return (
          <div>



               <div className={styles.card}>
                    <Link to={`/Products/${data.id}`}>
                         <h3 className={styles.name} >{data.title}</h3>
                         <img className={styles.imageCard} src={data.image} alt="product_img" />
                         <div className={styles.types_container}>
                              <h3 className={styles.types}>{data.creator}</h3>
                              <h3 className={styles.types}>{`$${data.price}`}</h3>

                         </div>
                    </Link>
               </div>

          </div>
     )
}

