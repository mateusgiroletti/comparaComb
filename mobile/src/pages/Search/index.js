import React, { Component } from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default class Search extends Component {
    render() {
        const { onLocationSelected } = this.props;
        return <GooglePlacesAutocomplete
            placeholder="Digite o local"
            placeholderTextColor="#333"
            onPress={onLocationSelected}
            query={{
                key: 'AIzaSyAjWOfjoNi5wePBxLeQoq0maUkk9S97lAI',
                languege: 'pt'
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false,
            }}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: 10,
                    width: '100%',
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: "transparent",
                    height: 54,
                    marginHorizontal: 50,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    height: 40,
                    margin: 0,
                    borderRadius: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: "#DDD",
                    fontSize: 18
                },
                listView: {
                    borderWidth: 1,
                    borderColor: "#DDD",
                    backgroundColor: "#FFF",
                    marginHorizontal: 48,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                },
                description: {
                    fontSize: 16
                },
                row: {
                    padding: 10,
                    height: 40
                }

            }}
        />;
    }
}
