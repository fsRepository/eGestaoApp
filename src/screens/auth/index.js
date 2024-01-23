import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/context'
// import { Container } from './styles';


export default function Auth() {

    const { user } = useContext(AuthContext)
    console.log(user)
    return (


        <View style={styles.container}>

            <Text style={styles.title}>
                Autorização
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',


    }
})