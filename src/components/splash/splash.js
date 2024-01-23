import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../assets/icon2.png'
import { View, StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import Colors from '../colors.json'


//color: #FABA58
//color:#F68E34
//color:#94C3C9
//color:#DBE6E8

//


export default function Splash() {
    const navigation = useNavigation()
    useEffect(() => {
        const timeOut = setTimeout(() => {
            navigation.replace('login')
        }, 3000)

        return () => clearTimeout(timeOut)
    }, []);



    return (

        <SafeAreaView style={styles.container}>



            <Image source={Icon}
                style={{ width: 100, height: 100, marginBottom: 10 }}
            />
            <ActivityIndicator
                color={Colors.orange}
                size={24}
            />






        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }

})