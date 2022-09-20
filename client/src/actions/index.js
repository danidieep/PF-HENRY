import axios from 'axios'

import {
      DELETE_FILTER, ADD_FILTER_MEDIUM, FILTER_BY_MEDIUM, ADD_PRICE_TYPE, ADD_FILTER_ARTIST, FILTER_BY_ARTIST, GET_ARTISTS, GET_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_ID, CLEAN_PRODUCT_ID, SHOW_ALL_PRODUCTS, ORDER_BY_PRICE, NOT_FOUND, ADD_FILTERS,


} from "./action-types.js"



export function getProducts() {
      return async function (dispatch) {
            let json = await axios.get('http://localhost:3001/artworks')
            return dispatch({
                  type: GET_PRODUCTS,
                  payload: json.data
            })
      }

}

export function RegisterUser(payload) {
      return async function (dispatch) {
            let json = await axios.post('http://localhost:3001/user', payload)
            return json
      }
}



export const getProductByName = (payload) => {
      return async function (dispatch) {

            try {
                  let json = await axios.get('http://localhost:3001/artworks?title=' + payload)

                  return dispatch({
                        type: GET_PRODUCT_BY_NAME,
                        payload: json.data
                  })

            } catch (error) {
                  return dispatch({
                        type: NOT_FOUND,
                        payload: error
                  })
            }
      }

}


export const getProductById = (id) => {
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

export const OrderByPrice = (payload) => {
      return {
            type: ORDER_BY_PRICE, payload
      }
}


export const showAllProducts = () => {
      return {
            type: SHOW_ALL_PRODUCTS
      }
}

export const getArtists = () => {
      return async function (dispatch) {
            let json = await axios.get('http://localhost:3001/artists')
            return dispatch({
                  type: GET_ARTISTS,
                  payload: json.data
            })
      }
}

export const filterByArtist = (payload) => {
      return {
            type: FILTER_BY_ARTIST, payload
      }
}

export const addFilterArtist = (payload) => {
      return {
            type: ADD_FILTER_ARTIST, payload
      }
}


export const deletefilter = (payload) => {
      return {
            type: DELETE_FILTER, payload
      }
}

export const addPriceType = (payload) => {
      return {
            type: ADD_PRICE_TYPE, payload
      }
}


export const filterByMedium = (payload) => {
      return {
            type: FILTER_BY_MEDIUM, payload
      }
}

export const addFilterMedium = (payload) => {
      return {
            type: ADD_FILTER_MEDIUM, payload
      }
}




export const AddFilters = (payload) => {
      return {
            type: ADD_FILTERS, payload
      }
}