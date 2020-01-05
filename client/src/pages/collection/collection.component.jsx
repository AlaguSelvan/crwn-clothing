import React, { useContext } from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import CollectionsContext from '../../contexts/collections/collections.context'

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({ match }) => {
  const collections = useContext(CollectionsContext)
  const collection = collections[match.params.collectionId]
  const{ title, items } = collection
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage
