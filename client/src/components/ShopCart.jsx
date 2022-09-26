import { useDispatch, useSelector } from "react-redux";
import { getProductsFromCarritoDB } from "../actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function ShopCart() {
  const user = JSON.parse(localStorage.getItem("user"))
  const carrito = useSelector((state) => state.carrito)
  const dispatch = useDispatch(); 
  

  useEffect(() => {
    dispatch(getProductsFromCarritoDB(user[0].email));
  }, []);

  // if (!state.carrito.length) {
  //   return (
  //     <div>
  //       <Link to="/MainPage">
  //         <button>Back</button>
  //       </Link>
  //       <h1>empty!</h1>
  //     </div>
  //   );
  // }
  return (
    <div>
      <Link to="/MainPage">
        <button>Back</button>
      </Link>
      {carrito.map((element) => {
        return (
          <div key={element.id}>
          
            <br />
            <br />
            <br />
            
            <span>Title: {element.title}</span>
            <br />
            <span>Author: {element.creator}</span>
            <br />
            <span>Price: ${element.price}</span>
            <br />
            <img style={{"width":"10rem"}} src={element.image}></img>
            
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
