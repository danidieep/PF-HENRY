import { getProductByName } from "../actions/index"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styles from "./ModulesCss/SearchBar.module.css"
import { AiOutlineSearch } from "react-icons/ai"


const state = {
    product: ""
}

export default function SearchBar(props) {

    const dispatch = useDispatch()




    function subirAlState(event) {
        state.product = event.target.value.toLowerCase()

    }

    function cons(event) {
        event.preventDefault()
        if (state.product.length > 0) {
            props.handleReset()
            dispatch(getProductByName(state.product))

        }
    }

    return (

        <div id='wrap'>
            <form className={styles.SearchBar} onSubmit={(event) => { cons(event) }}>
                <input type='text' className={styles.input} placeholder="Search" autoComplete="off" id="inputSearch" onChange={(event) => { subirAlState(event) }} />
                <button className={styles.input1} type="submit"><AiOutlineSearch /></button>
            </form>
        </div>



    )
}