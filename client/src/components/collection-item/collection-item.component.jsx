import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { 
  CollectionItemContainer,
  AddButton,
  BackgroundImage,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer
} from './collection-item.styles'
import { CartContext } from '../../providers/cart/cart.provider'

const CollectionItem = ({ item }) => {
  const { addItem } = useContext(CartContext)
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage
        className='image'
        imageUrl={imageUrl}
      />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        onClick={() => addItem(item)}
        inverted
      > 
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
