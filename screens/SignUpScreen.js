import React from 'react';
import SignInSignUpView from '../components/SignInSignUpView';

export default function SignUpScreen({ navigation }) {
  return <SignInSignUpView navigation={navigation} isSignIn={false} />;
}
