

import {DELETE_MEDIUM_FROM_FILTER,ADD_FILTER_MEDIUM,FILTER_BY_MEDIUM,DELETE_PRICE_FROM_FILTER,ADD_PRICE_TYPE,ORDER_BY_PRICE,DELETE_ARTIST_FROM_FILTER,ADD_FILTER_ARTIST,FILTER_BY_ARTIST,GET_ARTISTS,GET_PRODUCTS,SHOW_ALL_PRODUCTS,GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID, CLEAN_PRODUCT_ID, ORDER_BY_LESS_EXPENSIVE, ORDER_BY_MORE_EXPENSIVE} from "../actions/action-types"

const initialState = {
    allProducts : [],
    productsFiltered:[],
    productDetails: [],
    artistsList:[],
    filterArtist:[],
    orderByPrice:[],
    mediums: [],
    filterMediums : []
    
}


export default function Reducer(state = initialState, {type, payload}){
switch (type) {
    case GET_PRODUCTS:{
        return{
            ...state,
            allProducts: payload,
            productsFiltered: payload,
            mediums:payload.map(element => element.medio).filter((item,index)=>payload?.map(element => element.medio).indexOf(item)===index)
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
    
    case ORDER_BY_PRICE:{
        if(payload === "OrderByLessExpensive"){
          return{
            ...state,
            productsFiltered:state.productsFiltered.sort(function(a,b){return Number(a.price) - Number(b.price)})}
         }else{
             return{
                 ...state,
                 productsFiltered:state.productsFiltered.sort(function(a,b){return Number(b.price) - Number(a.price)})
             }
             
         }
    }
    case SHOW_ALL_PRODUCTS:{
        return{
            ...state,
            productsFiltered:state.allProducts
        }
    }
    case GET_ARTISTS:{
        return{
            ...state,
            artistsList:payload
        }
    }
    case FILTER_BY_ARTIST:{
        return{
            ...state,
            productsFiltered:state.productsFiltered.filter(element => element.artist === payload)
        }
    }
    case ADD_FILTER_ARTIST:{
        return{
            ...state,
            filterArtist:[payload]
            
        }
    }
    case DELETE_ARTIST_FROM_FILTER:{
        return{
            ...state,
            productsFiltered:state.allProducts,
            filterArtist:state.filterArtist.filter(element => element !== payload)
        }
    }
    
    case ADD_PRICE_TYPE:{
        return{
            ...state,
            orderByPrice:[payload]
        }
    }

    case DELETE_PRICE_FROM_FILTER:{
        return{
            ...state,
           
           orderByPrice:state.orderByPrice.filter(element => element === payload),
           productsFiltered:state.allProducts,
        }
    }

    case FILTER_BY_MEDIUM:{
        return{
            ...state,
            productsFiltered:state.productsFiltered.filter(element => element.medio === payload)
        }
    }
    case ADD_FILTER_MEDIUM:{
        return{
            ...state,
            filterMediums:[payload]
            
        }
    }
    case DELETE_MEDIUM_FROM_FILTER:{
        return{
            ...state,
            productsFiltered:state.allProducts,
            filterMediums:state.filterMediums.filter(element => element !== payload)
        }
    }
    default:
        return state;
}
}