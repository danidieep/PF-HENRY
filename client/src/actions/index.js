import axios from 'axios'
import {GET_PRODUCTS, GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID, ORDER_BY_LESS_EXPENSIVE,ORDER_BY_MORE_EXPENSIVE} from "./action-types.js"


export function getProducts(){
      return async function(dispatch) {
            let json = await axios.get('http://localhost:3001/artworks')
            return dispatch ({
                  type: GET_PRODUCTS,
                  payload: json.data
            })
      }

}



export const getProductByName = (name)=>{

            
}


export const getProductById = (id)=>{
    
  
}

export const OrderByLessExpensive = ()=>{
      return{
            type:ORDER_BY_LESS_EXPENSIVE
      }
}

export const OrderByMoreExpensive = ()=>{
      return{
            type:ORDER_BY_MORE_EXPENSIVE
      }

}

