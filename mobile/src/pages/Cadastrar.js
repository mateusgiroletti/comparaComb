import React, { Component } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';


export default class Cadastrar extends Component {
    state = {
        nome: '',
        sobrenome: '',
        email: '',
        password: '',
    };
    handleSubmit = async () => {
        const data = new FormData();

        data.append('nome', this.state.nome);
        data.append('sobrenome', this.state.sobrenome);
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        await api.post('users', data);

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
        console.log(AsyncStorage.getItem('@App:token'))
        console.log(AsyncStorage.getItem('@App:user'))

        this.setState({ loggedInUser: user });

        this.props.navigation.navigate('Cadastrar_automovel')

        Alert.alert('Adicione seu veículo');
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
                    placeholder="Sobrenome"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.sobrenome}
                    onChangeText={sobrenome => this.setState({ sobrenome })}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Digite seu email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    style={styles.input}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity style={styles.buttonCadastrar}
                    onPress={this.handleSubmit} >
                    <Text style={styles.buttonText} >Proximo</Text>
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