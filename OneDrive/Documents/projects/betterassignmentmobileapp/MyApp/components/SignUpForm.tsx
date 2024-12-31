import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpFormProps = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ setIsSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = (password: string) => {
    setPassword(password);

    // Evaluate password strength
    if (password.length === 0) {
      setPasswordStrength('');
    } else if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/\d/)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('All fields are required!');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Username must be at least 3 characters long.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    if (passwordStrength === 'Weak') {
      Alert.alert('Password is too weak! Please use a stronger password.');
      return;
    }

    // Save data to AsyncStorage
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
    await AsyncStorage.setItem('username', username);
    setIsSignUp(false);
    Alert.alert('Signup Successful! Please log in.');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username (min 3 characters)"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        style={styles.input}
      />
      {/* Password Strength Indicator */}
      {password.length > 0 && (
        <Text
          style={[
            styles.passwordStrength,
            passwordStrength === 'Weak'
              ? styles.weak
              : passwordStrength === 'Medium'
              ? styles.medium
              : styles.strong,
          ]}
        >
          {passwordStrength} Password
        </Text>
      )}
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  passwordStrength: { marginVertical: 10, fontSize: 16 },
  weak: { color: 'red' },
  medium: { color: 'orange' },
  strong: { color: 'green' },
});

export default SignUpForm;
