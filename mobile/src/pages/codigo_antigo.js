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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewDirections from 'react-native-maps-directions';

import Geolocation from '@react-native-community/geolocation';

//Geolocation.getCurrentPosition(info => console.log(info));
import Directions from "./Directions";

console.disableYellowBox = true;
//const GOOGLE_MAPS_APIKEY = 'AIzaSyAjWOfjoNi5wePBxLeQoq0maUkk9S97lAI';

/*
let novos_preco = {
  id: '',
  combustivel_gasolina_comum_novo: '',
  combustivel_gasolina_aditivada_novo: '',
  combustivel_diesil_comum_novo: '',
  combustivel_diesil_s10_novo: '',
  combustivel_etanol_novo: '',
  combustivel_gas_gnv_novo: '',
};
*/


export default class Postos extends Component {
  state = {
    data: [],
    refreshing: false,
    region: null,
    automovel: [],
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
      () => { }, //erro
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

  calculaNovoPreco = async (item, index) => {
    /* return (
       <Directions
         origin={this.state.region}
         destination={{
           latitude: item.localizacao_latitude,
           longitude: item.localizacao_longitude
         }}
         onReady={result => {
           let state = this.state;
 
           var distancia = result.distance;
           var consumo_ate_posto = distancia / this.state.automovel.map(a => (a.consumo_medio));
           var preco_extra = item.combustivel_gasolina_comum * consumo_ate_posto;
           var novo_preco = (parseFloat(preco_extra) + parseFloat(item.combustivel_gasolina_comum)).toFixed(3);
 
           //aqui funcionou
           //state.data[0] = { ...state.data[0], ...{ combustivel_gasolina_comum_novo: novo_preco } }
 
           //state.data.forEach(indice => console.log(indice))
           state.data[0] = { ...state.data[0], ...{ combustivel_gasolina_comum_novo: novo_preco } }
           state.data[1] = { ...state.data[1], ...{ combustivel_gasolina_comum_novo: novo_preco } }
 
           this.setState(state);
           console.log(this.state.data)
           return novo_preco
         }}
       />
     )*/

  }



  renderItem = (item, index) => {
    /*var valor_novo = */this.calculaNovoPreco(item, index);
    //console.log(valor_novo)
    return (
      <Directions
        origin={this.state.region}
        destination={{
          latitude: item.localizacao_latitude,
          longitude: item.localizacao_longitude
        }}
        onReady={result => {
          let state = this.state;

          var distancia = result.distance;
          var consumo_ate_posto = distancia / this.state.automovel.map(a => (a.consumo_medio));
          var preco_extra = item.combustivel_gasolina_comum * consumo_ate_posto;
          var novo_preco = (parseFloat(preco_extra) + parseFloat(item.combustivel_gasolina_comum)).toFixed(3);

          //aqui funcionou
          //state.data[0] = { ...state.data[0], ...{ combustivel_gasolina_comum_novo: novo_preco } }

          //state.data.forEach(indice => console.log(indice))
          item = { ...item, ...{ combustivel_gasolina_comum_novo: novo_preco } }
          console.log(item)
          return (
            <TouchableOpacity style={styles.postoContainer} onPress={() => { alert("Em construção :D") }}>
              <View style={styles.Postos}>
                <Text style={styles.postoNome}>Posto {item.nome}</Text>
                <Text style={styles.postoBandeira}>Bandeira {item.bandeira}</Text>
              </View>
              <View style={styles.Comb_pt1}>
                <Text style={styles.texto_comb}><Image source={GC} /> R${item.combustivel_gasolina_comum} {item.combustivel_gasolina_comum_novo}</Text>
                <Text style={styles.texto_comb}><Image source={GA} /> R${item.combustivel_gasolina_aditivada}</Text>
              </View>
              <View style={styles.Comb_pt2}>
                <Text style={styles.texto_comb}><Image source={DC} /> R${item.combustivel_diesil_comum}</Text>
                <Text style={styles.texto_comb}><Image source={DS10} /> R${item.combustivel_diesil_s10}</Text>
              </View>
              <View style={styles.Comb_pt3}>
                <Text style={styles.texto_comb}><Image source={E} /> R${item.combustivel_etanol}</Text>
                <Text style={styles.texto_comb}><Image source={GNV} /> R${item.combustivel_gas_gnv}</Text>
              </View>
            </TouchableOpacity>

          )
          //console.log(this.state.data)
          //return novo_preco
        }}
      />

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
        <ActionButton buttonColor="#0093c0">
          <ActionButton.Item buttonColor='#0093c0' title="Adicionar Posto" onPress={this.handleCadastrarPosto}>
            <MaterialCommunityIcons name="gas-station" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          < ActionButton.Item buttonColor="#0093c0" title="Vai Abastecer?" onPress={() => { }}>
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

