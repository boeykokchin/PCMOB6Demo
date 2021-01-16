import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUsername } from '../hooks/useAPI';
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../redux/ducks/blogAuth';
import { toggleDarkMode } from '../redux/ducks/accountPrefs';

export default function AccountScreen({ navigation }) {
  const [username, loading, error, refresh] = useUsername();
  const dispatch = useDispatch();
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);

  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]); // monitor the error state variable

  useEffect(() => {
    console.log('Setting up navlistener');
    const removeListener = navigation.addListener('focus', () => {
      refresh(true);
    });
    return removeListener;
  }, []); // run this once on start

  function signOut() {
    AsyncStorage.removeItem('token');
    dispatch(signOutAction());
  }

  return (
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: 'black' },
      ]}
    >
      <Text style={isDarkModeOn && { color: 'white' }}>Account Screen</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={isDarkModeOn && { color: 'white' }}>{username}</Text>
      )}
      <Switch
        value={isDarkModeOn}
        onValueChange={() => dispatch(toggleDarkMode())}
      />
      <Button title='Sign out' onPress={signOut} />
    </View>
  );
}
