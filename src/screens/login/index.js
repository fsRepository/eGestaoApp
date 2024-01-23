
import React, { useState, } from 'react';
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, ActivityIndicator, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Logo from '../../../assets/icon2.png'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Collors from '../../components/colors.json'
import { useIsFocused } from '@react-navigation/native';
//contexto
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/context'


import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

export default function Login() {

    //ARMAZENAMENTO DOS INPUTS

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [ip, setIp] = useState('')
    const [port, setPort] = useState('')
    const [visible, setVisible] = useState(false)
    const isFocused = useIsFocused()
    const [focusedInput, setFocusedInput] = useState(null)

    //usando contexto
    const { login, loading, setLoading, ipAdress } = useContext(AuthContext);



    // formatação do ip digitado
    const formatIPAddress = (value) => {
        // Remove qualquer caractere que não seja um número ou um ponto (.)
        const formattedValue = value.replace(/[^\d.]/g, '');

        // Quebra o IP em partes separadas por pontos
        const parts = formattedValue.split('.');

        // Formata cada parte do IP para garantir que esteja no intervalo de 0 a 255
        const formattedParts = parts.map((part) => {
            const intValue = parseInt(part, 10);
            return intValue > 255 ? '255' : String(intValue);
        });

        // Constrói novamente o IP formatado
        let formattedIP = formattedParts.join('.');
        setIp(formattedIP);
    };



    //SEMPRE QUE USUARIO VOLTAR PARA A PAGINA DE LOGIN O LOADING VOLTA PRA FALSO
    useEffect(() => {
        if (isFocused) {
            setLoading(false)



        }


    }, [isFocused])


    //QUANDO O USUARIO FAZ O PRIMEIRO LOGIN, TODOS OS DADOS SAO SALVOS NO ASYNC STORAGE, O IP E SALVO NUMA CHAVE DIFERENTE
    // AQUI E VERIFICADO SE TEM UM IP SALVO, SE TIVER, ELE JA FICA PREENCHIDO NO INPUT
    useEffect(() => {
        async function loadIp() {
            try {
                const storedIp = await AsyncStorage.getItem('ipAddress');
                if (storedIp !== null) {
                    const storeipParse = JSON.parse(storedIp)
                    setIp(storeipParse);
                    console.log('Endereço IP recuperado:', storeipParse);
                }
            } catch (error) {
                console.log('Erro ao recuperar o endereço IP:', error);
            }
        }
        loadIp();
    }, []);


    //FUNÇÃO PARA MUDAR A SENHA DE VISIVEL PRA INVISIVEL
    function handleVisiblePassword() {
        setVisible(!visible)
    }

    //CHAMANDO FUNÇÃO LOGIN QUE ESTA NO CONTEXT
    function handleLogin() {
        if (user !== '' & password !== '' & port !== '&' & ip !== '') {
            setLoading(true)
            login(user, password, ip, port);

        } else {
            Alert.alert('Preencha os campos vazios')
        }
    }


    //SEMPRE QUE UM INPUT E FOCADO ESSA FUNÇÃO E CHAMADA PRA MUDAR O BCKGROUND DELE

    const handleInputFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleInputBlur = () => {
        setFocusedInput(null);
    };

    return (
        <KeyboardAvoidingView
            behavior='height'
        >
            <TouchableWithoutFeedback

                onPress={() => {
                    Keyboard.dismiss()
                }}
            >




                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>

                        <Image source={Logo} style={{ width: 100, height: 100, marginTop: 30 }} />
                    </View>
                    <View style={styles.textContainer}>


                        <Text style={styles.title}>eGestão Mobile</Text>
                        <Text styles={styles.subtitle}>Acesso Simples para uma Gestão eficiente</Text>

                    </View>

                    <View style={styles.containerInputs}>

                        <Text style={styles.title}>Autenticação</Text>
                        <View style={focusedInput === 'user' ? styles.focusedInput : styles.containerInputIcon}>
                            <Icon style={styles.icon} name='user' size={22} color={Collors.orange} />

                            <TextInput
                                style={styles.input}
                                placeholder='Usuário'
                                value={user}
                                keyboardType='default'
                                onChangeText={(text) => setUser(text)}
                                onFocus={() => handleInputFocus('user')}
                                onBlur={handleInputBlur}

                            />
                        </View>

                        <View style={focusedInput === 'password' ? styles.focusedInput : styles.containerInputIcon}>
                            <Icon style={styles.icon} name='lock' size={22} color={Collors.orange} />
                            <TextInput
                                style={styles.input}
                                placeholder='Senha'
                                keyboardType='numeric'
                                value={password}
                                secureTextEntry={visible ? false : true}
                                onChangeText={(text) => setPassword(text)}
                                onFocus={() => handleInputFocus('password')}
                                onBlur={handleInputBlur}

                            />

                            <Icon3 onPress={handleVisiblePassword}
                                name={visible ? 'visibility-off' : 'visibility'}
                                size={22} color={Collors.orange}
                                style={{ position: 'absolute', right: 10 }}

                            />
                        </View>

                        <View style={focusedInput === 'IP' ? styles.focusedInput : styles.containerInputIcon}>
                            <Icon2 style={styles.icon} name='ip-network-outline' size={22} color={Collors.orange} />
                            <TextInput
                                value={ip}
                                style={styles.input}
                                placeholder='IP'
                                keyboardType='default'
                                onChangeText={formatIPAddress}
                                onFocus={() => handleInputFocus('IP')}
                                onBlur={handleInputBlur}

                            />
                        </View>

                        <View style={focusedInput === 'port' ? styles.focusedInput : styles.containerInputIcon}>
                            <Icon2 style={styles.icon} name='check-network' size={22} color={Collors.orange} />
                            <TextInput
                                style={styles.input}
                                placeholder='Porta'
                                value={port}
                                keyboardType='numeric'
                                onChangeText={(text) => setPort(text)}
                                onFocus={() => handleInputFocus('port')}
                                onBlur={handleInputBlur}

                            />
                        </View>



                    </View>

                    <TouchableOpacity onPress={handleLogin} style={styles.button} >
                        {
                            loading ? <ActivityIndicator color='white' />
                                : <Text style={{ color: 'white', fontSize: 18 }}>Entrar</Text>
                        }

                    </TouchableOpacity>




                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',


    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'red',

    },
    containerInputs: {

        gap: 20,
        justifyContent: 'center',
        marginTop: 50,
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        padding: 10,
        borderColor: Collors.grey_blue,
        paddingStart: 30
    },
    button: {
        backgroundColor: Collors.orange,
        padding: 10,
        width: 250,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    containerInputIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: "absolute",
        paddingStart: 5
    }
    ,
    focusedInput: {
        backgroundColor: Collors.grey,
        flexDirection: 'row',
        alignItems: 'center'
    },
})