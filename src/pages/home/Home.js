import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// import { Button } from "../../components/Buttons";
import { faClock, faPen, faTrash, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Card, Dialog, Portal, PaperProvider, Text, TouchableRipple, List, ActivityIndicator, Searchbar  } from 'react-native-paper';
// import NotaFiscal from "../../services/sqlite/NFE";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Home({ onClose = () => {} }) {

    const [visible, setVisible] = useState(false);
    
    //
    const [notasFiscais, setNotasFiscais] = useState()
    const [notasFiscaisBuscadas, setNotasFiscaisBuscadas] = useState(false)
    // const [notaFiscalDeletada, setNotasFiscalDeletada] = useState()
    // const [nomeNotaFiscalDeletada, setNomeNotaFiscalDeletada] = useState()

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        buscaAgendamentos()
    }, [])

    const buscaAgendamentos = async () => {
        // await NotaFiscal.findByNotConcluded()
        // .then(notas => setNotasFiscais(notas))
        // setNotasFiscaisBuscadas(true)
        // console.log(notasFiscais)
    }

    const deletaNotaFiscal = (nota) => {
        setVisible(!visible)
        setNotasFiscalDeletada(nota)
        setNomeNotaFiscalDeletada(nota.numero)
    }

    const deletadorNotaFiscal = () => {
        // NotaFiscal.remove(notaFiscalDeletada.id)
        // .then(() => {
        //     console.log("deletado com sucesso")
        //     hideDialog()
        //     buscaNotasFiscais()
        // })
        // .catch((err) => console.log(err))
    }

    const [searchQuery, setSearchQuery] = React.useState('');


    return(

    <PaperProvider>
        <View style = {styles.container} >
            <ScrollView>
            <Searchbar
                placeholder="Pesquisar"
                onChangeText={setSearchQuery}
                value={searchQuery}
                theme={{ colors: { primary: 'white', secundary: 'green' } }}
            />
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
                    right={_props => <View style = {{        
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
                        <List.Item title={elem.discriminacaoDosServicos} right={_props =>(<>
                        <List.Item title={<FontAwesomeIcon icon={faPen} color="#5ED9FC"/>} onPress={() => onClose(elem)}/>
                        <List.Item title={<FontAwesomeIcon icon={faTrash} color="red"/>} onPress={() => {deletaNotaFiscal(elem)}}/>
                        </>
                        )}/>
                    
                    </List.Accordion>
                </TouchableRipple>)) : <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 300}}><Text style={{fontSize: 30}} >SEM AGENDAMENTOS</Text></View>] : <ActivityIndicator color="#5ED9FC" size={100} style={styles.loading} animating={true} />}

            </ScrollView>
            <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Deletar</Dialog.Title>
                    <Dialog.Content>
                    {/* <Text>Deseja deletar os dados do(a) cliente {nomeNotaFiscalDeletada} ?</Text> */}
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDialog} textColor="blue">Cancelar</Button>
                    {/* <Button onPress={deletadorNotaFiscal} textColor="red">Deletar</Button> */}
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