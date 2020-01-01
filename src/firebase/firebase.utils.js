import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// const config = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// }
const config = {
  apiKey: "AIzaSyA5dbl_RKHp8zY1eMb59Y4H29S_shf24h4",
  authDomain: "crwn-db-fec55.firebaseapp.com",
  databaseURL: "https://crwn-db-fec55.firebaseio.com",
  projectId: "crwn-db-fec55",
  storageBucket: "crwn-db-fec55.appspot.com",
  messagingSenderId: "887996172281",
  appId: "1:887996172281:web:cb36900a2d78a8d6605f28",
  measurementId: "G-Y4KPLDC0GG"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  // const collectionRef = firestore.collection('users')
  const snapShot = await userRef.get()
  // console.log({collection: collectionSnapshot.docs.map(doc => doc.data()) })
  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(e) {
      console.log('error creating user', e.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    console.log(accumulator, 'accumulator')
    return accumulator
  }, {})
}
console.log('login??', process.env)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;
