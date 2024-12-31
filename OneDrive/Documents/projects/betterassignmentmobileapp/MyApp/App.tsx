
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import LoginForm from './components/LoginScreen';
import SignUpForm from './components/SignUpForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and SignUp
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track logged-in state
  const [username, setUsername] = useState(''); // Store the logged-in user's name
  const [storedEmail, setStoredEmail] = useState(''); // For "Remember Me" feature

  useEffect(() => {
    const fetchStoredData = async () => {
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('username');
      if (email) {
        setStoredEmail(email); // Pre-fill email for "Remember Me"
      }
      if (name && isLoggedIn) {
        setUsername(name); // Show the user's name after login
      }
    };

    fetchStoredData();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUsername('');
    Alert.alert('Logged out successfully!');
  };

  return (
    <View style={styles.container}>
      {isSignUp ? (
        <SignUpForm setIsSignUp={setIsSignUp} />
      ) : (
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setStoredEmail={setStoredEmail}
        />
      )}

      <View style={styles.toggleContainer}>
        <Text>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        </Text>
        <Button
          title={isSignUp ? 'Go to Login' : 'Go to Sign Up'}
          onPress={() => setIsSignUp(!isSignUp)}
        />
      </View>

      {isLoggedIn && (
        <View style={styles.loggedInContainer}>
          <Text style={styles.successText}>
            Logged in successfully as {username}!
          </Text>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loggedInContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    color: 'green',
  },
});

export default App;

