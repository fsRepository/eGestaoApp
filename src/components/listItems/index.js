import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native'
import Collors from '../colors.json'
import ModalInfoProduct from '../modalInfoProduct'


export default function ListItem({ item, atived }) {

    const [visible, setVisible] = useState(false)
    const [itemSelected, setItemSelected] = useState(null)


    // FUNCÇÃO PARA MUDAR O ESTADO DO MODAL PRA VERDADEIRO
    //RECEBE O ITEM E SALVA NA STATE
    function handleModal() {
        setVisible(true)

        setItemSelected(item)
        console.log(itemSelected)
    }

    return (

        <TouchableOpacity onPress={handleModal} style={styles.list}>
            <Text style={styles.code}>{item.codigo}</Text>
            <Text style={styles.name} >{item.produto}</Text>
            <Text>Unidade:{item.unidade} - EAN: {item.codbarra} </Text>
            <Text>Estoque: {item.estoque}</Text>

            {/* MODAL QUE  E ABERTO QUANDO O USUARIO CLICA EM ALGUM ITEM DA LISTA */}
            <Modal

                visible={visible}
                animationType="fade"
                transparent
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor semitransparente para desfocar o fundo
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <View style={styles.modal}>
                        <View style={styles.contentModal}>
                            <ModalInfoProduct item={itemSelected} closeModal={() => setVisible(false)} atived={atived} />

                        </View>


                    </View>
                </View>


            </Modal>

        </TouchableOpacity>




    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 8,
        marginStart: 10,
        backgroundColor: Collors.grey, marginRight: 10,



    },
    code: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    contentModal: {
        backgroundColor: 'white',
        height: 500,
        width: 350,
        borderRadius: 20,
        alignItems: 'center',
        ...Platform.select({
            android: {
                elevation: 8
            },
            ios: {

                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,

            }
        })
    }


})