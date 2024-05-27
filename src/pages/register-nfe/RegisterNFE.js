import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";

import { ButtonForm, FormRegister } from "../../components/FormRegister";
import { Button, Snackbar, TextInput } from "react-native-paper";
import NotaFiscal from "../../services/sqlite/NFE";
import { useRoute } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';


export default function RegisterNFE({ onClose = () => {} }) {

    const route = useRoute();

    const [visible, setVisible] = useState(false)
    const [mensagem, setMensagem] = useState()
    const [respotaPost, setRespostaPost] = useState()
    const [checked, setChecked] = useState(false)
    

    const openSnackBar = () => {
        setVisible(true)
    }

    const closeSnackBar = () => {
        setVisible(false)
    }

    const chamaError = () => {
        setRespostaPost(404)
        setMensagem("Erro não identificado - tente novamente")
        openSnackBar()
    }

    //
    const [numero, setNumero] = useState()
    const [dataDeEmissao, setDataDeEmissao] = useState()
    const [codVerfificacao, setCodVerificacao] = useState()
    const [issRetido, setIssRetido] = useState()
    const [competencia, setCompetencia] = useState()
    const [valorLiquido, setValorLiquido] = useState()
    const [baseDeCalculo, setBaseDeCalculo] = useState()
    const [valor, setValor] = useState()
    const [codTributacaoMunicipal, setCodTributacaoMunicipal] = useState()
    const [desconto, setDesconto] = useState()
    const [discriminacaoDosServicos, setDiscriminacaoDosServicos] = useState()
    const [cpfOuCnpj, setCpfOuCnpj] = useState()
    const [razaoReduzida, setRazaoReduzida] = useState()
    const [bairro, setBairro] = useState()
    const [uf, setUf] = useState()
    const [pagamento, setPagamento] = useState()
    const [vencimento, setVencimento] = useState()
    const [juros, setJuros] = useState()
    const [valorPago, setValorPago] = useState()
    const [dataImportacao, setDataImpotacao] = useState()
    const [impostoRetido, setImpostoRetido] = useState()
    const [jurosAbonado, setJurosAbonado] = useState()
    const [mesAno, setMesAno] = useState()
    const [concluded, setConcluded] = useState(false)

    const limparDados = () =>{
        setNumero('')
        setDataDeEmissao('')
        setCodVerificacao('')
        setIssRetido('')
        setCompetencia('')
        setValorLiquido('')
        setBaseDeCalculo('')
        setValor('')
        setDesconto('')
        setCodTributacaoMunicipal('')
        setDiscriminacaoDosServicos('')
        setCpfOuCnpj('')
        setRazaoReduzida('')
        setBairro('')
        setUf('')
        setPagamento('')
        setVencimento('')
        setJuros('')
        setValorPago('')
        setDataImpotacao('')
        setImpostoRetido('')
        setJurosAbonado('')
        setMesAno('')
    }

    const confirmaDados = async () => {

        let criado = false
        
        if(numero && !dadosEditar){
            await NotaFiscal.create({numero: numero, dataDeEmissao: dataDeEmissao, codVerficacao: codVerfificacao, issRetido: issRetido, competencia: competencia, valorLiquido: valorLiquido, baseDeCalculo: baseDeCalculo, valor: valor, codTributacaoMunicipal: codTributacaoMunicipal, desconto: desconto, discriminacaoDosServicos: discriminacaoDosServicos, cpfCnpj: cpfOuCnpj, razaoReduzida: razaoReduzida, bairro: bairro, uf: uf, pagamento: pagamento, vencimento: vencimento, juros: juros, valorPago: valorPago, dataImportacao: dataImportacao, impostoRetido: impostoRetido, jurosMultaAbandono: jurosAbonado, mesAno: mesAno, concluded: concluded})
            .then((id, numero) => {
                console.log(`\n\n\n\nNota fiscal criada com id: ${id} e numero: ${numero}\n\n\n\n`)
                criado = true
            })
            .catch((err) => console.log(`\n\n\n\n${err}\n\n\n\n`))
        } else if(numero && dadosEditar){
            await NotaFiscal.update(dadosEditar.id, {numero: numero, dataDeEmissao: dataDeEmissao, codVerficacao: codVerfificacao, issRetido: issRetido, competencia: competencia, valorLiquido: valorLiquido, baseDeCalculo: baseDeCalculo, valor: valor, codTributacaoMunicipal: codTributacaoMunicipal, desconto: desconto, discriminacaoDosServicos: discriminacaoDosServicos, cpfCnpj: cpfOuCnpj, razaoReduzida: razaoReduzida, bairro: bairro, uf: uf, pagamento: pagamento, vencimento: vencimento, juros: juros, valorPago: valorPago, dataImportacao: dataImportacao, impostoRetido: impostoRetido, jurosMultaAbandono: jurosAbonado, mesAno: mesAno, concluded: concluded})
            .then((id, numero) => {
                console.log(`\n\n\n\nNota fiscal editada com id: ${id} e numero: ${numero}\n\n\n\n`)
                criado = true
            })
            .catch((err) => console.log(`\n\n\n\n${err}\n\n\n\n`))
        }
        if(criado === true){
            setDadosEditar(null)
            limparDados()
            onClose(concluded)
            route.params.dados = null
        }
    }

    const [dadosEditar, setDadosEditar] = useState(route.params ? route.params.dados : null)

    useEffect(() => {
        preencheDados()
    }, [])

    const [conferirDados, setConferirDados] = useState(false)

    const preencheDados = () => {
        if(dadosEditar){
            setNumero(dadosEditar.numero)
            setDataDeEmissao(dadosEditar.dataDeEmissao)
            setCodVerificacao(dadosEditar.codVerficacao)
            setIssRetido(dadosEditar.issRetido)
            setCompetencia(dadosEditar.competencia)
            setValorLiquido(dadosEditar.valorLiquido)
            setBaseDeCalculo(dadosEditar.baseDeCalculo)
            setValor(dadosEditar.valor)
            setCodTributacaoMunicipal(dadosEditar.codTributacaoMunicipal)
            setDesconto(dadosEditar.desconto)
            setDiscriminacaoDosServicos(dadosEditar.discriminacaoDosServicos)
            setCpfOuCnpj(dadosEditar.cpfCnpj)
            setRazaoReduzida(dadosEditar.razaoReduzida)
            setBairro(dadosEditar.bairro)
            setUf(dadosEditar.uf)
            setPagamento(dadosEditar.pagamento)
            setVencimento(dadosEditar.vencimento)
            setJuros(dadosEditar.juros)
            setValorPago(dadosEditar.valorPago)
            setDataImpotacao(dadosEditar.dataImportacao)
            setImpostoRetido(dadosEditar.impostoRetido)
            setJurosAbonado(dadosEditar.jurosMultaAbandono)
            setMesAno(dadosEditar.mesAno)
            setConcluded(dadosEditar.concluded === "0" ? false : true)
            setChecked(dadosEditar.concluded === "0" ? false : true)
            console.log(dadosEditar.concluded === "0" ? false : true)
        }
        setConferirDados(true)
    }

    return(

        <View style = {styles.container}>

            <View style = {styles.titleContainer}>
                <View style = {styles.titleTracer} />
                <Text style = {styles.titleText}>CADASTRAR NFE's</Text>
                <View style = {styles.titleTracer} />
            </View>

            {conferirDados ? <ScrollView
                style = {{width: '90%'}}
                showsVerticalScrollIndicator = {false}
            >
                

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Número'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setNumero(e)
                    }} data={numero}/>
                    <FormRegister titleInput = {'Data de emissão'} width={'45%'} type={'numeric'} onClose={(e) => {
                      setDataDeEmissao(e.replace(/[^0-9/]+/g, ''))  
                    }} data={dataDeEmissao} palceHolder='DD/MM/AAAA'/>
                    
                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Cod. Verificação'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setCodVerificacao(e)
                    }} data={codVerfificacao}/>
                    <FormRegister titleInput = {'Iss retido'} width={'45%'} type={'numeric'} onClose={(e) => { 
                        setIssRetido(e.replace(/[^0-9.,]+/g, ''))
                    }} data={issRetido} palceHolder='R$'/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Competência'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setCompetencia(e)
                    }} data={competencia}/>
                    <FormRegister titleInput = {'Valor liquido'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setValorLiquido(e.replace(/[^0-9.,]+/g, ''))
                    }} data={valorLiquido} palceHolder='R$'/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Base de cálculo'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setBaseDeCalculo(e)
                    }} data={baseDeCalculo}/>
                    <FormRegister titleInput = {'Valor'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setValor(e.replace(/[^0-9.,]+/g, ''))
                    }} data={valor} palceHolder='R$'/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Cod. contributação'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setCodTributacaoMunicipal(e)
                    }} data={codTributacaoMunicipal}/>
                    <FormRegister titleInput = {'Desconto'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setDesconto(e.replace(/[^0-9.,]+/g, ''))
                    }} data={desconto} palceHolder='R$'/>

                </View>

                <FormRegister titleInput = {'Discriminação dos serviços'} height={200} multiline={true} onClose={(e) => {
                    setDiscriminacaoDosServicos(e)
                }} data={discriminacaoDosServicos}/>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'CPF/CNPJ'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setCpfOuCnpj(e.replace(/[^0-9]/g, ''))
                    }} data={cpfOuCnpj} palceHolder='XXX.XXX.XXX-XX'/>
                    <FormRegister titleInput = {'Razão Reduzida'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setRazaoReduzida(e)
                    }} data={razaoReduzida}/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Bairro'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setBairro(e)
                    }} data={bairro}/>
                    <FormRegister titleInput = {'UF'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setUf(e)
                    }} data={uf}/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Pagamento'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setPagamento(e.replace(/[^0-9.,]+/g, ''))
                    }} data={pagamento} palceHolder="R$"/>
                    <FormRegister titleInput = {'Vencimento'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setVencimento(e.replace(/[^0-9/]+/g, ''))
                    }} data={vencimento} palceHolder="XX/XX/XXXX"/>

                </View>
                
                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Juros'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setJuros(e.replace(/[^0-9.,]+/g, ''))
                    }} data={juros} palceHolder="R$"/>
                    <FormRegister titleInput = {'Valor pago'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setValorPago(e.replace(/[^0-9.,]+/g, ''))
                    }} data={valorPago} palceHolder="R$"/>

                </View>

                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Importada em'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setDataImpotacao(e.replace(/[^0-9/]+/g, ''))
                    }} data={dataImportacao} palceHolder="XX/XX/XXXX"/>
                    <FormRegister titleInput = {'Imposto Retido'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setImpostoRetido(e.replace(/[^0-9.,]+/g, ''))
                    }} data={impostoRetido} palceHolder="R$"/>

                </View>
                
                <View style = {styles.formHorizontal}>

                    <FormRegister titleInput = {'Juros Abonada'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setJurosAbonado(e.replace(/[^0-9.,]+/g, ''))
                    }} data={jurosAbonado} palceHolder="R$"/>
                    <FormRegister titleInput = {'Mês/Ano'} width={'45%'} type={'numeric'} onClose={(e) => {
                        setMesAno(e.replace(/[^0-9/]+/g, ''))
                    }} data={mesAno} palceHolder="XX/XX/XXXX"/>

                </View>

                <Checkbox.Item
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    console.log("antes " + concluded)
                    console.log("antes " + checked)
                    setChecked(!checked);
                    setConcluded(!checked)
                    console.log("depois " + concluded)
                    console.log("depois " + checked)
                }}
                label="Conclued"
                />


                <ButtonForm pressionado={() => confirmaDados()}/>

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
        height: 55,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleTracer: {
        height: 5,
        width: '24%',
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#000',
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },

    formHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loading: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 240
    }
})