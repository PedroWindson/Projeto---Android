import React, { useEffect, useState } from "react";
import { View, StyleSheet,Text, ScrollView } from "react-native";
import Cliente from "../../services/sqlite/Cliente";

import {FormRegister, ButtonForm} from "../../components/FormRegister";
import { Snackbar, ActivityIndicator, RadioButton, TextInput } from "react-native-paper";
import { useRoute } from '@react-navigation/native';


export default function FichaDeAnamnese({ onClose = () => {} }) {

    const route = useRoute();

    const [dadosEditar, setDadosEditar] = useState(route.params ? route.params.dados : null)

    useEffect(() => {
        preencheDados()
    }, [])

    const [conferirDados, setConferirDados] = useState(false)

    const preencheDados = () => {
        if(dadosEditar){
            setNome(dadosEditar.nome)
            setDataDeNascimento(dadosEditar.dataDeNascimento)
            setEndereco(dadosEditar.endereco)
            setTelefone(dadosEditar.telefone)
            setEmail(dadosEditar.email)
            setHipertensao(dadosEditar.hipertensao)
            setHipertensaoObs(dadosEditar.hipertensaoObs)
            setDiabetes(dadosEditar.diabetes)
            setDiabetesObs(dadosEditar.diabetesObs)
            setTireoide(dadosEditar.tireoide)
            setTireoideObs(dadosEditar.tireoideObs)
            setCancer(dadosEditar.cancer)
            setCancerObs(dadosEditar.cancerObs)
            setAlteracoesCardiacas(dadosEditar.alteracoesCardiacas)
            setEpilepsiaConvulsoes(dadosEditar.epilepsiaConvulsoes)
            setIntestinoRegulado(dadosEditar.intestinoRegulado)
            setPossuiMarcapasso(dadosEditar.possuiMarcapasso)
            setTabagista(dadosEditar.tabagista)
            setGestante(dadosEditar.gestante)
        }
        setConferirDados(true)
    }

    const [visible, setVisible] = useState(false)
    const [mensagem, setMensagem] = useState()
    const [respotaPost, setRespostaPost] = useState()

    const openSnackBar = () => {
        setVisible(true)
    }

    const closeSnackBar = () => {
        setVisible(false)
    }

    // Dados
    const [nome, setNome] = useState()
    const [dataDeNascimento, setDataDeNascimento] = useState()
    const [endereco, setEndereco] = useState()
    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()
    const [hipertensao, setHipertensao] = useState()
    const [hipertensaoObs, setHipertensaoObs] = useState()
    const [diabetes, setDiabetes] = useState()
    const [diabetesObs, setDiabetesObs] = useState()
    const [tireoide, setTireoide] = useState()
    const [tireoideObs, setTireoideObs] = useState()
    const [cancer, setCancer] = useState()
    const [cancerObs, setCancerObs] = useState()
    const [alteracoesCardiacas, setAlteracoesCardiacas] = useState()
    const [epilepsiaConvulsoes, setEpilepsiaConvulsoes] = useState()
    const [intestinoRegulado, setIntestinoRegulado] = useState()
    const [possuiMarcapasso, setPossuiMarcapasso] = useState()
    const [tabagista, setTabagista] = useState()
    const [gestante, setGestante] = useState()

    const limparDados = () => {
        setNome('')
        setDataDeNascimento('')
        setEndereco('')
        setTelefone('')
        setEmail('')
        setHipertensao('')
        setHipertensaoObs('')
        setDiabetes('')
        setDiabetesObs('')
        setTireoide('')
        setTireoideObs('')
        setCancer('')
        setCancerObs('')
        setAlteracoesCardiacas('')
        setEpilepsiaConvulsoes('')
        setIntestinoRegulado('')
        setPossuiMarcapasso('')
        setTabagista('')
        setGestante('')
    }

    const confirmaDados = async () => {

        let criado = false

        if(nome && !dadosEditar){
            await Cliente.create({nome:nome, dataDeNascimento:dataDeNascimento, endereco:endereco, telefone:telefone, endereco:endereco, email:email, hipertensao: hipertensao, hipertensaoObs: hipertensaoObs, diabetes:diabetes, diabetesObs: diabetesObs, tireoide: tireoide, tireoideObs: tireoideObs, cancer: cancer, cancerObs: cancerObs, alteracoesCardiacas:alteracoesCardiacas, epilepsiaConvulsoes:epilepsiaConvulsoes, intestinoRegulado:intestinoRegulado, possuiMarcapasso:possuiMarcapasso, tabagista:tabagista, gestante:gestante })
            .then(() => {
                console.log("criado")
                setRespostaPost(200)
                setMensagem("Cadastrado com sucesso!")
                openSnackBar()   
                criado = true
            } )
            .catch( err => {
                console.log(err)
                chamaError()
            })
        }else if(nome && dadosEditar){
            await Cliente.update(dadosEditar.id, {nome:nome, dataDeNascimento:dataDeNascimento, endereco:endereco, telefone:telefone, endereco:endereco, email:email, hipertensao: hipertensao, hipertensaoObs: hipertensaoObs, diabetes: diabetes, diabetesObs: diabetesObs, tireoide: tireoide, tireoideObs: tireoideObs, cancer: cancer, cancerObs: cancerObs, alteracoesCardiacas:alteracoesCardiacas, epilepsiaConvulsoes:epilepsiaConvulsoes, intestinoRegulado:intestinoRegulado, marcaPasso:possuiMarcapasso, tabagista:tabagista, gestante:gestante})
            .then((_id, _numero) => {
                setRespostaPost(200)
                setMensagem("Editado com sucesso!")
                openSnackBar()   
                criado = true
            })
            .catch((err) => console.log(`\n\n\n\n${err}\n\n\n\n`))
        }
        else{
            setRespostaPost(404)
            setMensagem("Faltam dados para terminar registro")
            openSnackBar()
        }
        if(criado === true){
            setDadosEditar(null)
            limparDados()
            onClose()
            route.params.dados = null
        } 
        
    }

    const chamaError = () => {
        setRespostaPost(404)
        setMensagem("Erro não identificado - tente novamente")
        openSnackBar()
    }

    const [value, setValue] = React.useState('first');


    return(

        <View style = {styles.container}>

            <View style = {styles.titleContainer}>
                <View style = {styles.titleTracer} />
                <Text style = {styles.titleText}>Preencha a Ficha</Text>
                <View style = {styles.titleTracer} />
            </View>

            {conferirDados ? <ScrollView
                style = {{width: '90%'}}
                showsVerticalScrollIndicator = {false}
            >

                <FormRegister 
                    titleInput = {'Nome'}     
                    data={nome}     
                    onClose={(e) => {
                        console.log(e)
                        setNome(e)
                    }}
                    palceHolder="Raphael Sanchez Jesus"
                />
                
                <FormRegister 
                    titleInput={'Data de nasc'} 
                    data={dataDeNascimento} 
                    onClose={(e) => {
                            setDataDeNascimento(e)
                            console.log(e)
                        }} 
                    palceHolder="26/07/1984"
                />
                    
                <FormRegister 
                    titleInput = {'Endereço'}
                    data={endereco}
                    onClose={(e) => {
                        console.log(e)
                        setEndereco(e)
                    }}
                palceHolder="R. Padre Manuel Da Nóbrega 523 - Quintino"
                />

                <FormRegister 
                    titleInput = {'Email'}
                    data={email}
                    onClose={(e) => {
                        console.log(e)
                        setEmail(e)
                    }}
                palceHolder="raphael.sanchez@estacio.br"
                />

                <FormRegister 
                    titleInput = {'Telefone/Celular'}
                    data={telefone}
                    onClose={(e) => {
                        console.log(e)
                        setTelefone(e)
                    }}
                palceHolder="(21) 99999-9999"
                />

                    <View style = {styles.espacoEntrePartes} />

                    {/* Hipertensão */}
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Hipertensão</Text>
                            <RadioButton.Group 
                                onValueChange={t => {
                                    setHipertensao(t)
                                    if(t == 'não'){
                                        setHipertensaoObs(null)
                                    }
                                }} 
                                value={hipertensao} 
                            >
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </RadioButton.Group>
                        </View>
                        
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Controlada?</Text>
                            <RadioButton.Group
                                onValueChange={t => {
                                    setHipertensaoObs(t)
                                }} 
                                value={hipertensaoObs} 
                            >
                                {hipertensao === 'sim' ? 
                                <>
                                    <RadioButton.Item label="sim" value="sim" />
                                    <RadioButton.Item label="não" value="não" /></> : 
                                <>
                                    <RadioButton.Item label="sim" value="sim" disabled/>
                                    <RadioButton.Item label="não" value="não" disabled/></>}
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/* Diabetes */}
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Diabetes</Text>
                            <RadioButton.Group 
                                onValueChange={t => {
                                    setDiabetes(t)
                                    if(t == 'não'){
                                        setDiabetesObs(null)
                                    }
                                }} 
                                value={diabetes} 
                            >
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </RadioButton.Group>
                        </View>
                        
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Controlada?</Text>
                            <RadioButton.Group
                                onValueChange={t => {
                                    setDiabetesObs(t)
                                }} 
                                value={diabetesObs} 
                            >
                                {diabetes === 'sim' ? 
                                <>
                                    <RadioButton.Item label="sim" value="sim" />
                                    <RadioButton.Item label="não" value="não" /></> : 
                                <>
                                    <RadioButton.Item label="sim" value="sim" disabled/>
                                    <RadioButton.Item label="não" value="não" disabled/></>}
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/* Tireoide */}
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Tireoide</Text>
                            <RadioButton.Group 
                                onValueChange={t => {
                                    setTireoide(t)
                                    if(t == 'não'){
                                        setTireoideObs(null)
                                    }
                                }} 
                                value={tireoide} 
                            >
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </RadioButton.Group>
                        </View>
                        
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Controlada?</Text>
                            <RadioButton.Group
                                onValueChange={t => {
                                    setTireoideObs(t)
                                }} 
                                value={tireoideObs} 
                            >
                                {tireoide === 'sim' ? 
                                <>
                                    <RadioButton.Item label="sim" value="sim" />
                                    <RadioButton.Item label="não" value="não" /></> : 
                                <>
                                    <RadioButton.Item label="sim" value="sim" disabled/>
                                    <RadioButton.Item label="não" value="não" disabled/></>}
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/* Cancêr */}
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Cancêr</Text>
                            <RadioButton.Group 
                                onValueChange={t => {
                                    setCancer(t)
                                    if(t == 'não'){
                                        setCancerObs(null)
                                    }
                                }} 
                                value={cancer} 
                            >
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </RadioButton.Group>
                        </View>
                        
                        <View style={{flex:1}}>
                            <Text
                                style={styles.text}
                            >Controlada?</Text>
                            <RadioButton.Group
                                onValueChange={t => {
                                    setCancerObs(t)
                                }} 
                                value={cancerObs} 
                            >
                                {cancer === 'sim' ? 
                                <>
                                    <RadioButton.Item label="sim" value="sim" />
                                    <RadioButton.Item label="não" value="não" /></> : 
                                <>
                                    <RadioButton.Item label="sim" value="sim" disabled/>
                                    <RadioButton.Item label="não" value="não" disabled/></>}
                            </RadioButton.Group>
                        </View>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/*Tem alterações cardiacas */}
                    <Text 
                        style={styles.text}
                    >Tem alterações cardiacas?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setAlteracoesCardiacas(t)
                            }}
                            value={alteracoesCardiacas}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style = {styles.espacoEntrePartes} />

                     {/*Tem epilepsia/Convulsões */}
                     <Text 
                        style={styles.text}
                    >Tem epilepsia/Convulsões?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setEpilepsiaConvulsoes(t)
                            }}
                            value={epilepsiaConvulsoes}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/*Tem Intestino Regulado*/}
                    <Text 
                        style={styles.text}
                    >Tem Intestino Regulado?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setIntestinoRegulado(t)
                            }}
                            value={intestinoRegulado}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                    {/*Possui Marca-Passo*/}
                    <Text 
                        style={styles.text}
                    >Possui Marca-Passo?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setPossuiMarcapasso(t)
                            }}
                            value={possuiMarcapasso}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                     {/*Tabagista*/}
                     <Text 
                        style={styles.text}
                    >Tabagista?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setTabagista(t)
                            }}
                            value={tabagista}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                     {/*Gestante*/}
                     <Text 
                        style={styles.text}
                    >Gestante?</Text>
                    <View style={{flexDirection:"column"}} >
                        <RadioButton.Group
                            onValueChange={t => {
                                setGestante(t)
                            }}
                            value={gestante}
                        >
                            <View style={{flexDirection:"row"}}>
                                <RadioButton.Item label="sim" value="sim" />
                                <RadioButton.Item label="não" value="não" />
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style = {styles.espacoEntrePartes} />

                <ButtonForm pressionado={() => {confirmaDados()}}/>

            </ScrollView> : <ActivityIndicator color="#5ED9FC" size={100} style={styles.loading} animating={true} />}

            <Snackbar
                    visible={visible}
                    duration={2000}
                    onDismiss={closeSnackBar}
                    style={respotaPost === 200 ? {backgroundColor: "rgba(71,248,30,0.8)"} : {backgroundColor: "rgba(255,82,82,0.8)"}}
                    >
                    <Text style={{textAlign: "center", color: "white"}}>{mensagem}</Text>
            </Snackbar>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    titleContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleTracer: {
        height: 5,
        width: '20%',
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#9e967e',
    },
    espacoEntrePartes: {
        height: 2,
        width: '100%',
        marginVertical: 20,
        borderRadius: 10,
        backgroundColor: '#9e967e',
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9e967e',
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 240
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
})