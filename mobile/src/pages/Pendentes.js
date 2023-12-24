import React, { Component } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';


import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Pendentes extends Component {
  state = {
    data: [],
    refreshing: false,
    userAdmin: '',
    userID: '',
  };

  async componentDidMount() {
    this.loadPostos();
    const user = JSON.parse(await AsyncStorage.getItem('@App:user'));
    this.setState({ userAdmin: user.admin, userID: user.id })
  }

  loadPostos = async () => {
    const response = await api.get('postos-combustiveis');
    const { data } = response.data;
    this.setState({ data, refreshing: false });
    /*    api.get(`postos-combustiveis/${s.id}/users`).then((res) => {
        })*/
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1,
    }, () => {
      this.loadPostos();
    })
  };

  renderItem = (item, index) => {
    //  console.log("1", this.state.userAdmin)
    //console.log(item.user_id)
    let informacoes;
    if (this.state.userAdmin == 1 && item.aprovado == 0) {
      informacoes =
        <View style={styles.postoContainer}>
          <Text style={styles.postoNome}>Nome Posto: {item.nome}</Text>
          <Text style={styles.postoNome}>Nome da bandeira: {item.bandeira}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.postoNome}>Localização</Text>
            <TouchableOpacity style={styles.postoLocalizacaoButton} onPress={() => { }}>
              <Text style={styles.postoButtonText}>Abrir Mapa</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postoNome}>
            Gasolina Comum: {item.combustivel_gasolina_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_comum}
          </Text>
          <Text style={styles.postoNome}>
            Gasolina Aditivada: {item.combustivel_gasolina_aditivada == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_aditivada}
          </Text>
          <Text style={styles.postoNome}>
            Diesil Comum: {item.combustivel_diesil_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_comum}
          </Text>
          <Text style={styles.postoNome}>
            Diesil S10: {item.combustivel_diesil_s10 == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_s10}
          </Text>
          <Text style={styles.postoNome}>
            Etanol: {item.combustivel_etanol == null ? 'Sem Combustivel' : "R$" + item.combustivel_etanol}
          </Text>
          <Text style={styles.postoNome}>
            Gas GNV: {item.combustivel_gas_gnv == null ? 'Sem Combustivel' : "R$" + item.combustivel_gas_gnv}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.postoButton} onPress={() => {
              api.put(`postos-combustiveis/${item.id}?aprovado=1`).then()
              this.loadPostos();
            }}>
              <Text style={styles.postoButtonText}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postoButton} onPress={() => {
              api.delete(`postos-combustiveis/${item.id}?`).then()
              this.loadPostos();
            }}>
              <Text style={styles.postoButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>;
    } else if (this.state.userAdmin == 0 && this.state.userID == item.user_id) {
      if (item.aprovado == 0) {
        informacoes =
          <View style={styles.postoContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.postoNome}>Status: Pendente</Text>
            </View>
            <Text style={styles.postoNome}>Nome Posto: {item.nome}</Text>
            <Text style={styles.postoNome}>Nome da bandeira: {item.bandeira}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.postoNome}>Localização</Text>
              <TouchableOpacity style={styles.postoLocalizacaoButton} onPress={() => { }}>
                <Text style={styles.postoButtonText}>Abrir Mapa</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postoNome}>
              Gasolina Comum: {item.combustivel_gasolina_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_comum}
            </Text>
            <Text style={styles.postoNome}>
              Gasolina Aditivada: {item.combustivel_gasolina_aditivada == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_aditivada}
            </Text>
            <Text style={styles.postoNome}>
              Diesil Comum: {item.combustivel_diesil_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_comum}
            </Text>
            <Text style={styles.postoNome}>
              Diesil S10: {item.combustivel_diesil_s10 == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_s10}
            </Text>
            <Text style={styles.postoNome}>
              Etanol: {item.combustivel_etanol == null ? 'Sem Combustivel' : "R$" + item.combustivel_etanol}
            </Text>
            <Text style={styles.postoNome}>
              Gas GNV: {item.combustivel_gas_gnv == null ? 'Sem Combustivel' : "R$" + item.combustivel_gas_gnv}
            </Text>
          </View>;
      } else {
        informacoes =
          <View style={styles.postoContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.postoNome}>Status: Aprovado</Text>
            </View>
            <Text style={styles.postoNome}>Nome Posto: {item.nome}</Text>
            <Text style={styles.postoNome}>Nome da bandeira: {item.bandeira}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.postoNome}>Localização</Text>
              <TouchableOpacity style={styles.postoLocalizacaoButton} onPress={() => { }}>
                <Text style={styles.postoButtonText}>Abrir Mapa</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postoNome}>
              Gasolina Comum: {item.combustivel_gasolina_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_comum}
            </Text>
            <Text style={styles.postoNome}>
              Gasolina Aditivada: {item.combustivel_gasolina_aditivada == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_aditivada}
            </Text>
            <Text style={styles.postoNome}>
              Diesil Comum: {item.combustivel_diesil_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_comum}
            </Text>
            <Text style={styles.postoNome}>
              Diesil S10: {item.combustivel_diesil_s10 == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_s10}
            </Text>
            <Text style={styles.postoNome}>
              Etanol: {item.combustivel_etanol == null ? 'Sem Combustivel' : "R$" + item.combustivel_etanol}
            </Text>
            <Text style={styles.postoNome}>
              Gas GNV: {item.combustivel_gas_gnv == null ? 'Sem Combustivel' : "R$" + item.combustivel_gas_gnv}
            </Text>
          </View>;
      }

    }

    return (
      <View>
        {informacoes}
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  list: {
    padding: 0
  },

  postoContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 0,
    padding: 0,
    marginBottom: 5
  },

  postoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  postoBandeira: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  postoLocalizacaoButton: {
    height: 25,
    width: "25%",
    backgroundColor: "#0093c0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 4,

  },
  postoButton: {
    height: 42,
    width: "48%",
    backgroundColor: "#0093c0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,

  },
  postoButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  }
});