import React, { Component } from 'react';

import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, CheckBox } from 'react-native';


const initialState = { quantidadeCombustivel: '' };

export default class Vai_abastecer extends Component {
    state = { ...initialState };

    save = () => {
        if (!this.state.quantidadeCombustivel.trim()) {
            Alert.alert('Dados inválidos', 'informe a quantidade')
            return
        }
        const data = { ...this.state };
        this.props.onSave(data);
        this.setState({ ...initialState });
    }


    render() {
        return (
            <Modal
                onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true}
            >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Vai abastecer?</Text>
                    <TextInput placeholder="Digite a quantidade de combustivel em litros"
                        keyboardType="numeric"
                        style={styles.input} onChangeText={quantidadeCombustivel => this.setState({ quantidadeCombustivel })}
                        value={this.state.quantidadeCombustivel}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={styles.buttonLogin} onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLogin} onPress={this.save}>
                            <Text style={styles.button}>Abastecer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#fff',
    },
    buttonLogin: {
        height: 28,
        alignSelf: 'stretch',
        backgroundColor: '#0093c0',
        borderRadius: 4,
        marginTop: 10,
        marginHorizontal: 3,
        marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: "#0093c0",
        color: "#fff",
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
});