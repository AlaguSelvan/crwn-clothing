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
  const { cartItemsCount } = useContext(CartContext)
  const { toggleHidden } = useContext(CartContext)
  return (
    <CartContainer onClick={toggleHidden}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCountContainer>{cartItemsCount}</ItemCountContainer>
    </CartContainer>
  )
}

export default CartIcon
