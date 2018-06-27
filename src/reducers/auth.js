// import * as admin from 'firebase-admin';
// import * as serviceAccount from '../firebase/serviceAccountKey.json';

// admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  databaseURL: 'https://quiz-a837c.firebaseio.com'
// });

export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      /* admin.auth().getUser(action.uid).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully fetched user data:', userRecord.toJSON());
      }).catch((error) => {
        console.log('Error fetching user data:', error);
      }); */
      return {
        uid: action.uid
      };
    case 'SKIPLOGIN':
      return {
        uid: 1001
      };
    case 'LOGOUT':
      return {};
    case 'ERROR':
      return{error: action.error_message};
    default:
      return state;
  }
};
//  Only two actions have been defined. The other two actions, i.e., startlogin and startLogout will be dealt through default case, i.e., the state of the store will remain same.  