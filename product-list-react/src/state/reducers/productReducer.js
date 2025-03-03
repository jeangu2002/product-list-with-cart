export const productReducer = (state = { products: [], cart: {} }, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: { quantity: action.payload.quantity, price: action.payload.price, image: action.payload.image },
        },
      };
      localStorage.setItem("cart", JSON.stringify(newState.cart));
      return newState;
    case "REMOVE_FROM_CART":
      delete state.cart[action.payload.name];
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return {
        ...state,
        cart: { ...state.cart },
      };
    case "EMPTY_CART":
      localStorage.removeItem("cart");
      return { ...state, cart: {} };
    default:
      return state;
  }
};
