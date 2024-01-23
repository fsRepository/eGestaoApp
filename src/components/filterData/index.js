import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign'
import Collors from '../../components/colors.json'


export default function FilterDate({ start, end, handleDataStart, handleDataEnd }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateType, setSelectedDateType] = useState('start');

    //Função oara pegar a data selecionada
    //essa data sera usada como parametro pra busca 

    function formatDate(date) {
        return format(date, 'dd/MM/yyyy', { locale: ptBR })
    }

    const handleDateChange = (event, selectedDate) => {

        const currentDate = selectedDate || startDate;
        setShowDatePicker(Platform.OS === 'ios');

        if (selectedDateType === 'start') {
            const formatteData = formatDate(currentDate)
            const formattedDataReports = format(currentDate, 'yyyy-MM-dd')
            setStartDate(currentDate);
            handleDataStart(formattedDataReports);
            console.log(formattedDataReports)// Usando a função handleDataStart recebida como prop
        } else {
            const formatteData = formatDate(currentDate)
            const formattedDataReports = format(currentDate, 'yyyy-MM-dd')
            setEndDate(currentDate);
            handleDataEnd(formattedDataReports);
            console.log(formattedDataReports)// Usando a função handleDataEnd recebida como prop
        }

    };

    const showDatepicker = (type) => {
        setSelectedDateType(type);
        setShowDatePicker(true);
    };
    return (
        <View>
            <View style={styles.dataFilter}>
                <TouchableOpacity
                    onPress={() => showDatepicker('start')} title="Selecionar Data Inicial"
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Text>{formatDate(startDate).toString()}</Text>
                    <Icon
                        name='caretdown'
                        size={12}
                        color={Collors.grey_dark}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => showDatepicker('end')} title="Selecionar Data Final"
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Text>{formatDate(endDate).toString()}</Text>
                    <Icon
                        name='caretdown'
                        size={12}
                        color={Collors.grey_dark}
                    />
                </TouchableOpacity>



            </View>
            {
                showDatePicker && (
                    <DateTimePicker

                        testID="dateTimePicker"
                        value={selectedDateType === 'start' ? startDate : endDate}
                        mode="date"
                        is24Hour={true}
                        display="spinner"
                        onChange={handleDateChange}
                        locale="pt-BR"
                    />


                )
            }
            {
                Platform.OS === 'ios' && showDatePicker && (
                    <TouchableOpacity

                        onPress={() => setShowDatePicker(false)}>
                        <Text style={{ color: 'blue', textAlign: 'center', fontSize: 16 }}>OK</Text>
                    </TouchableOpacity>
                )
            }</View>

    )
}

const styles = StyleSheet.create({

    dataFilter: {
        flexDirection: 'row',
        marginTop: 5,
        marginStart: 10,
        gap: 20
    },
})