import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import Collors from '../colors.json'
import DropDownPicker from 'react-native-dropdown-picker';




export default function HeaderFilterReports({ selectedItem, funcion, reportLists, dashboardList }) {



    const [openDropdown, setOpenDropdown] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const isReportListsAvaible = !!reportLists
    // Convertendo reportLists para um array de objetos esperado pelo DropDownPicker
    const ListOptions = isReportListsAvaible ? Object.keys(reportLists).map(report => ({
        label: report,
        value: report,
    })) :
        dashboardList.map(item => ({
            label: item.label,
            value: item.value
        }))


    return (
        <View style={styles.header}>

            <DropDownPicker
                style={{ borderColor: 'white', backgroundColor: Collors.grey }}
                open={openDropdown}
                value={selectedItem}
                items={ListOptions}
                setOpen={setOpenDropdown}
                setValue={funcion}
                onChangeItem={(item) => funcion(item.value)}
                placeholder={'Nome'}
                scrollViewProps={{
                    keyboardShouldPersistTaps: 'always'
                }}
            />









        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginStart: 10,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: Collors.grey,
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 10,
        zIndex: 500,
    },
});