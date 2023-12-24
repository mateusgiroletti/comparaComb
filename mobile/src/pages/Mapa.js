import React, { Component } from 'react';
import api from '../services/api';

import { View, StyleSheet, Dimensions, FlatList } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Search from './Search';

import Geolocation from '@react-native-community/geolocation';

export default class Mapa extends Component {
  state = {
    region: null,
    data: []
  };


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

    const response = await api.get('postos-combustiveis');
    const { data } = response.data;
    this.setState({ data });


  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          showsUserLocation
          loadingEnabled
          style={styles.maps}>
          {this.state.data.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.localizacao_latitude,
                longitude: marker.localizacao_longitude
              }}
              title={marker.nome}
              description={marker.combustivel_gasolina_comum}
            />
          ))
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    flex: 1,

  }
});