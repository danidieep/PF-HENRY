
import { useDispatch, useSelector } from "react-redux"
import {deleteProductFromCarritoBoard} from "../actions"
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
             <h1>Cashito de compras</h1>
            {state.carrito.map(element => {
                
                return (
                    <div>

                    <button
                    onClick={()=>dispatch(deleteProductFromCarritoBoard(element))}
                    >X</button>

                     <span>artWork: {element.title}</span>

                    <img src={element.image ? element.image : "https://www.elsoldemexico.com.mx/doble-via/zcq7d4-perro.jpg/alternates/LANDSCAPE_768/perro.jpg"} alt="img not found" width="450px" height="400px" />
                   
                    <h3>{element.price}</h3>
                    <br/>
               
                    </div>
                )
            })}
                <button onClick={()=> alert("comprado")}>Buy Now!</button>
        </div>
    )
}