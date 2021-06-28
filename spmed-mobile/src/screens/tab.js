import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Perfil from './perfil';
import consultasPaciente from './consultasPaciente';
import consultasMedico from './consultasMedico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


const Tab = createBottomTabNavigator()


export default class BottomTab extends Component {
    constructor(props){
        super(props)
        this.state={
            role: ''
        }
    }

    buscarRoleToken = async () => {
        try {
            const valorToken = await AsyncStorage.getItem('userToken')
            console.log(jwtDecode(valorToken))
            this.setState({role: jwtDecode(valorToken).role})
        } catch (error) {
            console.warn(error)
        }
    }

    componentDidMount(){
      this.buscarRoleToken()
    }
    
  render(){
    return (
            <View style={styles.container}> 
              <Tab.Navigator
                initialRouteName="Consultas"
                tabBarOptions={{
                  showLabel:false,
                  activeBackgroundColor:'#0A4ECC',
                  inactiveBackgroundColor: '#0B56E3',
                  activeTintColor: '#FFF',
                  inactiveTintColor: '#FFF',
                  style: {height : 50}
                }}
                screenOptions={({route}) => ({
                  tabBarIcon: () => {
                    if(route.name === "Consultas"){
                      return(
                        <Image
                        source={require('../../assets/img/lista.png')}
                        style={styles.tabBarIcon}
                        />
                      )
                    }

                    if(route.name === "Perfil"){
                      return(
                        <Image
                        source={require('../../assets/img/perfil.png')}
                        style={styles.tabBarIcon}
                       />
                      )
                    }
                  }
                })}
              >
                  <Tab.Screen name="Consultas" component={
                      this.state.role == "2" ? consultasPaciente : consultasMedico
                  }/>
                  <Tab.Screen name="Perfil" component={Perfil}/>
              </Tab.Navigator>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  tabBarIcon: {
    height: 30,
    width: 30
  }
});