import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Search from './Search';
import Geolocation from '@react-native-community/geolocation';

export default class Mapa_cadastro_posto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      localizacao: [],
      localizacao_informacao: [],
    }
    this.newMarker = this.newMarker.bind(this);
  }

  async componentDidMount() {
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
  }

  newMarker(e) {
    let state = this.state;

    state.localizacao.push({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })

    this.setState(state);
  }

  handleLocationSelected = (description, { geometry }) => {
    let state = this.state;

    state.localizacao_informacao.push({
      endereco: description.description,
      latitude: geometry.location.lat,
      longitude: geometry.location.lng
    });
    this.setState(state);
  }

  confirmaEndereco = async () => {
    let state = this.state;
    this.props.navigation.navigate('Cadastrar_posto', state)
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          onPress={this.newMarker}
          region={region}
          showsUserLocation
          loadingEnabled
          minZoomLevel={3}
          style={styles.maps}>
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected} />
        <View
          style={styles.container_informacoes}
          horizontal
        >
          {
            this.state.localizacao_informacao.length > 0 ?
              this.state.localizacao_informacao.map(localizacao => (
                <Text style={styles.endereco}>{localizacao.endereco}</Text>
              ))
              :
              this.state.localizacao.map(localizacao => (
                <Text style={styles.endereco}>{localizacao.latitude};{localizacao.longitude}</Text>
              ))
          }
          <TouchableOpacity style={styles.buttonConfirmaEndereco}
            onPress={this.confirmaEndereco} >
            <Text style={styles.buttonText} >Confirmar Endereco</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    flex: 1,
  },
  container_informacoes: {
    width: '100%',
    height: 100,
  },
  endereco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  buttonConfirmaEndereco: {
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