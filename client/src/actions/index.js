import axios from "axios";
import {
  VACIAR_USER,
  LOG_LOCAL,
  GET_PRODUCTS_FROM_CARRITODB,
  DELETE_FILTER,
  NOT_FOUND,
} from "./action-types.js";
import {
  GET_USER,
  DELETE_ARTWORKS,
  ADD_FILTER_MEDIUM,
  FILTER_BY_MEDIUM,
  ADD_PRICE_TYPE,
  ADD_FILTER_ARTIST,
  FILTER_BY_ARTIST,
  GET_ARTISTS,
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  CLEAN_PRODUCT_ID,
  SHOW_ALL_PRODUCTS,
  ORDER_BY_PRICE,
  ADD_FILTERS,
} from "./action-types.js";

export function deleteArtwork(id) {
  return async function (dispatch) {
    let json = await axios.put("artworks/delete/" + id);

    return dispatch({
      type: DELETE_ARTWORKS,
      payload: json.data,
    });
  };
}
export function putArtwork(payload) {
  return async function (dispatch) {
    let json = await axios.put("/artworks/" + payload.id, payload);
    return json;
  };
}

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("/artworks");
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}

export const RegisterUser = async (payload) => {
  await axios.post("/users", payload);
};

export const getProductByName = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.get("/artworks?title=" + payload);

      return dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: NOT_FOUND,
        payload: error,
      });
    }
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    let json = await axios.get("/artworks/" + id);

    return dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: json.data,
    });
  };
};

export const cleanProductId = () => {
  return {
    type: CLEAN_PRODUCT_ID,
  };
};

export const OrderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
};

export const showAllProducts = () => {
  return {
    type: SHOW_ALL_PRODUCTS,
  };
};

export const getArtists = () => {
  return async function (dispatch) {
    let json = await axios.get("/artists");
    return dispatch({
      type: GET_ARTISTS,
      payload: json.data,
    });
  };
};

export const filterByArtist = (payload) => {
  return {
    type: FILTER_BY_ARTIST,
    payload,
  };
};

export const addFilterArtist = (payload) => {
  return {
    type: ADD_FILTER_ARTIST,
    payload,
  };
};

export const deletefilter = (payload) => {
  return {
    type: DELETE_FILTER,
    payload,
  };
};

export const addPriceType = (payload) => {
  return {
    type: ADD_PRICE_TYPE,
    payload,
  };
};

export const filterByMedium = (payload) => {
  return {
    type: FILTER_BY_MEDIUM,
    payload,
  };
};

export const addFilterMedium = (payload) => {
  return {
    type: ADD_FILTER_MEDIUM,
    payload,
  };
};

export const AddFilters = (payload) => {
  return {
    type: ADD_FILTERS,
    payload,
  };
};

// export const deleteProductFromCarrito = (payload) => {
//   return async function () {
//     let json = await axios.put("/cart/" + payload);
//     return json;
//   };
// };

export const deleteProductFromCarrito = async (payload) => {
  let json = await axios.put("/cart/" + payload);
};

export const addProductToCarrito = async (payload) => {
  axios.post(`/cart/${payload.artId}`, { email: payload.email });
};

export const getUser = (payload) => {
  return async function (dispatch) {
    let json = await axios.post(`/users/findorcreate`, payload);
    return dispatch({
      type: GET_USER,
      payload: json.data,
    });
  };
};

export const sendUserInfo = async (user) => {
  const response = await axios.post("/users", {
    headers: {
      user: user,
    },
  });
};

export function deleteUser(userId) {
  axios.delete(`users/${userId}`);
}

export const getProductsFromCarritoDB = (payload) => {
  return async function (dispatch) {
    let json = await axios.get("/cart", {
      headers: {
        payload: payload,
      },
    });
    return dispatch({
      type: GET_PRODUCTS_FROM_CARRITODB,
      payload: json.data,
    });
  };
};

export const LogLocal = (payload) => {
  return async function (dispatch) {
    let json = await axios.post(`/users/findLocalUser`, payload);
    return dispatch({
      type: LOG_LOCAL,
      payload: json.data,
    });
  };
};

export const vaciarUser = () => {
  return {
    type: VACIAR_USER,
  };
};
