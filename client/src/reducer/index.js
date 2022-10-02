import {
  DELETE_ARTWORKS,
  GET_USER,
  NOT_FOUND,
  FILTER_BY_MEDIUM,
  ORDER_BY_PRICE,
  DELETE_FILTER,
  FILTER_BY_ARTIST,
  GET_ARTISTS,
  GET_PRODUCTS,
  SHOW_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  CLEAN_PRODUCT_ID,
  ADD_FILTERS,
  LOG_LOCAL,
  VACIAR_USER,
  FIND_USER_BY_ID,
  DELETE_PRODUCT_FROM_CARRITO,
  ADD_PRODUCT_TO_CARRITO,
  SEND_EMAIL,
  DELETE_PRODUCT_FROM_CARRITO_BOARD,
  GET_PRODUCTS_FROM_CARRITODB,
  SET_USER,
  GET_USERS,
  GET_FAVOURITES,
  GET_HISTORY,
  GET_ALL_ORDERS,
  GET_ORDERS_USER
} from "../actions/action-types";

const initialState = {
  allProducts: [],
  productsFiltered: [],
  productDetails: [],
  artistsList: [],
  mediums: [],
  notFound: [],
  filters: [],
  carrito: [],
  users: [{email:"luca@gmail"},{email:"luca@gmail"},{email:"luca@gmail"},{email:"luca@gmail"},{email:"luca@gmail"}],
  favoritos: [],
  history: [],
  allOrders:[],
  orderUser:[]
};

export default function Reducer(state = initialState, { type, payload }) {
  switch (type) {

    case 'POST_PAYMENT':{
      return {
        ...state
      }
    }
    case "POST_CARRITO":
      return {
        ...state,
        carrito: [...state.carrito, payload],
      };
      
      case GET_ALL_ORDERS: {
        return {
          ...state,
          orders: payload
        }
      }

      case GET_ORDERS_USER: {
        return{
          ...state,
          orderUser: payload

        }
      }
    case GET_PRODUCTS: {
      return {
        ...state,
        allProducts: payload,
        productsFiltered: payload,
        mediums: payload
          .map((element) => element.medio)
          .filter(
            (item, index) =>
              payload?.map((element) => element.medio).indexOf(item) === index
          ),
      };
    }

    case "POST_USER":
      return {
        ...state,
      };

    case "PUT_ARTWORK":
      return {
        ...state,
      };

    case 'POST_ARTWORK': {
      return {
        ...state
      }
    }

    case DELETE_ARTWORKS:
      return {
        ...state,
        productsFiltered: state.allProducts.filter((e) => e.id !== payload),
      };

    case GET_PRODUCT_BY_NAME: {
      return {
        ...state,
        productsFiltered: payload,
      };
    }
    case GET_PRODUCT_BY_ID: {
      return {
        ...state,
        productDetails: payload,
      };
    }

    case CLEAN_PRODUCT_ID: {
      return {
        ...state,
        productDetails: [],
      };
    }

    case SHOW_ALL_PRODUCTS: {
      return {
        ...state,
        productsFiltered: state.allProducts,
        notFound: [],
        filters: [],
      };
    }
    case GET_ARTISTS: {
      return {
        ...state,
        artistsList: payload,
      };
    }

    case FILTER_BY_ARTIST: {
      return {
        ...state,
        productsFiltered: state.productsFiltered.filter(
          (element) => element.creator === payload
        ),
      };
    }
    case DELETE_FILTER: {
      return {
        ...state,
        productsFiltered: state.allProducts,
        filters: state.filters.filter((element) => element !== payload),
      };
    }

    case ORDER_BY_PRICE: {
      if (payload === "OrderByLessExpensive") {
        return {
          ...state,
          productsFiltered: state.productsFiltered.sort(function (a, b) {
            return Number(a.price) - Number(b.price);
          }),
        };
      } else {
        return {
          ...state,
          productsFiltered: state.productsFiltered.sort(function (a, b) {
            return Number(b.price) - Number(a.price);
          }),
        };
      }
    }

    case FILTER_BY_MEDIUM: {
      return {
        ...state,
        productsFiltered: state.productsFiltered.filter(
          (element) => element.medio === payload
        ),
      };
    }

    case NOT_FOUND: {
      return {
        ...state,
        notFound: payload,
      };
    }

    case ADD_FILTERS: {
      return {
        ...state,
        filters: [...state.filters, payload],
      };
    }

    case GET_USER: {
      localStorage.setItem("user", JSON.stringify([payload]));
    }

    case GET_USERS: {
      return {
        ...state,
        users: payload.data,
      };
    }

    case DELETE_PRODUCT_FROM_CARRITO_BOARD: {
      return {
        ...state,
        carrito: state.carrito.filter(
          (element) => element.title !== payload.title
        ),
      };
    }

    case GET_PRODUCTS_FROM_CARRITODB: {
      return {
        ...state,
        carrito: payload,
      };
    }

    case GET_FAVOURITES: {
      return {
        ...state,
        favoritos: payload,
      }
    }

    case LOG_LOCAL: {
      localStorage.setItem("user", JSON.stringify([payload]));
    }
    case VACIAR_USER: {
      return {
        ...state,
        user: [],
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("user")),
      };
    }

    case FIND_USER_BY_ID: {
      localStorage.setItem("user", JSON.stringify([payload]));
    }

    case SEND_EMAIL: {
      return {
        ...state,
        payload,
      };
    }
    case GET_HISTORY: {
      return {
        ...state,
        history: payload
      }
    }

    default:
      return state;
  }
}
