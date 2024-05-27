import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Animatable from 'react-native-animatable';

export default function Login({ navigation }) {

    return(

        <View style = {{flex: 1, backgroundColor: '#e6ddab'}}>

            <View style = {styles.headerContainer}>
                <Animatable.Text
                    style = {styles.txtHeader}
                    animation = 'fadeInLeft'
                    delay = {500}
                >
                    BEM-VINDO(A)
                </Animatable.Text>
            </View>

            <Animatable.View
                style = {styles.formContainer}
                animation = 'fadeInUp'
                delay = {1000}
            >

                <View style = {styles.formContent}>

                    <TextInput 
                        style = {styles.formInput}
                        label = 'Login'
                        mode = 'outlined'
                        outlineColor = '#075A90'
                        activeOutlineColor = '#075A90'
                        autoCapitalize = "none"
                    />

                    <TextInput 
                        style = {styles.formInput}
                        label = 'Senha'
                        mode = 'outlined'
                        outlineColor = '#075A90'
                        activeOutlineColor = '#075A90'
                        autoCapitalize = "none"
                    />

                    <Button
                        style = {styles.formButton}
                        contentStyle = {{
                            height: 70,
                            alignSelf: 'center',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                        }}
                        labelStyle = {{
                            fontSize: 20,
                            color: '#FFF'
                        }}
                        onPress = {() => {navigation.navigate('TabRoutes')}}
                    >
                        ENVIAR
                    </Button>

                </View>

            </Animatable.View>

        </View>

);
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e6ddab'
    },
    
    txtHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#FFF'
    },
    
    formContainer: {
        flex: 4,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#FFF'
    },
    
    formContent: {
        width: '100%',
        gap: 25,
        marginTop: 60,
        paddingTop: 40,
        paddingHorizontal: 50,
    },
        
    formInput: {
        height: 60,
        fontSize: 20,
        marginBottom: 30,
        borderRadius: 50,
        backgroundColor: '#FFF'
    },
    
    formButton: {
        width: '70%',
        alignSelf: 'center',
        marginTop: 60,
        borderRadius: 50,
        backgroundColor: '#e6ddab',
    }
});