import React from 'react';
import * as firebase from 'firebase';

export default class Phone extends React.Component {
  constructor(props) {
    // Take the default values from the store.
    super(props);
    // firebase.auth().languageCode = 'it';
    /* window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    });

    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          // Error; SMS not sent
          // ...
        });
        */ 

  }
  render() {
    return (
      <div>
        {'We are doing phone authentication'}
      </div>
    );
  }
}