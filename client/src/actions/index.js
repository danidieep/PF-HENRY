import axios from 'axios'

import {FILTER_BY_ARTIST,GET_ARTISTS,GET_PRODUCTS, GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID, CLEAN_PRODUCT_ID, ORDER_BY_LESS_EXPENSIVE,ORDER_BY_MORE_EXPENSIVE, SHOW_ALL_PRODUCTS} from "./action-types.js"



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
    return async function (dispatch) {
      let json = await axios.get('http://localhost:3001/artworks/' + id)

      return dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: json.data
      })
    }
  
}

export const cleanProductId = () => {
      return {
          type: CLEAN_PRODUCT_ID
      }
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

export const showAllProducts = ()=>{
      return{
            type:SHOW_ALL_PRODUCTS
      }
}

export const getArtists = ()=>{
      return async function(dispatch) {
            let json = await axios.get('http://localhost:3001/artists')
            return dispatch ({
                  type: GET_ARTISTS,
                  payload: json.data
            })
      }
}

export const filterByArtist = (payload) =>{
      return{
            type:FILTER_BY_ARTIST, payload
      }
} 