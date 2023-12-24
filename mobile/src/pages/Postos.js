import React, { Component } from 'react';
import api from '../services/api';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ActionButton from 'react-native-action-button';
import add_posto from '../assets/add_posto.png';
import DC from '../assets/DC.png';
import DS10 from '../assets/DS10.png';
import E from '../assets/E.png';
import GA from '../assets/GA.png';
import GC from '../assets/GC.png';
import GNV from '../assets/GNV.png';
import * as geolib from 'geolib';
import getPreciseDistance from 'geolib/es/getDistance';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
//Geolocation.getCurrentPosition(info => console.log(info));
import Directions from "./Directions";
import Vai_abastecer from "./Vai_abastecer";

console.disableYellowBox = true;
//const GOOGLE_MAPS_APIKEY = 'AIzaSyAjWOfjoNi5wePBxLeQoq0maUkk9S97lAI';

export default class Postos extends Component {
  state = {
    data: [],
    refreshing: false,
    region: '',
    automovel: [],
    showVaiAbastecer: false,
    quantidadeVaiAbastecer: '',
  };

  componentDidMount = async () => {
    this.loadPostos();
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
      }, //sucesso
      () => {
      }, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
    const { id } = JSON.parse(await AsyncStorage.getItem('@App:user')) || null;

    const response = await api.get(`users/${id}/automoveis`);
    const { data } = response.data;

    this.setState({ automovel: data.automovel });
    //this.calculaNovoPreco();

  }

  abastecer = quantidade => {
    this.setState({ quantidadeVaiAbastecer: quantidade.quantidadeCombustivel, showVaiAbastecer: false, refreshing: true, })
  }

  loadPostos = async () => {
    const response = await api.get('postos-combustiveis');
    const { data } = response.data;

    this.setState({ data, refreshing: false });
    //data.map(s => console.log(s.id));

  };

  handleCadastrarPosto = async () => {
    this.props.navigation.navigate('Mapa_cadastro_posto')
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
    if (this.state.quantidadeVaiAbastecer) {
      var distancia = (getPreciseDistance(
        { latitude: parseFloat(this.state.region.latitude), longitude: parseFloat(this.state.region.longitude) },
        { latitude: parseFloat(item.localizacao_latitude), longitude: parseFloat(item.localizacao_longitude) }
      ) / 1000)
      var consumo_ate_posto = (distancia * 3) / this.state.automovel.map(a => (a.consumo_medio));
      //var preco_extra = (item.combustivel_gasolina_comum * consumo_ate_posto);
      var combustivel_gasolina_comum_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_gasolina_comum)) + (item.combustivel_gasolina_comum * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      var combustivel_gasolina_aditivada_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_gasolina_aditivada)) + (item.combustivel_gasolina_aditivada * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      var combustivel_diesil_comum_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_diesil_comum)) + (item.combustivel_diesil_comum * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      var combustivel_diesil_s10_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_diesil_s10)) + (item.combustivel_diesil_s10 * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      var combustivel_etanol_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_etanol)) + (item.combustivel_etanol * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      var combustivel_gas_gnv_novo = (((this.state.quantidadeVaiAbastecer * parseFloat(item.combustivel_gas_gnv)) + (item.combustivel_gas_gnv * consumo_ate_posto)) / this.state.quantidadeVaiAbastecer).toFixed(3);
      this.setState({ refreshing: true });

      item = { ...item, ...{ combustivel_gasolina_comum_novo: combustivel_gasolina_comum_novo }, }
      item = { ...item, ...{ combustivel_gasolina_aditivada_novo: combustivel_gasolina_aditivada_novo }, }
      item = { ...item, ...{ combustivel_diesil_comum_novo: combustivel_diesil_comum_novo }, }
      item = { ...item, ...{ combustivel_diesil_s10_novo: combustivel_diesil_s10_novo }, }
      item = { ...item, ...{ combustivel_etanol_novo: combustivel_etanol_novo }, }
      item = { ...item, ...{ combustivel_gas_gnv_novo: combustivel_gas_gnv_novo }, }
      this.setState({ refreshing: false });

    } else {
      this.setState({ refreshing: true });
      var distancia = (getPreciseDistance(
        { latitude: parseFloat(this.state.region.latitude), longitude: parseFloat(this.state.region.longitude) },
        { latitude: parseFloat(item.localizacao_latitude), longitude: parseFloat(item.localizacao_longitude) }
      ) / 1000)
      var consumo_ate_posto = (distancia * 3) / this.state.automovel.map(a => (a.consumo_medio));
      // var preco_extra = item.combustivel_gasolina_comum * consumo_ate_posto;
      var combustivel_gasolina_comum_novo = ((parseFloat(item.combustivel_gasolina_comum * consumo_ate_posto)) + parseFloat(item.combustivel_gasolina_comum)).toFixed(3);
      var combustivel_gasolina_aditivada_novo = ((parseFloat(item.combustivel_gasolina_aditivada * consumo_ate_posto)) + parseFloat(item.combustivel_gasolina_aditivada)).toFixed(3);
      var combustivel_diesil_comum_novo = ((parseFloat(item.combustivel_diesil_comum * consumo_ate_posto)) + parseFloat(item.combustivel_diesil_comum)).toFixed(3);
      var combustivel_diesil_s10_novo = ((parseFloat(item.combustivel_diesil_s10 * consumo_ate_posto)) + parseFloat(item.combustivel_diesil_s10)).toFixed(3);
      var combustivel_etanol_novo = ((parseFloat(item.combustivel_etanol * consumo_ate_posto)) + parseFloat(item.combustivel_etanol)).toFixed(3);
      var combustivel_gas_gnv_novo = ((parseFloat(item.combustivel_gas_gnv * consumo_ate_posto)) + parseFloat(item.combustivel_gas_gnv)).toFixed(3);

      this.setState({ refreshing: true });
      item = { ...item, ...{ combustivel_gasolina_comum_novo: combustivel_gasolina_comum_novo }, }
      item = { ...item, ...{ combustivel_gasolina_aditivada_novo: combustivel_gasolina_aditivada_novo }, }
      item = { ...item, ...{ combustivel_diesil_comum_novo: combustivel_diesil_comum_novo }, }
      item = { ...item, ...{ combustivel_diesil_s10_novo: combustivel_diesil_s10_novo }, }
      item = { ...item, ...{ combustivel_etanol_novo: combustivel_etanol_novo }, }
      item = { ...item, ...{ combustivel_gas_gnv_novo: combustivel_gas_gnv_novo }, }
      this.setState({ refreshing: false });
    }
    let posto;
    if (item.aprovado == 1) {
      posto = <TouchableOpacity style={styles.postoContainer} onPress={() => { alert("Em construção :D") }}>
        <View style={styles.Postos}>
          <Text style={styles.postoNome}>Posto {item.nome}</Text>
        </View>
        <View style={styles.Postos}>
          <Text style={styles.postoBandeira}>Bandeira {item.bandeira}</Text>
        </View>
        <View style={styles.Comb_pt1}>
          <Text style={styles.texto_comb}>
            <Image source={GC} />
            {item.combustivel_gasolina_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_comum}
            {isFinite(item.combustivel_gasolina_comum_novo) ? " (R$" + item.combustivel_gasolina_comum_novo + ")" : ''}
          </Text>
          <Text style={styles.texto_comb}>
            <Image source={GA} />
            {item.combustivel_gasolina_aditivada == null ? 'Sem Combustivel' : "R$" + item.combustivel_gasolina_aditivada}
            {isFinite(item.combustivel_gasolina_aditivada_novo) ? " (R$" + item.combustivel_gasolina_aditivada_novo + ")" : ''}
          </Text>
        </View>
        <View style={styles.Comb_pt2}>
          <Text style={styles.texto_comb}>
            <Image source={DC} />
            {item.combustivel_diesil_comum == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_comum}
            {isFinite(item.combustivel_diesil_comum_novo) ? " (R$" + item.combustivel_diesil_comum_novo + ")" : ''}
          </Text>
          <Text style={styles.texto_comb}>
            <Image source={DS10} />
            {item.combustivel_diesil_s10 == null ? 'Sem Combustivel' : "R$" + item.combustivel_diesil_s10}
            {isFinite(item.combustivel_diesil_s10_novo) ? " (R$" + item.combustivel_diesil_s10_novo + ")" : ''}
          </Text>
        </View>
        <View style={styles.Comb_pt3}>
          <Text style={styles.texto_comb}>
            <Image source={E} />
            {item.combustivel_etanol == null ? 'Sem Combustivel' : "R$" + item.combustivel_etanol}
            {isFinite(item.combustivel_etanol_novo) ? " (R$" + item.combustivel_etanol_novo + ")" : ''}
          </Text>
          <Text style={styles.texto_comb}>
            <Image source={GNV} />
            {item.combustivel_gas_gnv == null ? 'Sem Combustivel' : "R$" + item.combustivel_gas_gnv}
            {isFinite(item.combustivel_gas_gnv_novo) ? " (R$" + item.combustivel_gas_gnv_novo + ")" : ''}
          </Text>
        </View>
      </TouchableOpacity>;
    }

    return (
      <View>
        {posto}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Vai_abastecer isVisible={this.state.showVaiAbastecer}
          onSave={this.abastecer}
          onCancel={() => this.setState({ showVaiAbastecer: false })} />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
        <ActionButton buttonColor="#0093c0">
          <ActionButton.Item buttonColor='#0093c0' title="Adicionar Posto" onPress={this.handleCadastrarPosto}>
            <MaterialCommunityIcons name="gas-station" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          < ActionButton.Item buttonColor="#0093c0" title="Vai Abastecer?" onPress={() => { this.setState({ showVaiAbastecer: true }) }}>
            <Image source={add_posto} />
          </ActionButton.Item>
        </ActionButton>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  list: {
    padding: 0,
  },
  postoContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 0,
    padding: 10,
  },
  Postos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postoNome: {
    fontSize: 18,
    color: "#333"
  },
  postoBandeira: {
    fontSize: 18,
    color: "#333",
    paddingLeft: 5,
  },
  texto_comb: {
    height: 50
  },
  Comb_pt1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Comb_pt2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Comb_pt3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  postoButton: {
    height: 42,
    backgroundColor: "#0093c0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  postoButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

