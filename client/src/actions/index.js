import axios from 'axios'
import {GET_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_ID} from "./action-types.js"


export function getProducts(){
      return async function(dispatch) {
            let json = await axios.get('http://localhost:3001/artworks')
            return dispatch ({
                  type: GET_PRODUCTS,
                  payload: json.data
            })
      }

}



export const getProductByName = (payload)=>{
    return async function (dispatch) {
      let json = await axios.get('http://localhost:3001/artworks?title=' + payload)

      return dispatch({
            type: GET_PRODUCT_BY_NAME,
            payload: json.data
      })
    }
            
}


export const getProductById = (id)=>{
    
  
}

export const OrderByLessExpensive = ()=>{

}

export const OrderByMoreExpensive = ()=>{

}

