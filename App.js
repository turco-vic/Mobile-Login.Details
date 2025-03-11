import React, {useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Início do projeto</Text>
      <StatusBar style="auto" />
    </View>
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
