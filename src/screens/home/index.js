import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, } from 'react-native';


import Menu from '../../components/menu/menu';



// lista com os items do menu
import { menuList } from '../../components/menu/menuList';

// import { Container } from './styles';

export default function Home() {

    function renderMenu({ item }) {
        return <Menu item={item} />
    }

    return (

        <SafeAreaView style={{ height: 1000 }}>
            <FlatList
                data={menuList}
                keyExtractor={item => item.id}
                renderItem={renderMenu}
            />


        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

})