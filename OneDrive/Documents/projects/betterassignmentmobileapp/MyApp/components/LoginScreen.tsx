import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginFormProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setStoredEmail: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>; // Add this prop for setting username
};

const CustomCheckbox: React.FC<{ checked: boolean, onPress: () => void }> = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checked]} />
      {checked && <Text style={styles.checkboxText}>✓</Text>}
    </TouchableOpacity>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn, setStoredEmail, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const fetchStoredEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    };
    fetchStoredEmail();
  }, []);

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');
    const storedUsername = await AsyncStorage.getItem('username'); // Retrieve the stored username

    if (email === storedEmail && password === storedPassword) {
      setIsLoggedIn(true);
      setStoredEmail(storedEmail || '');
      setUsername(storedUsername || ''); // Set the username when login is successful

      if (rememberMe) {
        await AsyncStorage.setItem('savedEmail', email);
      } else {
        await AsyncStorage.removeItem('savedEmail');
      }

      Alert.alert('Login Successful!');
    } else {
      Alert.alert('Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
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
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.checkboxRow}>
        <CustomCheckbox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxContainer: { 
    width: 20, 
    height: 20, 
    borderWidth: 2, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10
  },
  checkbox: {
    width: 16, 
    height: 16, 
    backgroundColor: 'white', 
    borderRadius: 4,
    borderWidth: 2,
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  checkboxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
  }
});

export default LoginForm;
