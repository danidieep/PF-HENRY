
import { useDispatch, useSelector } from "react-redux"
import {deleteProductFromCarrito} from "../actions"
import {Link} from "react-router-dom"
import { useEffect } from "react"

export default function ShopCart(){

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(()=>{
        
    })


    if(!state.carrito.length){
        return (<div>
            <Link to="/MainPage"><button>Back</button></Link> 
            <h1>empty!</h1>
               </div>)
    }
    return(
        <div>
             <Link to="/MainPage"><button>Back</button></Link> 
            {state.carrito.map(element => {
                return (
                    <div>
                    <span>artWork: {element}</span>
                    <button
                    onClick={()=>dispatch(deleteProductFromCarrito(element))}
                    >X</button>
               
                  
                    </div>
                )
            })}
                <button onClick={()=> alert("comprado")}>Buy Now!</button>
        </div>
    )
}