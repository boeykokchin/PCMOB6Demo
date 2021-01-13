import React from 'react';
import SignInSignUpView from '../components/SignInSignUpView';

export default function SignInScreen({ navigation }) {
  return <SignInSignUpView navigation={navigation} isSignIn={true} />;
}
