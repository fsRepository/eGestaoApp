import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Platform, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderFilterReports from '../../components/headerFilterReports';
import RenderReports from '../../components/listRenderReports/renderReports';
import Icon from 'react-native-vector-icons/AntDesign'
import { reportLists } from '../../components/headerFilterReports';
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Collors from '../../components/colors.json'
import FilterDate from '../../components/filterData';
import { AuthContext } from '../../contexts/context'
import axios from 'axios';
import { ApiURL } from '../../../services/api';
export default function Reports() {
    const newDATA = new Date()
    const newDataFormat = format(newDATA, "yyyy-MM-dd")

    const [selectedItem, setSelectedItem] = useState('Folha de Caixa');
    const [dataStart, setDataStart] = useState(newDataFormat)
    const [dataEnd, setDataEnd] = useState(newDataFormat)
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    //APOS ESCOLHER UM TIPO DE RELATORIO, ESSE TIPO DE RELATORIO EM BREVE SERA SALVO NESSA STATE QUE FICARA RESPONSAVEL PELO CARREGAMENTO
    //DA LISTA
    const [selectedList, setSelectedList] = useState([])
    const reportLists = {
        'Folha de Caixa': [
            { id: 1, description: 'Venda de produto A', amount: 120 },
            { id: 2, description: 'Pagamento de fornecedor X', amount: -50 },
            { id: 3, description: 'Taxas de manutenção', amount: -30 },
            { id: 4, description: 'Venda de serviço Y', amount: 200 },
            { id: 5, description: 'Despesas com transporte', amount: -80 },
            { id: 6, description: 'Recebimento de cliente Z', amount: 300 },
            { id: 7, description: 'Compra de material B', amount: -150 },
            { id: 8, description: 'Venda de produto C', amount: 180 },
            { id: 9, description: 'Pagamento de salários', amount: -400 },
            { id: 10, description: 'Recebimento de venda online', amount: 250 },
        ],
        'Relação de Contas a Receber': [
            { id: 1, client: 'Cliente A', amountDue: 200, date: '2023-12-01' },
            { id: 2, client: 'Cliente B', amountDue: 350, date: '2023-12-02' },
            { id: 3, client: 'Cliente C', amountDue: 400, date: '2023-12-03' },
            { id: 4, client: 'Cliente D', amountDue: 150, date: '2023-12-04' },
            // ... outros itens
        ],

        'Relação de Contas a Pagar': [
            { id: 1, vendor: 'Fornecedor X', amountToPay: 300, date: '2023-12-05' },
            { id: 2, vendor: 'Fornecedor Y', amountToPay: 450, date: '2023-12-06' },
            { id: 3, vendor: 'Fornecedor Z', amountToPay: 600, date: '2023-12-07' },
            { id: 4, vendor: 'Fornecedor W', amountToPay: 200, date: '2023-12-08' },
            // ... outros itens
        ],

        'Relação de Vendas': [
            { id: 1, date: '2023-01-01', amount: 1200 },
            { id: 2, date: '2023-01-03', amount: 1350 },
            { id: 3, date: '2023-01-05', amount: 1000 },
            { id: 4, date: '2023-01-07', amount: 1750 },
            { id: 5, date: '2023-01-09', amount: 800 },
            { id: 6, date: '2023-01-11', amount: 1250 },
            { id: 7, date: '2023-01-13', amount: 950 },
            { id: 8, date: '2023-01-15', amount: 1300 },
            { id: 9, date: '2023-01-17', amount: 1600 },
            { id: 10, date: '2023-01-19', amount: 1450 },
        ],
        'Relação de Vendas por Produtos': [
            { id: 1, product: 'Produto A', quantitySold: 50 },
            { id: 2, product: 'Produto B', quantitySold: 30 },
            { id: 3, product: 'Produto C', quantitySold: 40 },
            { id: 4, product: 'Produto D', quantitySold: 20 },
            { id: 5, product: 'Produto E', quantitySold: 35 },
            { id: 6, product: 'Produto F', quantitySold: 45 },
            { id: 7, product: 'Produto G', quantitySold: 25 },
            { id: 8, product: 'Produto H', quantitySold: 60 },
            { id: 9, product: 'Produto I', quantitySold: 55 },
            { id: 10, product: 'Produto J', quantitySold: 42 },
        ],
        'Relação de Produtos': [
            { id: 1, product: 'Produto A', price: 25 },
            { id: 2, product: 'Produto B', price: 30 },
            { id: 3, product: 'Produto C', price: 20 },
            { id: 4, product: 'Produto D', price: 35 },
            { id: 5, product: 'Produto E', price: 40 },
            { id: 6, product: 'Produto F', price: 18 },
            { id: 7, product: 'Produto G', price: 22 },
            { id: 8, product: 'Produto H', price: 28 },
            { id: 9, product: 'Produto I', price: 32 },
            { id: 10, product: 'Produto J', price: 27 },
        ],
    };


    //const que vai pegar as dimensoes de largura  ealtura do dispositivo utilizado/trazer mais responsividade
    const windowWidth = Dimensions.get('window').width
    const wimdowHeight = Dimensions.get('window').height



    function handleSelectedItem(value) {
        setSelectedItem(value)

    }


    useEffect(() => {
        if (selectedItem !== '') {
            loadDataList()
        }



    }, [])


    // função para carregar os dados sempre que escolho algum item
    // sempre que escolho algun item ele manda como um endpoint para a função load, carregando exatamente aquela lista que selecionei


    async function loadDataList() {
        setLoading(true)



        if (selectedItem) {
            try {
                const reportEndpoints = {
                    'Folha de Caixa': 'Report/CashReport',
                    'Relação de Contas a Receber': 'Report/BillsToReceiveReport',
                    'Relação de Contas a Pagar': 'Report/BillsToPayReport',
                    'Relação de Vendas': 'Report/SalesReport',
                    'Relação de Vendas por Produtos': 'Report/SalesReportByProduct',
                    'Relação de Produtos': 'Report/ProductListReport',
                }
                const endpoint = reportEndpoints[selectedItem]
                if (endpoint) {
                    const url = `${ApiURL}${endpoint}?dataInicial=${dataStart}&dataFinal=${dataEnd}&connection=${user.ip}`
                    console.log(url)
                    const response = await axios.get(`${ApiURL}${endpoint}?dataInicial=${dataStart}&dataFinal=${dataEnd}&connection=${user.ip}`)

                    console.log('Lista carregada e salva no selectedList')
                    setSelectedList(response.data)
                    setLoading(false)



                } else {
                    setLoading(false)
                    console.log('Relatório nao encontrado')
                }

            } catch (error) {
                setLoading(false)
                console.log('erro ao carregar dados', error)
                setSelectedList([])
            }
        }
        else {
            setLoading(false)
            Alert.alert('Atenção', 'É necessário escolher um tipo de relatório para continuar')

        }

    }


    return (
        <SafeAreaView style={{ height: wimdowHeight, flex: 1, width: windowWidth }} >
            <HeaderFilterReports selectedItem={selectedItem} funcion={handleSelectedItem} reportLists={reportLists} />
            <View style={{
                backgroundColor: Collors.grey,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginStart: 10,
                marginEnd: 10,
                padding: 6,

            }}>
                <FilterDate handleDataStart={setDataStart} handleDataEnd={setDataEnd} />

                <TouchableOpacity
                    onPress={loadDataList}
                    style={{ marginLeft: 100 }}>
                    <Icon name='search1' size={24} color={Collors.orange} />
                </TouchableOpacity>
            </View>

            <View >
                <Text style={styles.titleItem}>
                    {selectedItem}
                </Text>

                {selectedList.length === 0 && (

                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 200 }}>
                        Ooops!  Nenhum resultado encontrado!
                    </Text>
                )}


            </View>
            {

                loading === false ?




                    <FlatList


                        showsVerticalScrollIndicator={true}
                        data={selectedList}

                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <RenderReports item={item} />

                        )}

                    />


                    :

                    <ActivityIndicator color={Collors.orange} size='large' />
            }






        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    titleItem: {
        fontSize: 18,
        marginStart: 10,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 15

    }
})