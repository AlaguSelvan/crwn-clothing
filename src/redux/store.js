import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { fetchCollectionsStart } from './shop/shop.sagas'

import rootReducer from './root-reducer'


const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]


if(process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}


export const store = createStore(rootReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)


sagaMiddleware.run(fetchCollectionsStart)

export default { store, persistor }