import { getProductByName } from "../actions/index"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./ModulesCss/SearchBar.module.css"


const state = {
    product: ""
}

export default function SearchBar(props) {

    const dispatch = useDispatch()




    function subirAlState(event) {
        state.product = event.target.value.toLowerCase()
        console.log(state.product)
    }

    function cons(event) {
        event.preventDefault()
        if (state.product.length > 0) {
            props.handleReset()
            dispatch(getProductByName(state.product))
            document.getElementById("inputDeBusqueda").value = ""
        }
    }

    return (

        <div id='wrap'>
            <form className="search-bar" onSubmit={(event) => { cons(event) }}>
                <input type='text' class="input-searched" placeholder="Search" autoComplete="off" id="inputSearch" onChange={(event) => { subirAlState(event) }} />
                <input id="search_submit" value="Rechercher" type="submit" />
            </form>
        </div>


    )
}






