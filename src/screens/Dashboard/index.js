import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, ScrollView, ActivityIndicator } from 'react-native';
import Collors from './../../components/colors.json';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderFilterReports from '../../components/headerFilterReports';
import { format } from 'date-fns'
import FilterDate from '../../components/filterData';
import axios from 'axios';
import { ApiURL } from '../../../services/api';
import { AuthContext } from '../../contexts/context'
import DashboardRender from '../../components/dashboardRender';




export default function Dashboard() {
    const newDATA = new Date()
    const newDataFormat = format(newDATA, "yyyy-MM-dd")
    const [selectedItem, setSelectedItem] = useState('');
    const [dataStart, setDataStart] = useState(newDataFormat)
    const [dataEnd, setDataEnd] = useState(newDataFormat)
    const { user } = useContext(AuthContext)
    const [ItemDetails, setItemDetails] = useState([])
    const [loading, setLoading] = useState(false)
    //const que vai pegar as dimensoes de largura  ealtura do dispositivo utilizado/trazer mais responsividade
    const windowWidth = Dimensions.get('window').width
    const wimdowHeight = Dimensions.get('window').height

    function handleSelectedItem(value) {
        setSelectedItem(value);

    }


    async function loadAllDashboards() {
        setLoading(true)
        try {
            const dataDash = {
                'Grupos mais Vendidos': 'Dashboard/MainGroups',
                'Contas a Receber': 'Dashboard/BillsToReceive',
                'Contas a Pagar': 'Dashboard/BillsToPay',
                'Clientes que mais Compraram': 'Dashboard/MainCustomers',
                'Vendedores que mais vendem': 'Dashboard/MainSellers',
                'Produtos mais Vendidos': 'Dashboard/MainProducts',
                'Formas de Pagamento': 'Dashboard/PaymentForm',
                'Fluxo de Caixa': 'Dashboard/CashFlow'
            };

            const requests = Object.values(dataDash).map(async (endpoint) => {
                const response = await axios.get(`${ApiURL}${endpoint}?dataInicial=${dataStart}&dataFinal=${dataEnd}&connection=${user.ip}`);
                return { [endpoint]: response.data }; // Retorna um objeto com a chave sendo o endpoint e o valor sendo os dados
            });

            const responses = await Promise.all(requests);
            const combinedData = Object.assign({}, ...responses); // Combina todos os dados em um único objeto
            setLoading(false)
            setItemDetails(combinedData);
            console.log(combinedData)
        } catch (error) {
            console.log('erro', error);
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        await loadAllDashboards();
    };


    return (
        <View style={{ flex: 1, height: wimdowHeight, width: windowWidth }} >

            <View style={styles.header}>
                <FilterDate handleDataStart={setDataStart} handleDataEnd={setDataEnd} />
                <TouchableOpacity onPress={handleSearch}>
                    <Icon name='search1' size={24} color={Collors.orange} />
                </TouchableOpacity>


            </View>
            <ScrollView >



                {
                    ItemDetails.length === 0 ?
                        <Text style={{ textAlign: 'center', marginTop: 200, fontSize: 16 }} >Escolha um espaço de tempo e clique na lupinha para gerar seus dashboards</Text> :


                        <DashboardRender
                            pagar={ItemDetails['Dashboard/BillsToPay']} receber={ItemDetails['Dashboard/BillsToReceive']} pagamento={ItemDetails['Dashboard/PaymentForm']} caixa={ItemDetails['Dashboard/CashFlow']} customers={ItemDetails['Dashboard/MainCustomers']} sellers={ItemDetails['Dashboard/MainSellers']} group={ItemDetails['Dashboard/MainGroups']} products={ItemDetails['Dashboard/MainProducts']} />



                }
                {
                    loading === true ?
                        <ActivityIndicator size="large" color={Collors.orange} /> :
                        ''

                }



            </ScrollView>
        </ View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Collors.grey,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginStart: 10,
        marginEnd: 10,
        padding: 6,


    }
})
