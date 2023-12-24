import React, { Component } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Cadastrar_posto extends Component {
    state = {
        nome: '',
        bandeira: '',
        localizacao_latitude: '',
        localizacao_longitude: '',
        aprovado: '',
        combustivel_preco_gasolina_comum: '',
        combustivel_preco_gasolina_aditivada: '',
        combustivel_preco_diesel_comum: '',
        combustivel_preco_diesel_s10: '',
        combustivel_preco_etanol: '',
        combustivel_preco_gas_gnv: '',
        user_id: '',
    };

    handleSubmit = async () => {
        let localizacao_latitude_posto;
        let localizacao_longitude_posto;

        if (this.props.navigation.state.params.localizacao.length != 0) {
            const { localizacao } = this.props.navigation.state.params;
            localizacao_latitude_posto = localizacao[0].latitude;
            localizacao_longitude_posto = localizacao[0].longitude;
        } else {
            const { localizacao_informacao } = this.props.navigation.state.params;
            localizacao_latitude_posto = localizacao_informacao[0].latitude;
            localizacao_longitude_posto = localizacao_informacao[0].longitude;
        }
        const { id } = JSON.parse(await AsyncStorage.getItem('@App:user')) || null;
        this.setState({ user_id: id })

        const data = new FormData();

        data.append('nome', this.state.nome);
        data.append('bandeira', this.state.bandeira);
        data.append('combustivel_gasolina_comum', this.state.combustivel_preco_gasolina_comum.replace(',', '.'));
        data.append('combustivel_gasolina_aditivada', this.state.combustivel_preco_gasolina_aditivada.replace(',', '.'));
        data.append('combustivel_diesil_comum', this.state.combustivel_preco_diesel_comum.replace(',', '.'));
        data.append('combustivel_diesil_s10', this.state.combustivel_preco_diesel_s10.replace(',', '.'));
        data.append('combustivel_etanol', this.state.combustivel_preco_etanol.replace(',', '.'));
        data.append('combustivel_gas_gnv', this.state.combustivel_preco_gas_gnv.replace(',', '.'));
        data.append('localizacao_latitude', localizacao_latitude_posto);
        data.append('localizacao_longitude', localizacao_longitude_posto);
        data.append('aprovado', 0);
        data.append('user_id', this.state.user_id);
        await api.post('postos-combustiveis', data);

        this.props.navigation.navigate('Postos')
        alert("As informações foram enviadas para análise, agora é só aguardar a confirmação :D")

    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Nome Posto"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.nome}
                    onChangeText={nome => this.setState({ nome })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Bandeira"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.bandeira}
                    onChangeText={bandeira => this.setState({ bandeira })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="Gasolina comum"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_gasolina_comum}
                    onChangeText={combustivel_preco_gasolina_comum => this.setState({ combustivel_preco_gasolina_comum })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="gasolina aditivada"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_gasolina_aditivada}
                    onChangeText={combustivel_preco_gasolina_aditivada => this.setState({ combustivel_preco_gasolina_aditivada })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="diesel comum"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_diesel_comum}
                    onChangeText={combustivel_preco_diesel_comum => this.setState({ combustivel_preco_diesel_comum })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="diesel S10"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_diesel_s10}
                    onChangeText={combustivel_preco_diesel_s10 => this.setState({ combustivel_preco_diesel_s10 })}
                />
                <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="etanol"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_etanol}
                    onChangeText={combustivel_preco_etanol => this.setState({ combustivel_preco_etanol })}
                />
                <TextInput
                    autoCorrect={false}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholder="gas gnv"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={this.state.combustivel_preco_gas_gnv}
                    onChangeText={combustivel_preco_gas_gnv => this.setState({ combustivel_preco_gas_gnv })}
                />
                <TouchableOpacity style={styles.buttonCadastrar}
                    onPress={this.handleSubmit} >
                    <Text style={styles.buttonText} >Cadastrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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