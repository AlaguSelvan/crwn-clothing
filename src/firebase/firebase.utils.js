import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyA5dbl_RKHp8zY1eMb59Y4H29S_shf24h4',
  authDomain: 'crwn-db-fec55.firebaseapp.com',
  databaseURL: 'https://crwn-db-fec55.firebaseio.com',
  projectId: 'crwn-db-fec55',
  storageBucket: 'crwn-db-fec55.appspot.com',
  messagingSenderId: '887996172281',
  appId: '1:887996172281:web:cb36900a2d78a8d6605f28',
  measurementId: 'G-Y4KPLDC0GG'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
