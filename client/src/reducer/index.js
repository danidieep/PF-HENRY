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
  GET_ALL_USERS,
  SHOW_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  CLEAN_PRODUCT_ID,
  ADD_FILTERS,
  LOG_LOCAL,
  VACIAR_USER,
  FIND_USER_BY_ID,
  SEND_EMAIL,
  DELETE_PRODUCT_FROM_CARRITO_BOARD,
  GET_PRODUCTS_FROM_CARRITODB,
  SET_USER,
  GET_USERS,
  GET_FAVOURITES,
  GET_HISTORY,
  GET_ALL_ORDERS,
  GET_ORDERS_USER,
  GET_ONE_ORDER,
  FILTER_ORDER_REJECTED,
  FILTER_ORDER_APROVED,
  FILTER_ORDER_APROVED_USER,
  FILTER_ORDER_REJECTED_USER,
  GET_ONE_ORDER_USER,
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
  users: [],
  favoritos: [],
  history: [],
  allOrders: [],
  allOrdersFiltered: [],
  getOneOrder: [],
  orderUser: [], //todas las ordenes del uruario
  orderDetail: [],
  orderUserFiltered: [],
  artworksBuyed: [],
  loading: true,
};

export default function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "POST_PAYMENT": {
      return {
        ...state,
      };
    }
    case "POST_CARRITO":
      return {
        ...state,
        carrito: [...state.carrito, payload],
      };

    case GET_ONE_ORDER_USER: {
      return {
        ...state,
        orderDetail: state.orderUser.filter(
          (e) => e.orderId === Number(payload)
        ),
      };
    }

    case FILTER_ORDER_APROVED_USER: {
      return {
        ...state,
        orderUserFiltered: state.orderUser.filter(
          (e) => e.paymentStatus === "approved"
        ),
      };
    }

    case FILTER_ORDER_REJECTED_USER: {
      return {
        ...state,
        orderUserFiltered: state.orderUser.filter(
          (e) => e.paymentStatus === "rejected"
        ),
      };
    }

    case GET_ALL_ORDERS: {
      return {
        ...state,
        allOrders: payload,
        allOrdersFiltered: payload,
      };
    }

    case GET_ORDERS_USER: {
      //todas las ordenes del uruario
      return {
        ...state,
        orderUser: payload,
        orderUserFiltered: payload,
      };
    }
    case GET_PRODUCTS: {
      return {
        ...state,
        allProducts: payload.filter((e) => e.show),
        productsFiltered: payload.filter((e) => e.show),
        artworksBuyed: payload.filter((e) => !e.show),
        loading: false,
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

    case "POST_ARTWORK": {
      return {
        ...state,
      };
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
      localStorage.setItem("product", JSON.stringify(payload));
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
      };
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
        history: payload,
      };
    }

    case GET_ALL_USERS: {
      return {
        ...state,
        users: payload,
      };
    }
    case GET_ONE_ORDER: {
      return {
        ...state,
        getOneOrder: state.allOrders.filter(
          (e) => e.orderId === Number(payload)
        ),
      };
    }
    case FILTER_ORDER_REJECTED: {
      return {
        ...state,
        allOrdersFiltered: state.allOrders.filter(
          (e) => e.paymentStatus === "rejected"
        ),
      };
    }
    case FILTER_ORDER_APROVED: {
      return {
        ...state,
        allOrdersFiltered: state.allOrders.filter(
          (e) => e.paymentStatus === "approved"
        ),
      };
    }
    default:
      return state;
  }
}
