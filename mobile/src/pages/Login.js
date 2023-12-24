import React, { Component } from 'react';
import api from '../services/api';

import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import { NavigationActions, StackActions } from 'react-navigation';

import logo from '../assets/logo.png'

export default class Cadastrar extends Component {
    state = {
        email: '',
        password: '',
        loggedInUser: null,
    };
    async componentDidMount() {
        const token = await AsyncStorage.getItem('@App:token');
        const user = JSON.parse(await AsyncStorage.getItem('@App:user')) || null;
        console.log(token);
        console.log(user);
        if (token && user) {
            this.setState({ loggedInUser: user });
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Postos'
                    })
                ]
            }))
        }

    }
    handleLogin = async () => {
        const response = await api.post('login', {
            email: this.state.email,
            password: this.state.password
        });

        const { user, token } = response.data;
        console.log(user)
        console.log(token)
        await AsyncStorage.multiSet([
            ['@App:token', token],
            ['@App:user', JSON.stringify(user)],
        ]);



        this.setState({ loggedInUser: user });

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Postos'
                })
            ]
        }))

        Alert.alert('Logado com sucesso!');
        //Alert.alert('Email e senha não cadastrado!');

    }

    handleCadastrar = async () => {
        this.props.navigation.navigate('Cadastrar')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Digite seu email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    keyboardType="email-address"
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                />
                <TouchableOpacity onPress={this.handleLogin} style={styles.buttonLogin}  >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCadastrar}
                    onPress={this.handleCadastrar} >
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