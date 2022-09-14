
import {GET_PRODUCTS,GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID} from "../actions/action-types"

const initialState = {
    allProducts : [],
    productsFiltered:[],
    productDetails:{}
    
}


export default function Reducer(state = initialState, {type, payload}){
switch (type) {
    case GET_PRODUCTS:{
        return{
            ...state,
            allProducts: payload,
            productsFiltered: payload
        }
    }
    case GET_PRODUCT_BY_NAME:{    

        return{
            ...state,
            allProducts: payload,
        }
        
    }
    case GET_PRODUCT_BY_ID:{

        return{
            ...state,
            productDetails: payload,
        }
    }
    

    default:
        return state;
}
}