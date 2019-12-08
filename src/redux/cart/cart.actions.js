import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => {
  console.log(CartActionTypes.TOGGLE_CART_HIDDEN, 'hit')
  return ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})};
