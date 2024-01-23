import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiURL, loginEndpoint } from './../../services/api';
import { Alert } from 'react-native'

export const AuthContext = createContext();

export default function ContextProvider({ children }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [ipAdress, setIpAdress] = useState("")

    //função para logar o usuario com base nas informções passadas
    async function login(user, password, ip, port) {
        console.log('user:', user, 'password:', password, 'ip:', ip, 'port:', port)

        try {
            const response = await axios.get(`${ApiURL}${loginEndpoint}?user=${user}&password=${password}&connection=${ip}`)
            console.log('Dados recuperados da api:', response.data)

            //ARMAZENDA OS DADOS RECEBIDOS EM UMA LISTA

            let userData = {
                user: user,
                password: password,
                ip: ip,
                port: port,
                codVendedor: response.data.codvendedor,
                nomeVendedor: response.data.vendedor,
                codigo: response.data.codigo
            }

            // SE TIVER DADOS , ELES SAO ENVIADOS PRO ASYNC STORAGE
            //e sempre que a pagina de login for iniciada novamnete , o ip sera recuperado do async storage e sera preenchido automaticamente no input

            await AsyncStorage.setItem("user", JSON.stringify(userData))
            await AsyncStorage.setItem("ipAddress", JSON.stringify(userData.ip))

            console.log('Dados do usuario armazenados com sucesso')
            console.log(userData)
            setUser(userData)
            navigation.navigate('home')


        }



        catch (error) {
            Alert.alert('Erro na solicitação', error.message)
            setLoading(false)
            console.log('erro na solicitação,', error)
            console.log('Erro ao salvar usuario')
        }

    }



    /*
    useEffect(() => {
        async function LoadUser() {
            const userData = await AsyncStorage.getItem("user")
            if (userData) {
                const UserDataParse = JSON.parse(userData);
                setUser(UserDataParse)
            }
            if (user) {
                setLoading(true)
                console.log('Usuario recuperado do async storage')
                console.log(user)
                navigation.navigate('home')
            }
        }
    }, [])
*/
    return (
        <AuthContext.Provider value={{ login, loading, setLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
}
