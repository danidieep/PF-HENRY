
import {GET_PRODUCTS,GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID, CLEAN_PRODUCT_ID, ORDER_BY_LESS_EXPENSIVE, ORDER_BY_MORE_EXPENSIVE} from "../actions/action-types"

const initialState = {
    allProducts : [],
    productsFiltered:[],
    productDetails: [],
    
}


export default function Reducer(state = initialState, {type, payload}){
switch (type) {
    case GET_PRODUCTS:{
        return{
            ...state,
            allProducts: payload,
            productsFiltered: payload,
        }
    }
    case GET_PRODUCT_BY_NAME:{    

        return{
            ...state,
            productsFiltered: payload,
        }
        
    }
    case GET_PRODUCT_BY_ID:{

        return{
            ...state,
            productDetails: payload,
        }
    }

    case CLEAN_PRODUCT_ID: {
        return{
            ...state,
            productDetails: []
        }  
    }
    
    case ORDER_BY_LESS_EXPENSIVE:{
        return{
            ...state,
            productsFiltered:state.productsFiltered.sort(function(a,b){return Number(a.price) - Number(b.price)})
        }
    }
    case ORDER_BY_MORE_EXPENSIVE:{
        return{
            ...state,
            productsFiltered:state.productsFiltered.sort(function(a,b){return Number(b.price) - Number(a.price)})
        }
    }

    default:
        return state;
}
}