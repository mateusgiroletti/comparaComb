import React, { Component } from 'react';
import api from '../services/api';

import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Cadastrar_automovel extends Component {
    state = {
        nome: '',
        tipo: '',
        capacidade_tanque: '',
        consumo_medio: '',
        user_id: '',
    };

    handleSubmit = async () => {
        const data = new FormData();
        const { id } = JSON.parse(await AsyncStorage.getItem('@App:user')) || null;

        data.append('nome', this.state.nome);
        data.append('tipo', this.state.tipo);
        data.append('capacidade_tanque', this.state.capacidade_tanque);
        data.append('consumo_medio', this.state.consumo_medio);
        data.append('user_id', id);
        await api.post('automoveis', data);

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Postos'
                })
            ]
        }))

    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Nome"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.nome}
                    onChangeText={nome => this.setState({ nome })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Tipo"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.tipo}
                    onChangeText={tipo => this.setState({ tipo })}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Capacidade Tanque"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="numeric"
                    value={this.state.capacidade_tanque}
                    onChangeText={capacidade_tanque => this.setState({ capacidade_tanque })}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Consumo Médio"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={consumo_medio => this.setState({ consumo_medio })}
                />
                <TouchableOpacity style={styles.buttonCadastrar}
                    onPress={this.handleSubmit} >
                    <Text style={styles.buttonText} >Cadastrar</Text>
                </TouchableOpacity>
            </View>
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