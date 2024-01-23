// RenderReports.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Collors from '../colors.json'

const RenderReports = ({ item }) => {
    if (item) {
        // Adapte essa renderização com base no tipo de relatório e nos dados específicos
        if (item.CLIENTE && item.VALOR) {
            //contas a receber
            return (
                <View style={styles.renderCX}>
                    <Text style={styles.title}>{item.CLIENTE}</Text>
                    <Text style={styles.title}>{item.DATA_VENCIMENTO}</Text>
                    <Text style={styles.money} >{item.VALOR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
            );
        } else if (item.FORNECEDOR && item.VALOR) {
            //contas a pagar
            return (
                <View style={styles.renderCX}>
                    <Text style={styles.title}>{item.FORNECEDOR}</Text>
                    <Text style={styles.title}>{item.DATA_VENCIMENTO}</Text>
                    <Text style={styles.money}>{item.VALOR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

                </View>
            );
        }
        else if (item.CODIGO && item.CLIENTE) {
            //vendas
            return (
                <View style={styles.renderCX}>
                    <Text style={styles.code}>{item.CODIGO}</Text>
                    <Text style={styles.title}>{item.CLIENTE}</Text>
                    <Text style={styles.money}>{item.TOTAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

                </View>

            )
        } else if (item.VENDA && item.PRODUTO) {
            //vendas por produtos
            return (


                <View style={styles.renderCX}>
                    <Text style={styles.code}>{item.VENDA} </Text>
                    <Text style={styles.title}>{item.PRODUTO}</Text>
                    <Text style={{ color: Collors.grey_dark }}>{item.QTDE} UN</Text>
                    <Text style={styles.money}>{item.TOTAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

                </View >

            )
        }
        else if (item.PRODUTO && item.ESTOQUE_ATUAL) {
            //lista de produtos
            return (


                <View style={styles.renderCX}>
                    <Text style={styles.code}>{item.CODIGO}</Text>
                    <Text style={styles.title}>{item.PRODUTO}</Text>
                    <Text style={styles.money}> Estoque atual:{item.ESTOQUE_ATUAL}</Text>
                </View>

            )
        }
        else if (item.MOVIMENTO && item.RGB) {
            return (
                <View style={styles.renderCX}>
                    <Text style={styles.title}>{item.MOVIMENTO}</Text>
                    <Text style={styles.title}>{item.Label}</Text>
                    <Text style={styles.money}>{item.Value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

                </View >
            )


        }


        return null;
    }

    return null;
};

export default RenderReports;

const styles = StyleSheet.create({
    renderCX: {
        marginStart: 10,
        marginEnd: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Collors.grey,
        marginBottom: 5,
        justifyContent: 'space-around',




    },

    title: {
        fontWeight: '700',
        color: Collors.grey_dark,
        width: 100,
        minWidth: 100,
        height: 70,

    },
    code: {

        fontWeight: '700',
        color: Collors.grey_dark,

        height: 70,
    },
    money: {
        color: Collors.grey_dark,
        minWidth: 80
    }
})