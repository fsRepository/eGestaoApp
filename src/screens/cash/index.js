
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Collors from '../../components/colors.json';
import { format, subHours } from 'date-fns'
import axios from 'axios';
import { AuthContext } from '../../contexts/context'
import { ApiURL, operatorEndpoint, OperatorEnterEndpoint } from '../../../services/api';

export default function Cash() {
    const [cashList, setCashList] = useState(null);
    const [selectedCash, setSelectedCash] = useState('');
    const [selectedCashDetails, setSelectedCashDetails] = useState('')
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('')
    const [confirmed, setConfirmed] = useState(false);
    const [confirmedTwo, setConfirmedTwo] = useState(false);
    const [bleeding, setBleeding] = useState('')
    //pegar data atual para usar no fechamento ou abertura de caixa
    const currentDate = new Date();
    const adjustmentHours = subHours(currentDate, 3)
    const FormateDate = format(currentDate, "dd/MM/yyyy HH:mm:ss  ")
    const [loading, setLoading] = useState(false)
    //contexto
    const { user } = useContext(AuthContext)


    //função para carregar todos os operadores 

    useEffect(() => {



        async function LoadOperators() {
            setLoading(true)
            try {
                const response = await axios.get(`${ApiURL}${operatorEndpoint}Operators?connection=${user.ip}`)
                console.log('response:', response.data)

                //mapear os dados recebitos e colocar no formato label e value
                const formattedOperators = response.data.map(item => ({
                    label: item,
                    value: item
                }))

                setCashList(formattedOperators)
                setLoading(false)
            }
            catch (error) {
                console.log('erro na solicitação', error)
                setBleeding(false)
            }
        }

        LoadOperators()

        // Se os dados estiverem chegando corretamente, o problema pode estar na estrutura dos dados.
        // Vamos mapear os dados recebidos para o formato { label, value } esperado pelo DropDownPicker.

    }, []);


    useEffect(() => {


        if (cashList && cashList.length > 0) {
            setSelectedCash(cashList[0].value);
            console.log(selectedCash)
        }
    }, [cashList])


    //FUNÇÃO PARA SALVAR OPERADOR E SENHA E A PARTIR DISSO ACESSAR AS INFORMAÇÕES DO CAIXA SELECIONADO
    async function handleSave() {
        if (selectedCash !== '' && password !== '') {
            console.log('selectedCash:', selectedCash);
            if (confirmedTwo) {
                setConfirmedTwo(false)
            }
            try {
                const response = await axios.get(`${ApiURL}${OperatorEnterEndpoint}user=${selectedCash}&password=${password}&connection=${user.ip}`)
                if (response.data) {
                    console.log('operador selecionado', response.data)
                    setSelectedCashDetails(response.data)
                    setConfirmed(true)
                } else {
                    console.log('Algo deu errado', 'Verifique suas credenciais')
                    Alert.alert('Algo deu errado', 'Verifique suas credenciais')
                }


            }
            catch (error) {
                console.log(error)
                if (error.response && error.response.status === 401) {
                    Alert.alert('Erro de autenticação', 'Verifique suas credenciais')
                }
                else {
                    Alert.alert('Erro ao buscar operador', 'Verifique o que pode ter dado errado')
                }


            }




        } else {
            Alert.alert('Preencha os campos vazios para continuar')
        }
    }


    function handleOpenCloseModal() {
        setConfirmedTwo(!confirmedTwo)
    }

    function formattedMoney(value) {
        const amount = value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
        const intValue = parseInt(amount); // Converte para inteiro

        // Transforma o inteiro em uma string formatada como moeda
        const format = (intValue / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        setBleeding(format); // Supondo que você tenha uma função setSangria para atualizar o estado
        console.log(format);
    }


    //função para abrir ou fechar caixa de acordo com a situação atual
    async function OpenCloseCash() {

        //formata a data 
        const currentDate = new Date();
        const formattedData = format(currentDate, 'yyyy-MM-dd')
        //remover formatação monetaria
        const unformattedValue = parseFloat(bleeding.replace(/[^\d,.-]/g, '').replace(',', '.').replace(/\.(?=.*\.)/g, ''));

        //se o caixa estiver aberto ele realiza a função para fechar
        if (selectedCashDetails.situacao === 1) {
            console.log(unformattedValue)
            try {
                console.log(selectedCashDetails.data)

                const CloseCash = await axios.get(`${ApiURL}Operator/CloseCashier?cashier=${selectedCashDetails.codigo}&bleeding=${unformattedValue}&date=${formattedData}&connection=${user.ip}`)
                console.log('Caixa fechado com sucesso', CloseCash)
                Alert.alert('Caixa fechado com sucesso')
                setConfirmed(false)
                setConfirmedTwo(false)

                setBleeding('')

            }
            catch (error) {
                console.log('Erro ao fechar o caixa', error)
                Alert.alert('Erro ao fechar o caixa', error)
            }

        }
        else {
            console.log(unformattedValue)
            //se caso o caixa estiver fechado, ele ativa a função para abrir
            try {

                const OpenCash = await axios.get(`${ApiURL}Operator/OpenCashier?cashier=${selectedCashDetails.codigo}&supply=${unformattedValue}&date=${formattedData}&connection=${user.ip}`)
                console.log('Caixa aberto', OpenCash)
                Alert.alert('Caixa aberto com sucesso')

                setConfirmed(false)
                setConfirmedTwo(false)
                setBleeding('')


            }
            catch (error) {
                console.log('Erro ao abrir o caixa', error)
                Alert.alert('Erro ao abrir o caixa', error)

            }
        }

    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <View style={styles.selectCash}>
                <Text style={styles.label}>Operador:</Text>
                {
                    loading === true ?
                        <Text style={styles.label}>Buscando operadores ....</Text>
                        :
                        ''
                }
                {cashList && Array.isArray(cashList) && (
                    <DropDownPicker
                        style={{ borderColor: 'white', backgroundColor: Collors.grey, }}
                        open={open}
                        value={selectedCash}
                        items={cashList}
                        setOpen={setOpen}
                        setValue={setSelectedCash}
                        setItems={setCashList}
                        placeholder={'Nome'}


                    />
                )}
            </View>
            <View style={styles.selectCash1}>
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    placeholder='Senha'
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    keyboardType='numeric'
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                    <Text style={styles.textButton}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setConfirmed(false)
                        setConfirmedTwo(false)
                    }}
                    style={styles.button}>
                    <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>

            </View>
            {
                confirmed ? (
                    <View style={{ flexDirection: 'column', backgroundColor: Collors.grey, marginTop: 10, width: '90%', alignItems: 'center' }}>
                        <View style={styles.selectCash1}>
                            <Text style={styles.label1}>CAIXA {selectedCashDetails.codigo}</Text>
                            <Text style={selectedCashDetails.situacao === 2 ? styles.labelClose : styles.labelOpen}>{selectedCashDetails.situacao === 2 ? <Text >Fechado </Text> : <Text>Aberto</Text>} </Text>
                        </View>
                        <View style={styles.selectCash1}>
                            <Text style={styles.label1}>{selectedCashDetails.data}</Text>
                            <Text style={styles.label1}>Saldo atual: R${selectedCashDetails.saldo},00</Text>
                        </View>
                        <View style={[styles.buttonsContainer, { marginBottom: 10 }]}>
                            <TouchableOpacity
                                onPress={handleOpenCloseModal}
                                disabled={selectedCashDetails.situacao === 1}
                                style={selectedCashDetails.situacao === 1 ? styles.buttonDisabled : styles.button}>
                                <Text style={styles.textButton}>Abrir Caixa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleOpenCloseModal}
                                disabled={selectedCashDetails.situacao === 2}
                                style={selectedCashDetails.situacao === 2 ? styles.buttonDisabled : styles.button}>
                                <Text style={styles.textButton}>Fechar caixa</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                ) :
                    ''
            }



            {
                confirmedTwo === true ? (

                    <View style={{ flexDirection: 'column', backgroundColor: Collors.grey, marginTop: 10, width: '90%', alignItems: 'center', }}>

                        {selectedCashDetails.situacao === 2 ?
                            <Text style={[styles.label1, { marginTop: 10, color: 'green' }]}>
                                ABERTURA
                            </Text>
                            :
                            <Text style={[styles.label1, { marginTop: 10, color: '#FF6347' }]}>
                                FECHAMENTO
                            </Text>
                        }


                        <View style={styles.selectCash1}>
                            <Text style={styles.label1}>Data</Text>
                            <Text style={styles.label1}>{FormateDate}</Text>
                        </View>

                        <View style={styles.selectCash1}>
                            {
                                selectedCashDetails.situacao === 2 ?
                                    <Text style={styles.label1}>Adicionar valor:</Text>
                                    :
                                    <Text style={styles.label1}>Sangria:</Text>
                            }

                            <TextInput
                                style={styles.inputTwo}
                                placeholder='R$0,00'
                                keyboardType="numeric"
                                value={bleeding}
                                onChangeText={formattedMoney}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={OpenCloseCash}
                            >
                                <Text style={styles.textButton}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirmedTwo(false)
                                }}
                                style={styles.button}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : ''
            }

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    selectCash: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        gap: 10,
        marginTop: 10,
        zIndex: 100

    },
    label: {
        fontSize: 16
    },
    input: {
        width: 200,
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: Collors.grey
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: Collors.orange,
        padding: 8,
        width: 120,
        borderRadius: 10,
        alignItems: 'center'

    },
    textButton: {
        color: 'white',
        fontSize: 16
    },
    selectCash1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        gap: 10,
        marginTop: 10,

    },
    label1: {
        fontSize: 18,
        fontWeight: '600',

    },
    labelClose: {
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: '#FF6347',
        padding: 6,
        borderRadius: 6,
        color: 'white'
    },
    labelOpen: {
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: 'green',
        padding: 6,
        borderRadius: 6,
        color: 'white'
    },
    buttonDisabled: {
        opacity: 0.5,
        backgroundColor: Collors.orange,
        padding: 8,
        width: 120,
        borderRadius: 10,
        alignItems: 'center'
    },
    inputTwo: {
        borderBottomColor: Collors.grey_blue,
        borderBottomWidth: 1,
        width: 100,
        fontSize: 16,

    }
});

