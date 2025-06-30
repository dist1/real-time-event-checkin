import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { setAuthToken } from '../graphql/client';
import { Buffer } from 'buffer';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const setToken = useAuthStore((s) => s.setToken);

  const handleLogin = () => {
    const fakeToken = btoa(`${email}:${name}`);
    setToken(fakeToken);
    setAuthToken(fakeToken);
    navigation.navigate('EventList');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 20 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}