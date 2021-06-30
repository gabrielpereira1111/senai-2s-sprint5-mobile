import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import api from '../services/api';
import  * as Font from 'expo-font'

export default class consultasPaciente extends Component {
  constructor(props){
    super(props)
    this.state={
      listaConsultas : []
    }
  }

  buscarMinhasConsultas = async() => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken')

      const resposta = await api.get('/consulta/consultapaciente', {
        headers: {
          'Authorization' : 'Bearer ' + valorToken
        }
      })

      this.setState({
        listaConsultas : resposta.data
      })
      
    } catch (error) {
      console.warn(error)
    }
  }

  componentDidMount(){
    this.buscarMinhasConsultas()
    console.warn(this.state.listaConsultas)
  }

  async loadFonts(){
    await Font.loadAsync({
      'Roboto-Regular': {
        uri: require('../../assets/fonts/Roboto-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

      'Roboto-Light': {
        uri: require('../../assets/fonts/Roboto-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

      'Roboto-Thin': {
        uri: require('../../assets/fonts/Roboto-Thin.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

      'Roboto-Medium': {
        uri: require('../../assets/fonts/Roboto-Medium.ttf'),
        display: Font.FontDisplay.FALLBACK,
      }
    })
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

          <View style={styles.ConsultasPacientes}>
            <Text style={styles.tituloCP}> Suas Consultas </Text>
            <View
              style={styles.mainHeaderLine}
            />
          </View>

          <View style={styles.body}>
            <FlatList
              contentContainerStyle={styles.bodyContent}
              data={this.state.listaConsultas}
              keyExtractor={item => item.idconsultas}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
  }

  renderItem = ({item}) => (
    <View style={styles.flatItemRow}>
      <View style={styles.flatItemContainer}>
        <Text style={styles.flatItemInfoMedico}>{item.idmedicosNavigation.nome}</Text>
        <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
        <Text style={styles.flatItemInfo}>{item.situacao}</Text>
      </View>
    </View>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ImgHeaderPerfil:{
    marginBottom: 50,
  },

  ImgLogoPerfil: {
    width: 70,
    height: 70
  },

  mainHeaderLine: {
    width: 200,
    paddingTop: 5,
    borderBottomColor: '#0B56E3',
    borderBottomWidth: 1
  },

  ConsultasPacientes: {
    textAlign: 'center'
  },

  tituloCP: {
    color: '#0B56E3',
    fontSize: 17,
  },

  flatItemContainer: {
    borderColor: '#0B56E3',
    borderWidth: 1,
    marginTop: 20,
    width: 300,
    height: 85,
    paddingLeft: 10
  },

  flatItemInfoMedico: {
    color: '#0B56E3',
    fontSize: 25,
    marginBottom: 5,
  },

  flatItemInfo: {
    color: '#0B56E3'
  }
});