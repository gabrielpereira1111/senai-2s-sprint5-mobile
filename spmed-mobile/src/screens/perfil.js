import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import api from '../services/api';

export default class Perfil extends Component {
  constructor(props){
    super(props)
    this.state={
      role: '',
      email: ''
    }
  }

  buscarUsuario = async () => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken')
      this.setState({
        role: jwtDecode(valorToken).role,
        email: jwtDecode(valorToken).email
      })
    } catch (error) {
      console.warn(error)
    }
  }

  componentDidMount(){
    this.buscarUsuario()
  }

  fazerLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      this.props.navigation.navigate('Login')
      
    } catch (error) {
      console.warn(error)
    }
  }

  render(){
    return (
        <View style={styles.container}>
          <View style={styles.ImgHeaderPerfil}>
            <Image
              source={require('../../assets/img/logo-v1.png')}
              style={styles.ImgLogoPerfil}
            />
          </View>

          <View style={styles.viewImgPerfil}>
            {
              this.state.role === "2" &&
              <Image
                source={require('../../assets/img/paciente.png')}
                style={styles.ImgPerfil}
              />
            }

            {
              this.state.role === "3" &&
              <Image
                source={require('../../assets/img/medico.png')}
                style={styles.ImgPerfil}
              />
            }
          </View>

          <View style={styles.viewEmailPerfil}>
            <Text style={styles.EmailPerfil}>
              {this.state.email}
            </Text>

            <View
              style={styles.mainHeaderLine}
            />
          </View>
            
          <TouchableOpacity
            onPress={this.fazerLogout}
          
          >
            <Image
              source={require('../../assets/img/sign-out.png')}
              style={styles.ImgSignOut}
            />
          </TouchableOpacity>
          

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

  ImgHeaderPerfil:{
    marginBottom: 80,
  },

  ImgLogoPerfil: {
    width: 70,
    height: 70
  },

  ImgPerfil: {
    height: 101,
    width: 83
  },

  viewImgPerfil: {
    marginBottom: 50
  },

  viewEmailPerfil: {
    marginBottom:200,
    textAlign: 'center'
  },

  EmailPerfil: {
    fontSize: 14,
    color: '#0B56E3',
  },

  ImgSignOut: {
    height: 17,
    width: 15,
    marginBottom: 25
  },

  mainHeaderLine: {
    width: 300,
    paddingTop: 5,
    borderBottomColor: '#0B56E3',
    borderBottomWidth: 1
  },
});