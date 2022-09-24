import { useDispatch, useSelector } from "react-redux";
import { getProductsFromCarritoDB } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useMemo } from "react";

export default function ShopCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsFromCarritoDB(state.user.id));
  });

  if (!state.carrito.length) {
    return (
      <div>
        <Link to="/MainPage">
          <button>Back</button>
        </Link>
        <h1>empty!</h1>
      </div>
    );
  }
  return (
    <div>
      <Link to="/MainPage">
        <button>Back</button>
      </Link>
      {state.carrito.map((element) => {
        return (
          <div>
            <span>artWork: {element.title}</span>
          </div>
        );
      })}
      <button onClick={() => alert("comprado")}>Buy Now!</button>
    </div>
  );
}

// useMemo(()=>{

//     if(state.carrito.length){
//       localStorage.setItem("cart",JSON.stringify(state.carrito))
//     }
//     if(state.carrito.length===0){

//       if( JSON.parse(localStorage.getItem("cart")===null)){ localStorage.setItem("cart",JSON.stringify([]))}
//       if( JSON.parse(localStorage.getItem("cart").length)){ state.carrito = JSON.parse(localStorage.getItem("cart")) }

//     }

// },[state.carrito])
