// import { json } from "express";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister:userRegisterReducer
});

const addCartFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initailState = {
  cart: { cartItems: addCartFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  initailState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
