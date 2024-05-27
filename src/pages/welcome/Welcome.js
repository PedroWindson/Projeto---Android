import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import * as Animatable from 'react-native-animatable';

export default function Welcome({ navigation }) {

    return(

        <View style = {{flex: 1, backgroundColor: '#f8f8f8'}}>

            <Animatable.View 
                style = {styles.containerLogo}
                animation = 'fadeInUp' 
                delay = {500} 
            >
                <Image
                    style = {{resizeMode: 'contain', width: '80%'}}
                    source = {require('../../assets/LogoMarcella.jpeg')}
                />
            </Animatable.View>

            <Animatable.View 
                style = {styles.containerIntro}
                animation = 'fadeInUp'
                delay = {1000}
            >

                <Text style = {{fontSize: 25, textAlign:'center', fontWeight: 'bold', marginHorizontal: 20, color:'#FFF'}}>Bem vindo ao Studio Marcella Reis!</Text>

                <Button 
                    style = {styles.boxButton}
                    contentStyle = {{
                        height: 70,
                        alignSelf: 'center'
                    }}
                    labelStyle ={{
                        color: 'white',
                        fontSize: 17
                    }}
                    onPress = {() => navigation.navigate('Login')}
                >
                    PRÓXIMO
                </Button>
            </Animatable.View>

        </View>

    );
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8'
    },

    containerIntro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#e6ddab',
    },

    boxButton: {
        width: '50%',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#9e967e',
    }
});