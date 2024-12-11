import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
      <WebView source={{ uri: 'https://serene-biscochitos-13ef1c.netlify.app' }} style={{ flex: 1 }} />
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
