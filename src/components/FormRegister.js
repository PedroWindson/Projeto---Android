import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button,TextInput } from "react-native-paper";

export function FormRegister({ palceHolder, titleInput, width, height, type, multiline, data, onClose = () =>{}}) {


    return(
        <View style = {[styles.containerInput, {width: width || '100%'}]}>

            <TextInput
                style = {[styles.contentInput, {height: height || 50}]}
                outlineColor = '#075A90'
                activeOutlineColor = '#075A90'
                mode = 'outlined'
                label={titleInput}
                placeholder={palceHolder || false}
                keyboardType = {type || 'default'}
                autoCapitalize = "words"
                multiline = {multiline || false}
                value={data}
                onChangeText={onClose}
            />
            
        </View>
    );
};

export function ButtonForm({ pressionado = () => {}}) {

    const [loading, setLoading] = useState(false);

    return(
        <Button
            contentStyle = {{height: 65, alignItems: 'center'}}
            style = {styles.buttonFormContainer}
            icon = 'send'
            textColor = '#FFF'
            mode = 'contained'
            // loading = {loading}
            onPress = {() => {
                // setLoading(false);
                pressionado();
            }}
        >
            ENVIAR
        </Button>
    );
};

const styles = StyleSheet.create({
    containerInput: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
    },

    titleInput: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    contentInput: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#FFF',
    },

    buttonFormContainer: {
        width: '65%',
        alignSelf: 'center',
        marginVertical: 40,
        borderRadius: 20,
        backgroundColor: '#075A90',
    },
});