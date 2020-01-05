import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils'

import CurrentUserContext from '../../contexts/current-user/current-user.context'
import { CartContext } from '../../providers/cart/cart.provider'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions'

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = () => {
  const currentUser = useContext(CurrentUserContext)
  const [hidden, setHidden] = useState(true)
  const toggleHidden = () => setHidden(!hidden)

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/shop'>CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' to='/signin' onClick={() => auth.signOutStart()}>
            SIGN OUT
          </OptionLink>
        ) : (
            <OptionLink to='/signin'>SIGN IN</OptionLink>
          )}
        <CartContext.Provider value={{
          hidden: hidden,
          toggleHidden
        }}>
        <CartIcon />
        </CartContext.Provider>
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  )
};

export default Header
