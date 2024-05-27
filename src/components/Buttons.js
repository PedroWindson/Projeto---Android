import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faUser, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

library.add(faUser, faX, faClock, faCheck)

export function Button({ name, description, icon, color}) {

    return(

        <TouchableOpacity 
            style = {styles.buttonContainer}
            activeOpacity = {0.7}
        >
    
            <View style = {styles.buttonContent}>

                <Text style = {{fontSize: 17}}>{name || 'Nome'}</Text>
                <Text style = {{fontSize: 17}}>{description || 'Descrição'}</Text>

            </View>

            <View style = {{        
                height: 50,
                width: 50,
                position: 'absolute',
                right: 20,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: 'center',  
                backgroundColor: color 
            }}>
                <FontAwesomeIcon icon={icon} size={30}/>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 100,
        minWidth: '100%',
        justifyContent: 'center',       
        marginVertical: 20,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },

    buttonContent: {
        gap: 10,
        paddingLeft: 20,
    },

    containerIcon: {
        height: 50,
        width: 50,
        position: 'absolute',
        right: 20,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',   

    },

});