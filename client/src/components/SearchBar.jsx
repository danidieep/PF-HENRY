import {getProductByName} from "../actions/index"
import { useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import styles from "./ModulesCss/SearchBar.module.css"


const state = {
    product : ""
}

export default function SearchBar(props){

    const dispatch = useDispatch()

 


    function subirAlState(event){
        state.product = event.target.value.toLowerCase()
        console.log(state.product)
    }

    function cons(event){
        event.preventDefault()
        if(state.product.length>0){
        props.handleReset()
        dispatch(getProductByName(state.product)) 
        document.getElementById("inputDeBusqueda").value=""
      }
    }

    return(
       
          <div className={styles.searchBar}>
           <form onSubmit={(event)=>{cons(event)}}>
            
            
             <input   autoComplete="off" id="inputDeBusqueda" onChange={(event) => {subirAlState(event)}} className={styles.input}/>
             <button className={styles.buttons} type="submit">Search</button>

          </form>
          </div>    
         
       
    )
}






