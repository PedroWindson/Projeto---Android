import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { faClock, faPen, faTrash, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Card, Dialog, Portal, PaperProvider, Text, TouchableRipple, List, ActivityIndicator, Searchbar, Modal, FAB, TextInput, Menu } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DatePicker from "@react-native-community/datetimepicker";
import Cliente from "../../services/sqlite/Cliente";
import Agendamentos from "../../services/sqlite/Agendamentos";


export default function Home() {

    const [visible, setVisible] = useState(false);
    
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);

    const [searchQuery, setSearchQuery] = useState();

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
        console.log(elem)
        setClienteSelecionado(elem.cliente)
        setDate(elem.dataTime)
        modalChange()
    }

    const handleSearch = async (elem) => {
        setSearchQuery(elem)
    }

    const dateFormat = (data) => {
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    const hourFormat = (hour) => {
        hora = hour.getUTCHours().toString()
        minutos = hour.getUTCMinutes().toString()
        console.log(hora,minutos, hour)
    }

    const [agendamentoDeletado, setAgendamentoDeletado] = useState()
    const [mostraDelete, setMostraDelete] = useState(false)
    
    const hideDelete = () => setMostraDelete(false)
    
    const deleteAgendamento = async () => {
        await Agendamentos.remove(agendamentoDeletado)
        .then((e) => console.log(`\n\n\n\nFOI: ${e}`))
        .catch((err) => console.log(`\n\n\n\nERROR: ${err}`))
        hideDelete()
        buscaAgendamentos()
    }

    const confirmaDelete = async (elem) => {
        setAgendamentoDeletado(elem.id)
        setMostraDelete(!mostraDelete)
    }

    return(

    <PaperProvider>
        <View style = {styles.container} >
            <Portal>
                <Modal 
                    visible={visible} 
                    onDismiss={modalChange} 
                    contentContainerStyle={containerStyle}
                    
                ><View
                style={{flexDirection:"column", alignItems:"center",justifyContent:"center", }}
                >
                    <Text
                        style={{fontSize:30, marginBottom:60}}
                    >Marcar agendamento</Text>
                    <Text
                        style={{fontSize:32,marginBottom:30}}
                    >{dateFormat(date)} - {date.toLocaleTimeString('pt-br', {hour: '2-digit', minute:'2-digit'})}</Text>
                    <View
                        style={{flexDirection:"row", marginBottom:40}}
                    >
                        <View
                            style={{marginRight:20}}
                        >
                            <Button
                                
                                textColor="#f8f8f8"
                                buttonColor="#e6ddab"
                                onPress={() => setDataPickerDay(true)}
                            >Selecionar dia</Button></View>
                        {dataPickerDay ? (<DatePicker 
                            style={{
                                width: "100%"
                            }}
                            value={date}
                            mode="date"
                            onChange={onChangeDate}
                        />) : null}
                        <Button
                            textColor="#f8f8f8"
                            buttonColor="#e6ddab"
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
                    </View>
                    <Menu
                        visible={visibleMenu}
                        onDismiss={changeMenu}
                        anchor={<Button contentStyle={{ width:200, height:40}} labelStyle={{ fontSize: 20 }} textColor="#f8f8f8" buttonColor="#e6ddab" onPress={changeMenu}>Selecionar cliente</Button>}
                    >
                        {clientesBuscados ? [clientes[0] ? clientes.map((elem) => (
                            <Menu.Item onPress={() => {
                                setClienteSelecionado(elem.nome)
                                changeMenu()
                            }} title={elem.nome.toUpperCase()} />
                        )) : null] : <Menu.Item title="CLIENTES NÃO ENCONTRADOS" disabled/>}
                    </Menu>
                    <Text
                        style={{marginBottom:40,marginTop:20, fontSize:20}}
                    >Cliente: {clienteSelecionado ? clienteSelecionado.toUpperCase() : "SEM CLIENTES"}</Text>
                    <Button
                        labelStyle={{ fontSize: 20 }}   
                        contentStyle={{ width:200, height:80}}                     
                        textColor="#f8f8f8"
                        buttonColor="#e6ddab"
                        uppercase
                        onPress={geraAgendamento}
                    >Agendar</Button>
                </View></Modal>
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
                    description={`Dia: ${dateFormat(new Date(elem.dataTime))}`}
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
                        <List.Item title={`Horário: ${new Date(elem.dataTime).toLocaleTimeString('pt-br', {hour: '2-digit', minute:'2-digit'})}`} right={props =>(<>
                        <List.Item title={<FontAwesomeIcon icon={faPen} color="#9e967e"/>} onPress={() => {editAgendamento(elem)}}/>
                        <List.Item title={<FontAwesomeIcon icon={faTrash} color="#9e967e"/>} onPress={() => {confirmaDelete(elem)}}/>
                        </>
                        )}/>
                    
                    </List.Accordion>
                </TouchableRipple>)) : <Text>SEM AGENDAMENTOS</Text>] : <ActivityIndicator color="#9e967e" size={100} style={styles.loading} animating={true} />}
            </ScrollView>

            <Dialog visible={mostraDelete} onDismiss={hideDelete}>
                    <Dialog.Title>Deletar agendamento</Dialog.Title>
                    <Dialog.Content>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={hideDelete} textColor="blue">Cancelar</Button>
                    <Button onPress={deleteAgendamento} textColor="red">Deletar</Button>
                    </Dialog.Actions>
            </Dialog>
            
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