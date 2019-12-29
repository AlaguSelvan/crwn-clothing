import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')
    // fetch('https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/collections')
    //   .then(response => response.json())
    //   .then(collections => {
    //     console.log(collections)
    //   })
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({ isLoading: false })
    })
   }
  render() {
    const { match } = this.props
    const { isLoading } = this.state
    return (
    <div className = 'shop-page' >
        <Route exact path={`${match.path}`} render={(props) => (<CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />)} />
        <Route path={`${match.path}/:collectionId`} render={(props) => (<CollectionPageWithSpinner isLoading={isLoading} {...props}/>) } />
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
