import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api.js'
import jwtDecode from 'jwt-decode';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            senha : '',
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
        const {visible} = this.state

        return (
            <View style={styles.container}>

                <View style={styles.DivImg}>
                    <Image
                        source={require('../../assets/img/logo-v2.png')}
                        style={styles.ImgLogo}
                    />
                </View>
                <View style={styles.FormLogin}>
                    <View style={styles.InptView}>
                        <TextInput
                            style={styles.inputLogin}
                            placeholderTextColor="#FFF"
                            placeholder='Email'
                            placeholderTextColor='#0B56E3'
                            keyboardType='email-address'
                            onChangeText={email => this.setState({email})}
                        />

                        <TextInput
                            style={styles.inputLogin}
                            placeholder='Password'
                            placeholderTextColor='#0B56E3'
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({senha})}
                        />

                        <TouchableOpacity
                            style={styles.btnLogin}
                            onPress={this.fazerLogin}
                        >
                            <Text style={styles.btnLoginText}>login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    DivImg: {
        backgroundColor: '#0B56E3',
        height: 400,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 3
    },

    ImgLogo: {
        width: 250,
        height: 250
    },

    FormLogin: {
        flex: 2,
        // paddingLeft: 50,
        paddingTop: 40,
        alignItems: 'center'
    },

    inputLogin: {
        borderBottomWidth: 1,
        borderBottomColor: "#0D21FC",
        width: 250,
        marginBottom: 25,
        paddingBottom: 2,
        textAlign: 'center',
        color:"#000"
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 175,
        backgroundColor: '#0B56E3',
        borderColor: '#0B56E3',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 30
    },

    btnLoginText: {
        fontSize: 14,
        color: '#FFF',
        textTransform: 'capitalize'
    },

    InptView: {
        width: 252,
        alignItems: 'center'
    }
});








