import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import {
  CartContainer,
  ItemCountContainer,
  ShoppingIcon
} from './cart-icon.styles'
import { CartContext } from '../../providers/cart/cart.provider'

const CartIcon = ({ itemCount }) => {
  const { toggleHidden } = useContext(CartContext)
  const { hidden } = useContext(CartContext)
  return (
    <CartContainer onClick={toggleHidden}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  )
}

const mapStateToProps = (state) => {
  return ({
    itemCount: selectCartItemsCount(state)}) 
}

export default connect(
  mapStateToProps
)(CartIcon)
