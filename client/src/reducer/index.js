

import {
    NOT_FOUND, FILTER_BY_MEDIUM, ORDER_BY_PRICE, DELETE_FILTER, FILTER_BY_ARTIST, GET_ARTISTS, GET_PRODUCTS, SHOW_ALL_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_ID, CLEAN_PRODUCT_ID,

    APPLY_FILTERS,
    ADD_FILTERS
} from "../actions/action-types"

const initialState = {
    allProducts: [],
    productsFiltered: [],
    productDetails: [],
    artistsList: [],
    mediums: [],
    notFound: [],
    filters: []

}


export default function Reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                allProducts: payload,
                productsFiltered: payload,
                mediums: payload.map(element => element.medio).filter((item, index) => payload?.map(element => element.medio).indexOf(item) === index)
            }
        }

        case 'POST_USER':
            return {
                ...state
            }

        case GET_PRODUCT_BY_NAME: {

            return {
                ...state,
                productsFiltered: payload,
            }

        }
        case GET_PRODUCT_BY_ID: {

            return {
                ...state,
                productDetails: payload,
            }
        }

        case CLEAN_PRODUCT_ID: {
            return {
                ...state,
                productDetails: []
            }
        }


        case SHOW_ALL_PRODUCTS: {
            return {
                ...state,
                productsFiltered: state.allProducts,
                notFound: [],
                filters: []

            }
        }
        case GET_ARTISTS: {
            return {
                ...state,
                artistsList: payload
            }
        }



        case FILTER_BY_ARTIST: {

            return {
                ...state,
                productsFiltered: state.productsFiltered.filter(element => element.creator === payload)
            }
        }
        case DELETE_FILTER: {
            return {
                ...state,
                productsFiltered: state.allProducts,
                filters: state.filters.filter(element => element !== payload)
            }
        }



        case ORDER_BY_PRICE: {
            if (payload === "OrderByLessExpensive") {
                return {
                    ...state,
                    productsFiltered: state.productsFiltered.sort(function (a, b) { return Number(a.price) - Number(b.price) })
                }
            } else {
                return {
                    ...state,
                    productsFiltered: state.productsFiltered.sort(function (a, b) { return Number(b.price) - Number(a.price) })
                }

            }
        }

        case FILTER_BY_MEDIUM: {


            return {
                ...state,
                productsFiltered: state.productsFiltered.filter(element => element.medio === payload)
            }

        }

        case NOT_FOUND: {
            return {
                ...state,
                notFound: payload
            }
        }

        case ADD_FILTERS: {
            return {
                ...state,
                filters: [...state.filters, payload]

            }
        }
        default:
            return state;
    }
}