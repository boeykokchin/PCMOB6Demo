import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AccountScreen from './screens/AccountScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabStack from './components/TabStack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/createStore';
import { signInAction } from './redux/ducks/blogAuth';

const Stack = createStackNavigator();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.auth.signedIn); // before: [] = useState()

  async function loadToken() {
    const token = await AsyncStorage.getItem('token');
    console.log('----- loadToken -----');
    if (token) {
      console.log('Eh! Got token! ' + token);
      dispatch(signInAction()); // before: setSignIn(true)
    } else {
      console.log('Where got token???');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {signedIn ? (
        <TabStack />
      ) : (
        <Stack.Navigator
          mode='modal'
          headerMode='none'
          initialRouteName={signedIn ? 'TabStack' : 'SignIn'}
          screenOptions={{ animationEnabled: false }}
        >
          <Stack.Screen component={SignInScreen} name='SignIn' />
          <Stack.Screen component={SignUpScreen} name='SignUp' />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
