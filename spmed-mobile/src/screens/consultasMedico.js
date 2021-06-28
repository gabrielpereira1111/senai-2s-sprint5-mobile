import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class consultasMedico extends Component {
  render(){
    return (
        <View style={styles.container}>
          <Text>Tela de Consultas - Médico</Text>
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