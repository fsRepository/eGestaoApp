import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import HeaderFilter from '../../components/headerFilter';
import ListItem from '../../components/listItems';
import Collors from './../../components/colors.json'
import axios from 'axios';
import { ApiURL } from '../../../services/api';
import { productEndpoint } from './../../../services/api';
import { AuthContext } from '../../contexts/context'


export default function Stock() {
    const [searchvalue, setSearchValue] = useState('')
    const [searchFilter, setSearchFilter] = useState('Nome')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [originalProducts, setOriginalProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [atived, setAtived] = useState(false)
    const { user, intern, extern } = useContext(AuthContext)
    const [filteredItems, setFilteredItems] = useState([])
    console.log(loading)

    function onFilter(value) {

        setSearchFilter(value)

    }
    //função que sera enviada para o headerFilter
    // a partir dessa função essa pagina, recebe o valor pesquisado
    function onSearch(value) {
        setLoading(true)
        if (searchvalue === value) {
            setLoading(false)
        }
        setSearchValue(value)


    }
    //Assim que a pagina abre vão ser carregador todos os produtos através desse use effect

    // antes de carregar os produtos ele verifica se a chamada e de uma api interna ou externa
    async function LoadProducts() {

        setLoading(true)
        if (intern === true) {
            try {
                const response = await axios.get(`http://${user.ip}:3001/product/get`)

                if (response.status === 200) {
                    //se der certo ele 
                    const products = response.data;

                    setFilteredProducts(products)
                    setOriginalProducts(products)
                    setLoading(false)

                } else {
                    setLoading(false)
                    console.error('Erro ao obter produtos. Código de status:', response.status);
                    Alert.alert('erro na solicitação')

                }
            } catch (error) {


                console.error('Erro durante a solicitação:', error);
                Alert.alert('Erro na solicitação', error)

            }
        } else {
            try {
                const response = await axios.get(`${ApiURL}${productEndpoint}?connection=${user.ip}`);

                if (response.status === 200) {
                    //se der certo ele 
                    const products = response.data;

                    setFilteredProducts(products)
                    setOriginalProducts(products)
                    setLoading(false)

                } else {
                    setLoading(false)
                    console.error('Erro ao obter produtos. Código de status:', response.status);
                    Alert.alert('erro na solicitação')

                }
            } catch (error) {


                console.error('Erro durante a solicitação:', error);
                Alert.alert('Erro na solicitação', error)

            }
        }

    }



    useEffect(() => {
        // Chama a função para carregar os produtos quando o componente for montado
        LoadProducts();
    }, []);

    useEffect(() => {

        console.log(atived)
        LoadProducts()

    }, [atived])






    // APÓS UM VALOR DE PESQUISA FOR ESCOLHIDO, ESSE USEEFFECT É ACIONADO PARA CARREGAR O ITEM PESQUISADO
    useEffect(() => {


        //filtro pelo nome do produto
        function filterByName(searchTerm) {

            const filteredItems = originalProducts.filter(
                item => item.produto.toLowerCase().includes(searchTerm)
            )




            return filteredItems

        }

        //filtro por codigo

        function filterByCode(searchValue) {

            const filteredItems = originalProducts.filter(
                item => item.codigo.toLowerCase().includes(searchValue)
            )

            return filteredItems;
        }



        // se o filtro for igual a nome ele chama a função e assim por diante
        if (searchFilter === 'Nome') {

            const searchTerm = searchvalue.toLowerCase();
            if (searchTerm === '') {
                setLoading(false)
                setFilteredProducts(originalProducts)

            } else {

                const filteredItems = filterByName(searchTerm);
                if (filteredItems.length > 0) {
                    setLoading(false)
                    setFilteredProducts(filteredItems);
                } else {
                    setLoading(false)
                    Alert.alert('Nenhum item encontrado', 'tente novamente!');
                }
            }
        } else if (searchFilter === 'Código') {
            if (searchvalue === '') {
                setLoading(false)
                setFilteredProducts(originalProducts);
            } else {

                const filteredItems = filterByCode(searchvalue.toLowerCase());
                if (filteredItems.length > 0) {
                    setLoading(false)
                    setFilteredProducts(filteredItems);
                } else {
                    setLoading(false)
                    Alert.alert('Nenhum item encontrado', 'tente novamente!');
                }
            }
        } else {
            setFilteredProducts(originalProducts);
        }


    }, [searchvalue, searchFilter, originalProducts]);


    return (

        <View style={{ flex: 1 }}>
            <HeaderFilter onSearch={onSearch} onFilter={onFilter} />
            {
                filteredProducts.length === 0
                    ? (
                        <ActivityIndicator size='large' color={Collors.orange} style={{ marginTop: 100 }} />
                    ) :
                    ''


            }


            {
                loading === true ? (
                    <ActivityIndicator size='large' color={Collors.orange} style={{ marginTop: 100 }} />
                ) : (

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 10, }}
                        data={filteredProducts}
                        keyExtractor={(item) => item.CODIGO}
                        renderItem={({ item }) => (

                            <ListItem item={item} atived={() => setAtived(!atived)} />

                        )



                        }


                    />
                )

            }



        </View>
    )
}