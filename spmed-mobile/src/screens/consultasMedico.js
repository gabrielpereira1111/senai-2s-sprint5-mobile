import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class consultasMedico extends Component {
  constructor(props){
    super(props)
    this.state={
      listaConsultas : []
    }
  }

  buscarMinhasConsultas = async() => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken')

      const resposta = await api.get('/consulta/agendamentomedicos', {
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
      'OpenSans-Regular': {
        uri: require('../../assets/fonts/OpenSans-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

      'OpenSans-Light': {
        uri: require('../../assets/fonts/OpenSans-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },

      'OpenSans-Bold': {
        uri: require('../../assets/fonts/OpenSans-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
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
          <Text style={styles.flatItemInfoMedico}>{item.idpacientesNavigation.nome}</Text>
          <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
          <Text style={styles.flatItemInfo}>{item.situacao}</Text>

          <View style={styles.containerDescription}>
            <Text style={styles.description}>{item.descricao}</Text>
          </View>

        
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
    marginTop: 25
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
    fontFamily: 'OpenSans-Bold'
  },

  flatItemContainer: {
    borderColor: '#0B56E3',
    borderWidth: 1,
    marginTop: 20,
    width: 300,
    height: 85,
    paddingLeft: 10,
  },

  flatItemInfoMedico: {
    color: '#0B56E3',
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'OpenSans-Bold'
  },

  flatItemInfo: {
    color: '#0B56E3',
    fontFamily: 'OpenSans-Light',
    width: 90
  },

  body: {
    flex: 4
  },

  containerDescription: {
     backgroundColor: '#0B56E3',
    marginLeft: 105,
    marginTop: -66,
    height: 85,
    paddingLeft: 5,
    paddingTop: 5
  },

  description: {
    color: 'white',
    fontSize: 12
  }
});