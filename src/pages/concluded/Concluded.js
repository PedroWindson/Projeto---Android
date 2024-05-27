import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";

import { faCheck, faX, faPen, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { TouchableRipple, List, PaperProvider, Dialog, Button } from 'react-native-paper'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NotaFiscal from "../../services/sqlite/NFE";

export default function Concluded({ onClose = () => { } }) {

    const [notasFiscais, setNotasFiscais] = useState()
    const [notasFiscaisBuscadas, setNotasFiscaisBuscadas] = useState(false)
    const [notaFiscalDeletada, setNotasFiscalDeletada] = useState()
    const [numeroNotaFiscalDeletada, setNumeroNotaFiscalDeletada] = useState()

    const [visible, setVisible] = useState()

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    useEffect(() => {
        buscaNotasFiscais()
    }, [])

    const buscaNotasFiscais = async () => {
        await NotaFiscal.findByConcluded()
            .then(notas => setNotasFiscais(notas))
        setNotasFiscaisBuscadas(true)
        // console.log(notasFiscais)
    }

    const deletaNotaFiscal = (nota) => {
        setVisible(!visible)
        setNotasFiscalDeletada(nota)
        setNumeroNotaFiscalDeletada(nota.numero)
    }

    const deletadorNotaFiscal = () => {
        NotaFiscal.remove(notaFiscalDeletada.id)
            .then(() => {
                console.log("deletado com sucesso")
                hideDialog()
                buscaNotasFiscais()
            })
            .catch((err) => console.log(err))
    }


    return (

        <PaperProvider>

            <View style={styles.container} >

                <ScrollView


                >
                    {notasFiscaisBuscadas ? [notasFiscais[0] ? notasFiscais.map((elem) => (
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
                                description={elem.mesAno}
                                title={elem.numero}
                                right={_props => <View style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 50,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    backgroundColor: "#B4FB97"
                                }}>
                                    <FontAwesomeIcon icon={faCheck} size={30} />
                                </View>}
                            >
                                <List.Item title={elem.discriminacaoDosServicos} right={_props => (<>
                                    <List.Item title={<FontAwesomeIcon icon={faPen} color="#5ED9FC" />} onPress={() => onClose(elem)} />
                                    <List.Item title={<FontAwesomeIcon icon={faTrash} color="red" />} onPress={() => { deletaNotaFiscal(elem) }} />
                                </>
                                )} />

                            </List.Accordion>
                        </TouchableRipple>
                    )) : <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 300 }}><Text style={{ fontSize: 30 }} >SEM NOTAS FISCAIS</Text></View>] : <ActivityIndicator color="#5ED9FC" size={100} style={styles.loading} animating={true} />}




                </ScrollView>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Deletar</Dialog.Title>
                    <Dialog.Content>
                        <Text>Deseja deletar o nota fiscal {numeroNotaFiscalDeletada} ?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} textColor="blue">Cancelar</Button>
                        <Button onPress={deletadorNotaFiscal} textColor="red">Deletar</Button>
                    </Dialog.Actions>
                </Dialog>

            </View>
        </PaperProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 240
    }

})