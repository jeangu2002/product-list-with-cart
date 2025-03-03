import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {
    product: {
      products: [],
      cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {},
    },
  },
  applyMiddleware(thunk)
);
