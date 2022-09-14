import { useDispatch, useSelector } from "react-redux"
import {getProductById} from "../actions/index"
import React from "react"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import Message from "./Message"
import styles from "./ModulesCss/CardsDetails.module.css"




export default function CardDetails(props){

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    


    
    React.useEffect(()=>{
        
        },[])

     
    



        

    return(

        <div className={styles.container}>   
            <div>
              <div>
                <Link to="/MainPage">
                 <button>
                    Return to main page
                </button>
              </Link>
            </div>
           <div className={styles.body}>
            </div>
              <div className={styles.footer}>
                </div>
               </div>
       </div>
      )
    }