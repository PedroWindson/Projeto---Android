import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Cliente from "../../services/sqlite/Cliente";
import { faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { ActivityIndicator, Dialog, Text, PaperProvider, List, TouchableRipple, Button  } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ListaDeClientes({ onClose = () => {} }) {

    const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);

    const [clientes, setClientes] = useState()
    const [clientesBuscados, setClientesBuscados] = useState(false)
    const [clienteDeletado, setClienteDeletado] = useState()
    const [nomeClienteDeletado, setNomeClienteDeletado] = useState()

    useEffect(() => {
        buscaClientes()
    }, [])

    const buscaClientes = async () => {
        const busca = await Cliente.all();
        setClientes(busca);
        setClientesBuscados(true);
    }

    const deletaCliente = (cliente) => {
        setVisible(!visible)
        setClienteDeletado(cliente)
        setNomeClienteDeletado(cliente.nome)
    }

    const deleteUser = async () => {
        await Cliente.remove(clienteDeletado.id)
        .then((e) => console.log(`\n\n\n\nFOI: ${e}`))
        .catch((err) => console.log(`\n\n\n\nERROR: ${err}`))
        hideDialog()
        buscaClientes()
    }


    return(

    <PaperProvider>
        <View style = {styles.container} >
            <ScrollView>
            {clientesBuscados ? [clientes[0] ? clientes.map((elem) => (
                <TouchableRipple style={{
                    borderColor: "#000",
                    borderWidth: 0.8, 
                    margin: 5,
                    borderRadius: 5,
                }}
                >
                    <List.Accordion
                    titleStyle={{
                        fontSize: 20, 
                        color: "#000",
                        whiteSpace: "nowrap", 
                        textOverflow: "ellipsis", 
                        width: "98%", 
                        display: "block", 
                        overflow: "hidden"
                    }}
                    descriptionStyle={{
                        fontSize: 20, 
                        color: "#000",
                        whiteSpace: "nowrap", 
                        textOverflow: "ellipsis", 
                        width: "98%", 
                        display: "block", 
                        overflow: "hidden"
                    }}
                    descriptionNumberOfLines={1}
                    description={elem.telefone}
                    title={elem.nome}
                    right={props => <View style = {{        
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: 'center',  
                        backgroundColor: "#5ED9FC" 
                    }}>
                            <FontAwesomeIcon icon={faUser} size={30}/>
                        </View>}
                    >
                        <List.Item title={elem.email} right={props =>(<>
                        <List.Item title={<FontAwesomeIcon icon={faPen} color="#5ED9FC"/>} onPress={() => onClose(elem)}/>
                        <List.Item title={<FontAwesomeIcon icon={faTrash} color="red"/>} onPress={() => {deletaCliente(elem)}}/>
                        </>
                        )}/>
                        <List.Item title={elem.endereco}/>
                        <List.Item title={elem.dataDeNascimento}/>
                        <List.Item title={`Hipertenção? ${elem.hipertensao} / Controlada? ${elem.hipertensaoObs}`}/>
                        <List.Item title={`Diabetes? ${elem.diabetes} / Controlada? ${elem.diabetesObs}`}/>
                        <List.Item title={`Tireoide? ${elem.tireoide} / Controlada? ${elem.tireoideObs}`}/>
                        <List.Item title={`Cancêr? ${elem.cancer} / Controlada? ${elem.cancerObs}`}/>
                        <List.Item title={`Tem Alterações Cardíacas? ${elem.alteracoesCardiacas}`}/>
                        <List.Item title={`Tem Epilepsia/Convulsões? ${elem.epilepsiaConvulsoes}`}/>
                        <List.Item title={`Tem Intestino Regulado? ${elem.intestinoRegulado}`}/>
                        <List.Item title={`Possui Marca-Passo? ${elem.marcaPasso}`}/>
                        <List.Item title={`É Tabagista? ${elem.tabagista}`}/>
                        <List.Item title={`É Gestante? ${elem.gestante}`}/>
                    
                    </List.Accordion>
                </TouchableRipple>)) : <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 300}}><Text style={{fontSize: 30}} >SEM CLIENTES</Text></View>] : <ActivityIndicator color="#5ED9FC" size={100} style={styles.loading} animating={true} />}

            </ScrollView>
            <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Deletar</Dialog.Title>
                    <Dialog.Content>
                    <Text>Deseja deletar o cliente {nomeClienteDeletado} ?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog} textColor="blue">Cancelar</Button>
                    <Button onPress={deleteUser} textColor="red">Deletar</Button>
                    </Dialog.Actions>
            </Dialog>
        </View>
    </PaperProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 240
    }

})