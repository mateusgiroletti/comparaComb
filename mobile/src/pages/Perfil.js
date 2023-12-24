import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Perfil extends Component {

  logout = async () => {
    await AsyncStorage.clear();

    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login'
        })
      ]
    }))

  }

  cadastrar_automovel = async () => {
    this.props.navigation.navigate('Cadastrar_automovel');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout} style={styles.buttonLogin}  >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logout} style={styles.buttonLogin}  >
          <Text style={styles.buttonText}>Editar Veículo</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15,

  },

  buttonLogin: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#0093c0',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonCadastrar: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#0093c0',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }

});