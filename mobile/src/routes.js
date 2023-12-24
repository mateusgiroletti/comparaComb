import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import Login from './pages/Login';
import Postos from './pages/Postos';
import Cadastrar from './pages/Cadastrar';
import Mapa from './pages/Mapa';
import Perfil from './pages/Perfil';
import Pendentes from './pages/Pendentes';
import Mapa_cadastro_posto from './pages/Mapa_cadastro_posto';
import Cadastrar_posto from './pages/Cadastrar_posto';
import Cadastrar_automovel from './pages/Cadastrar_automovel';

MaterialCommunityIcons.loadFont();
Fontisto.loadFont();
Feather.loadFont();

const MenuRoutes = createMaterialBottomTabNavigator({
    Postos: {
        name: 'Postos',
        screen: Postos,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons name="gas-station" size={20} color={focused ? '#fff' : '#ddd'} />
            ),
        }
    },
    Mapa: {
        name: 'Mapa',
        screen: Mapa,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Fontisto name="map" size={20} color={focused ? '#fff' : '#ddd'} />
            ),
        }
    },
    Pendentes: {
        name: 'Pendentes',
        screen: Pendentes,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Fontisto name="arrow-swap" size={20} color={focused ? '#fff' : '#ddd'} />
            ),
        }
    },
    Perfil: {
        name: 'Perfil',
        screen: Perfil,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Feather name="user" size={20} color={focused ? '#fff' : '#ddd'} />
            ),
        }
    },
},
    {
        initialRouteName: 'Postos',
        activeColor: '#f0edf6',
        inactiveColor: '#f0edf6',
        barStyle: { backgroundColor: '#0093c0' },
    },

);
/*
const MenuConfig = {
    initialRouteName: 'Main',
    tabBarOptions: {
        showLabel: true,
    }
}*/
const MainRoutes = {
    Login: {
        name: 'Login',
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    Cadastrar: {
        name: 'Cadastrar',
        screen: Cadastrar,
        navigationOptions: {
            title: 'Cadastrar',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    Cadastrar_automovel: {
        name: 'Cadastrar_automovel',
        screen: Cadastrar_automovel,
        navigationOptions: {
            title: 'Cadastrar Veículo',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    Postos: {
        name: 'Posto',
        screen: MenuRoutes,
        navigationOptions: {
            title: 'Compara Postos',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }


    },
    Mapa_cadastro_posto: {
        name: 'Mapa_cadastro_posto',
        screen: Mapa_cadastro_posto,
        navigationOptions: {
            title: 'Compara Postos',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    Cadastrar_posto: {
        name: 'Cadastrar_posto',
        screen: Cadastrar_posto,
        navigationOptions: {
            title: 'Compara Postos',
            headerStyle: {
                backgroundColor: '#0093c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }

    },

}
const MainNavigator = createStackNavigator(MainRoutes, { initialRouteName: 'Login', })

export default createAppContainer(MainNavigator);
