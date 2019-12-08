import CartActionTypes from './cart.types'

const INITIAL_STATE = {
  hidden: true
}

const cartReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type, 'cart')
  switch(action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      {
        console.log('togglecart')
        return {
        ...state,
        hidden: !state.hidden
      }}
    default: 
      return state
  }
}

export default cartReducer
