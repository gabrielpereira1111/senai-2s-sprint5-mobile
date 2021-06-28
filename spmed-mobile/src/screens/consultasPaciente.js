import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class consultasPaciente extends Component {
  render(){
    return (
        <View style={styles.container}>
          <Text>Tela de consultas - Paciente</Text>
          <StatusBar style="auto" />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});