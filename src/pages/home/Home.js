import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// import { Button } from "../../components/Buttons";
import { faClock, faPen, faTrash, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Card, Dialog, Portal, PaperProvider, Text, TouchableRipple, List, ActivityIndicator, Searchbar, Modal, FAB, TextInput, Menu } from 'react-native-paper';
// import NotaFiscal from "../../services/sqlite/NFE";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { FormRegister } from "../../components/FormRegister";
import DatePicker from "@react-native-community/datetimepicker";
import Cliente from "../../services/sqlite/Cliente";
import Agendamentos from "../../services/sqlite/Agendamentos";


export default function Home({ onClose = () => {} }) {

    const [visible, setVisible] = useState(false);
    
    //
    const [notasFiscais, setNotasFiscais] = useState()
    const [notasFiscaisBuscadas, setNotasFiscaisBuscadas] = useState(false)
    // const [notaFiscalDeletada, setNotasFiscalDeletada] = useState()
    // const [nomeNotaFiscalDeletada, setNomeNotaFiscalDeletada] = useState()

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

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


    const modalChange = () => {
        setVisible(!visible)
        setClienteSelecionado(null)
        setDate(new Date)
    };

    const containerStyle = {backgroundColor: '#f8f8f8', marginHorizontal: "10%", width: "80%", height:"80%", borderRadius: 10};

    const [date, setDate] = useState(new Date())
    const [openDate, setOpenDate] = useState()
    const [dataPickerDay2, setDataPickerDay2] = useState(false)
    const [dataPickerDay, setDataPickerDay] = useState(false)

    const onChangeDate = (e, selectDate) => {
        setDate(selectDate)
        console.log(date)
        setDataPickerDay(false)
        setDataPickerDay2(false)
    }

    const [clientes, setClientes] = useState()
    const [clientesBuscados, setClientesBuscados] = useState(false)

    const [agendamentos, setAgendamentos] = useState()
    const [agendamentosBuscados, setAgendamentosBuscados] = useState(false)

    useEffect(() => {
        buscaClientes()
        buscaAgendamentos()
    }, [])

    const buscaAgendamentos = async () => {
        const busca = await Agendamentos.all();
        setAgendamentos(busca);
        setAgendamentosBuscados(true);
    }

    const buscaClientes = async () => {
        const busca = await Cliente.all();
        setClientes(busca);
        setClientesBuscados(true);
    }

    const [visibleMenu, setVisibleMenu] = useState()

    const changeMenu = () => {setVisibleMenu(!visibleMenu)}

    const [clienteSelecionado, setClienteSelecionado] = useState()

    const geraAgendamento = async () => {
        let dataTime = date.toISOString()
        await Agendamentos.create({cliente:clienteSelecionado,dataTime:`${dataTime.toString()}`})
        .then(() => {
            console.log("criado")
            modalChange()
            buscaAgendamentos()
        } )
        .catch( err => {
            console.log(err)
        })
    }

    const deletaAgendamento = async (elem) => {
        await Agendamentos.remove(elem.id)
        buscaAgendamentos()
    }

    const editAgendamento = async (elem) => {
        setClienteSelecionado(elem.cliente)
        setDate(elem.dataTime)
        modalChange()
    }

    const handleSearch = async (elem) => {
        setSearchQuery(elem)
        agendamentos.map((agen) => {
            if(agen.cliente.match(elem)){
                console.log(agen.cliente)
            }else if(!agen.cliente.match(elem)){
                console.log("Sem cliente compativel")
            }
        })
    }

    return(

    <PaperProvider>
        <View style = {styles.container} >
            <Portal>
                <Modal 
                    visible={visible} 
                    onDismiss={modalChange} 
                    contentContainerStyle={containerStyle}>
                    {/* <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    <FormRegister
                        titleInput = {'Email'}
                        palceHolder="raphael.sanchez@estacio.br"
                    /> */}
                    <Button
                        onPress={() => setDataPickerDay(true)}
                    >Selecionar dia</Button>
                    {dataPickerDay ? (<DatePicker 
                        style={{
                            width: "100%"
                        }}
                        value={date}
                        mode="date"
                        onChange={onChangeDate}
                    />) : null}
                    <Button
                        onPress={() => setDataPickerDay2(true)}
                    >Selecionar hora</Button>
                    {dataPickerDay2 ? (<DatePicker 
                        style={{
                            width: "100%"
                        }}
                        value={date}
                        mode="time"
                        is24Hour={true}
                        onChange={onChangeDate}
                    />) : null}
                    <Text>{date.toLocaleString('pt-BR')}</Text>
                    <Menu
                        visible={visibleMenu}
                        onDismiss={changeMenu}
                        anchor={<Button onPress={changeMenu}>Show menu</Button>}
                    >
                        {clientesBuscados ? [clientes[0] ? clientes.map((elem) => (
                            <Menu.Item onPress={() => {
                                setClienteSelecionado(elem.nome)
                                changeMenu()
                            }} title={elem.nome} />
                        )) : null] : <Menu.Item title="CLIENTES NÃO ENCONTRADOS" disabled/>}
                    </Menu>
                    <Text>{clienteSelecionado ? clienteSelecionado : "SEM CLIENTE SELECIONADO"}</Text>
                    <Button
                        onPress={geraAgendamento}
                    >Agendar</Button>
                </Modal>
            </Portal>

            <ScrollView>
                
            <View style={{flexDirection:"row", marginHorizontal:10, marginVertical: 5}}>
                <FAB
                    label="Criar"
                    style={{backgroundColor:"#e6ddab",flex:1.4, borderRadius:10, marginRight:5}}
                    color={"#FFF"}
                    uppercase={true}
                    onPress={() => modalChange()}
                />
                <Searchbar
                    style={{flex:4,backgroundColor: '#f8f8f8', borderWidth: 1, borderRadius: 10}}
                    placeholder="Pesquisar"
                    onChangeText={(elem) => handleSearch(elem)}
                    value={searchQuery}
                />
            </View>
            {agendamentosBuscados ? [agendamentos[0] ? agendamentos.map((elem) => (
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
                    style={{backgroundColor:"#f8f8f8"}}
                    descriptionNumberOfLines={1}
                    description={`Dia: ${elem.dataTime}`}
                    title={`Cliente: ${elem.cliente}`}
                    right={props => <View style = {{        
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: 'center',  
                        backgroundColor: "rgba(0,0,0,0)" 
                    }}>
                            <FontAwesomeIcon 
                                icon={faClock} 
                                size={30}
                                style={{color:"#e6ddab"}}
                            />
                        </View>}
                    >
                        <List.Item title={elem.dataTime} right={props =>(<>
                        <List.Item title={<FontAwesomeIcon icon={faPen} color="#9e967e"/>} onPress={() => {editAgendamento(elem)}}/>
                        <List.Item title={<FontAwesomeIcon icon={faTrash} color="#9e967e"/>} onPress={() => {deletaAgendamento(elem)}}/>
                        </>
                        )}/>
                    
                    </List.Accordion>
                </TouchableRipple>)) : <Text>SEM AGENDAMENTOS</Text>] : <ActivityIndicator color="#9e967e" size={100} style={styles.loading} animating={true} />}
            {/* {notasFiscaisBuscadas ? [notasFiscais[0] ? notasFiscais.map((elem) => (
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
                </TouchableRipple>)) : <View style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 300}}><Text style={{fontSize: 30}} >SEM AGENDAMENTOS</Text></View>] : <ActivityIndicator color="#9e967e" size={100} style={styles.loading} animating={true} />} */}

            </ScrollView>
            
        </View>
    </PaperProvider>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 240
    }

})