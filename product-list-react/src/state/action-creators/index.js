const loadProducts = (products) => {
  return (dispatch) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };
};

const addToCart = (product) => {
  return (dispatch) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
};

const removeFromCart = (name) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { name } });
  };
};

const emptyCart = () => {
  return (dispatch) => {
    dispatch({ type: "EMPTY_CART" });
  };
};

export default { addToCart, loadProducts, removeFromCart, emptyCart };
