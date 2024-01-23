import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Collors from '../colors.json'

import { useNavigation } from '@react-navigation/native'

export default function Menu({ item, }) {


    const navigation = useNavigation();

    function handlePress() {
        if (item.route) {
            navigation.navigate(item.route);
        }
        else {
            console.log('Navegação não encontrada')
        }
    }

    return (




        <TouchableOpacity onPress={handlePress}

            style={styles.container}>
            {item.iconName === 'bar-graph' && <Entypo name='bar-graph' size={30} color={Collors.orange} />}
            {item.iconName === 'text-box' && <MaterialCommunityIcons name='text-box' size={30} color={Collors.orange} />}
            {item.iconName === 'lock' && <Entypo name='lock' size={30} color={Collors.orange} />}
            {item.iconName === 'cash-register' && <MaterialCommunityIcons name='cash-register' size={30} color={Collors.orange} />}
            {item.iconName === 'domain-verification' && <MaterialIcons name='domain-verification' size={30} color={Collors.orange} />}
            {item.iconName === 'exit' && <Ionicons name='exit' size={30} color={Collors.orange} />}

            <View>
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

        </TouchableOpacity>

    )


}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginStart: 10,
        gap: 10,
        marginBottom: 15,


    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        color: 'grey'
    }
})