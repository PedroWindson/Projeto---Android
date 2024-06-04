import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, BackHandler, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// import Concluded from "../pages/concluded/Concluded";
// import RegisterNFE from "../pages/register-nfe/RegisterNFE";
import Home from "../pages/home/Home";
import FichaDeAnamnese from "../pages/fichaDeAnamnese/FichaDeAnamnese"
import ListaDeClientes from "../pages/listaDeClientes/ListaDeClientes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile, faFileCircleCheck, faFileCirclePlus, faUserPlus, faHome } from "@fortawesome/free-solid-svg-icons";
import { CommonActions, useNavigation } from '@react-navigation/native'


library.add(faFileCirclePlus, faFileCircleCheck, faUserPlus, faHome)

const Tab = createBottomTabNavigator();

export default function TabRoutes() {

    const navigation = useNavigation()

    const [atualizaNFE, setAtualizaNFE] = useState()
    const [atualizaCliente, setAtualizaCliente] = useState()

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Alerta!', 'Deseja realmente sair?', [
            {
              text: 'Não',
              onPress: () => null,
              style: 'Cancel',
            },
            {text: 'Sim', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
    }, []);

    // const chamaEditorDeNFE = (e) => {
    //     navigation.navigate('register-nfe', {dados: e})

    // }
    const chamaEditorDeFichaDeAnamnese = (e) => {
        navigation.navigate('fichaDeAnamnese', {dados: e})

    }
    // const enviaParaNotasNotConclued = () => {
    //     navigation.navigate('home')
    // }
    // const enviaParaNotasConclued = () => {
    //     navigation.navigate('concluded')
    // }
    const salvaAlteracaoFichaDeAnamnese = () => {
        navigation.navigate('listaDeClientes')
    }

    return (

        <Tab.Navigator
            initialRouteName = 'home'
            backBehavior = "none"
            screenOptions = {{
                title: '',

                tabBarShowLabel: false,

                headerTitleAlign: 'center',

                headerTitleStyle: {
                    fontSize: 25,
                    color: '#FFF',
                },

                headerStyle: {
                    borderWidth: 0,
                    elevation: 0,
                    backgroundColor: '#e6ddab',
                },

                tabBarStyle: {
                    height: 55,
                    borderWidth: 0,
                    elevation: 0,
                    backgroundColor: '#e6ddab',
                }
            }}>

            <Tab.Screen
                name = 'fichaDeAnamnese'
                component ={() => <FichaDeAnamnese onClose={() => {
                        salvaAlteracaoFichaDeAnamnese()
                }}/>}
                
                options = {{
                    headerTitle: 'Ficha de anamnese',
                    tabBarIcon: ({ size, color, focused }) => (
                        (focused)?
                        (
                            <View style = {styles.containerFocusIcon}>
                                <View style = {styles.focusIcon} />
                                <FontAwesomeIcon icon={faUserPlus} size = {size + 7} color = {'#9e967e'} />
                            </View>
                        )
                        :
                        <FontAwesomeIcon icon={faUserPlus} size = {size + 2} color = {'#FFF'} />
                    )
                }}
            />

            <Tab.Screen
                name = 'home'
                component ={() => <Home onClose={(e) => {
                    console.log(e)
                    if(e === 1 || e === "1" || e === true){
                        enviaParaNotasConclued()                
                    } else{
                        enviaParaNotasNotConclued() 
                    }
                }}/>}
                options = {{
                    headerTitle: 'Próximos agendamentos',
                    tabBarIcon: ({ size, color, focused }) => (
                        (focused)?
                        (
                            <View style = {styles.containerFocusIcon}>
                                <View style = {styles.focusIcon} />
                                <FontAwesomeIcon icon={faHome} size = {size + 7} color = {'#9e967e'} />
                            </View>
                        )
                        :
                        <FontAwesomeIcon icon={faHome} size = {size + 2} color = {'#FFF'} />
                    )
                }}
            />

            <Tab.Screen
                name = 'listaDeClientes'
                component ={() => <ListaDeClientes onClose={(e) => {
                    if(e){
                        chamaEditorDeFichaDeAnamnese(e)                
                    }
                }}/>}
                options = {{
                    headerTitle: 'Lista de Clientes',
                    tabBarIcon: ({ size, color, focused }) => (
                        (focused)?
                        (
                            <View style = {styles.containerFocusIcon}>
                                <View style = {styles.focusIcon} />
                                <FontAwesomeIcon icon={faFile} size = {size + 7} color = {'#9e967e'} />
                            </View>
                        )
                        :
                        <FontAwesomeIcon icon={faFile} size = {size + 2} color = {'#FFF'} />
                    )
                }}
            />

            {/* <Tab.Screen
                name = 'register-client'
                component ={() => <RegisterClient onClose={() => {
                        enviaClientes()
                }}/>}
                options = {{
                    headerTitle: 'CADASTRO CLIENTE',
                    tabBarIcon: ({ size, color, focused }) => (
                            (focused)?
                            (
                                <View style = {styles.containerFocusIcon}>
                                    <View style = {styles.focusIcon} />
                                    <FontAwesome5 name = 'user-plus' size = {size + 7} color = {'#2BCDF9'} />
                                </View>
                            )
                            :
                            <FontAwesome5 name = 'user-plus' size = {size} color = {'#FFF'} />
                        )
                    }}
            />

            <Tab.Screen
                name = 'clients'
                component ={() => <Clients onClose={(e) => {
                    if(e){chamaEditorDeClient(e)}
                }}/>}
                options = {{
                    headerTitle: 'CLIENTES',
                    tabBarIcon: ({ size, color, focused }) => (
                        (focused)?
                        (
                            <View style = {styles.containerFocusIcon}>
                                <View style = {styles.focusIcon} />
                                <FontAwesome5 name = 'user-alt' size = {size + 7} color = {'#2BCDF9'} />
                            </View>
                        )
                        :
                        <FontAwesome5 name = 'user-alt' size = {size} color = {'#FFF'} />
                    )
                }}
            /> */}

        </Tab.Navigator>
        
    );
}

const styles = StyleSheet.create({
    containerFocusIcon: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    focusIcon: {
        height: 4,
        width: 80,
        bottom: 9,
        borderRadius: 3,
        backgroundColor: '#9e967e'
    }
});
