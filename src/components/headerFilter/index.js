
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Collors from '../colors.json'
import Icon from 'react-native-vector-icons/AntDesign'

export default function HeaderFilter({ onSearch, onFilter, refresh }) {
    const [searchProduct, setSearchProduct] = useState('')
    const [selectedPicker, setSelectedPicker] = useState('');
    const [open, setOpen] = useState(false);
    const [filterValue, setFilterValue] = useState([
        { label: 'Nome', value: 'Nome' },
        { label: 'Código', value: 'Código' },

    ]);

    function handleSearch() {
        console.log(searchProduct)
        onSearch(searchProduct)

    }
    function handleFilterChange(value) {

        onFilter(value)
    }
    return (
        <View style={styles.header}>
            <View
                style={{
                    width: 100,



                }}>
                <DropDownPicker
                    style={{ borderColor: 'white', backgroundColor: Collors.grey }}
                    open={open}
                    value={selectedPicker}
                    items={filterValue}
                    setOpen={setOpen}
                    setValue={setSelectedPicker}
                    setItems={setFilterValue}
                    placeholder={'Nome'}
                    onChangeValue={(value) => handleFilterChange(value)}
                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', width: 250 }}>

                <TextInput
                    style={{ width: 200 }}
                    placeholder="Faça uma busca"
                    value={searchProduct}
                    onChangeText={(text) => setSearchProduct(text)}
                    keyboardType={selectedPicker === 'Código' ? 'numeric' : 'default'} />
                <Icon
                    onPress={handleSearch}
                    name="search1"
                    size={24}
                    color={Collors.orange}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginStart: 10,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: Collors.grey,
        alignItems: 'center',
        gap: 10,
        marginRight: 10,
        borderRadius: 10,
        zIndex: 100

    },
    content: {
        color: 'black', // Garante que o texto seja exibido em preto
        fontSize: 16 // Tamanho do texto dos itens do Picker
    }
});
