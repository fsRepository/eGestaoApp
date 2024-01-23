import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Collors from '../colors.json'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Refresh from 'react-native-vector-icons/Feather'

import axios from 'axios';
import { ApiURL } from '../../../services/api';
import { AuthContext } from '../../contexts/context'


// import { Container } from './styles';
export default function ModalInfoProduct({ item, closeModal, atived }) {

    const [stockAditional, setStockAditional] = useState('')
    const [newValue, setNewValue] = useState('')
    const { user } = useContext(AuthContext)

    function RefreshValues() {
        if (newValue === item.precovenda && stockAditional === item.estoque) {
            return;

        } else {
            setNewValue(item.precovenda)
            setStockAditional(item.estoque)
        }


    }

    async function SaveValue() {



        if (stockAditional === '' && newValue === '') {
            Alert.alert('Nenhum valor alterado');
            return;
        }

        //tira o formato de moeda brasileira do new value
        const unformattedValue = parseFloat(newValue.replace(/[^\d,.-]/g, '').replace(',', '.'));
        console.log(unformattedValue);
        if (stockAditional !== '' || newValue !== '') {

            try {
                const url = `${ApiURL}Product/AlterProduct?codigo=${item.codigo}&usuario=${item.codigo}&quantidade=${stockAditional}&unidade=UN&valor=${unformattedValue}&connection=${user.ip}`
                console.log(url)
                const response = await axios.get(`${ApiURL}Product/AlterProduct?codigo=${item.codigo}&usuario=${item.codigo}&quantidade=${stockAditional || item.estoque}&unidade=UN&valor=${unformattedValue || item.precovenda}&connection=${user.ip}`)
                console.log(response.data)

                Alert.alert('Dados atualizados')
                atived()
                closeModal()

            }
            catch (error) {
                console.log(error)
                Alert.alert('Erro ao atualizar dados,', error)
            }
        }
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

        setNewValue(format);
        if (value.trim() !== '') {
            setNewValue(format);
        }


        // Supondo que você tenha uma função setSangria para atualizar o estado

    }
    //Copia o item original para não alterar os dados originais
    return (

        <View styles={styles.content}>


            <View style={styles.header}>
                <Text style={styles.title}>Ajuste de Estoque</Text>
            </View>

            <Text style={styles.titleData}>Dados do Produto</Text>
            <View style={styles.dataContent}>
                <Text style={styles.label}>Código</Text>
                <Text style={styles.labelData}>{item.codigo}</Text>
                <Text style={styles.label}>Nome do Produto</Text>
                <Text style={styles.labelData}>{item.produto}</Text>

            </View>

            <View >
                <Text style={styles.titleData}>Informações do Estoque</Text>
                <View style={styles.dataStock}>
                    <View style={styles.contentStock}>
                        <Text style={styles.label}>Estoque atual</Text>


                        <Text style={styles.labelStock}>
                            {item.estoque}
                        </Text>
                    </View>
                    <View style={styles.contentStock}>
                        <Text style={styles.label}>Estoque final</Text>

                        <TextInput
                            style={styles.input}
                            placeholder='Alterar Estoque'
                            keyboardType='numeric'
                            value={stockAditional}
                            onChangeText={(text) => setStockAditional(text)}
                        />
                    </View>
                    <View style={styles.contentStock}>
                        <Text style={styles.label}>Unidade          </Text>

                        <Text style={styles.labelStock}>
                            {item.unidade}
                        </Text>
                    </View>
                    <View style={styles.contentStock}>
                        <Text style={styles.label}>Valor venda   </Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`R$ ${item.precovenda}`}
                            keyboardType='numeric'
                            value={newValue}
                            onChangeText={formattedMoney}
                        />
                    </View>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 60 }}>
                <TouchableOpacity onPress={closeModal}>
                    <AntDesign

                        name='back' size={30} color={Collors.orange} />
                </TouchableOpacity >
                <TouchableOpacity onPress={RefreshValues}>
                    <Refresh

                        name='refresh-ccw' size={30} color={Collors.orange} />
                </TouchableOpacity>
                <TouchableOpacity onPress={SaveValue}>
                    <Entypo

                        name='save' size={30} color={Collors.orange} />
                </TouchableOpacity>

            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',

    },

    header: {
        backgroundColor: Collors.orange,
        padding: 10,
        width: 350,
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",

    },
    titleData: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 10

    },
    dataContent: {
        marginStart: 10,
        gap: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    labelData: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey'
    },
    dataStock: {
        marginStart: 10,
        justifyContent: 'center',
        gap: 10
    },
    contentStock: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 80

    },
    labelStock: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey',
        borderBottomColor: 'grey',


    },
    input: {

        width: 100,
        padding: 6,
        borderBottomWidth: 1,
        fontSize: 16
    }

})