import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api.js'
import jwtDecode from 'jwt-decode';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            senha : ''
        }
    }

    fazerLogin = async() => {
        console.warn(this.state.email + ' ' + this.state.senha)

        const resposta = await api.post('/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        const token = resposta.data.token;
        console.warn(token)

        await AsyncStorage.setItem('userToken', token)

        console.warn(jwtDecode(token))
        console.warn(jwtDecode(token).role)

        this.props.navigation.navigate('BottomTab')
    }


    render(){
        return (
            <View>
                <TextInput
                placeholder='email'
                placeholderTextColor='black'
                keyboardType='email-address'
                onChangeText={email => this.setState({email})}
                />

                <TextInput
                    placeholder='password'
                    placeholderTextColor='black'
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({senha})}
                />

                <TouchableOpacity
                    onPress={this.fazerLogin}
                >
                    <Text>login</Text>
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
});