import React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../hooks/useAPI';
import { useDispatch } from 'react-redux';
import { signInAction } from '../redux/ducks/blogAuth';

export default function SignInSignUpView({ navigation, isSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [login, signup, loading, errorText] = useAuth(
    username,
    password,
    () => {
      // setTimeout(() => {
      dispatch(signInAction());
      // }, 500);

      // Note to self: the setTimeout method gets rid of the warning
      // because it gives time for loading to change the ActivityIndicator
      // before the component unmounts
    }
  );

  function dismissKeyboard() {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  }

  function handleLogin() {
    dismissKeyboard();
    login();
    setUsername('');
    setPassword('');
  }

  function handleSignup() {
    dismissKeyboard();
    signup();
    setUsername('');
    setPassword('');
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isSignIn ? 'Sign in to blog' : 'Register for account'}
        </Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCompleteType='password'
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={isSignIn ? handleLogin : handleSignup}
            style={[
              styles.loginButton,
              { backgroundColor: isSignIn ? 'red' : 'blue' },
            ]}
          >
            <Text style={styles.buttonText}>
              {isSignIn ? 'Log in' : 'Sign up'}
            </Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginBottom: 20, marginLeft: 30 }} />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(isSignIn ? 'SignUp' : 'SignIn');
          }}
        >
          <Text style={styles.switchText}>
            {isSignIn
              ? 'Need an account? Register here'
              : 'Already have an account? Sign in'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: 'blue',
    width: 120,
    alignItems: 'center',
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    height: 40,
  },
  switchText: {
    color: 'blue',
  },
});
