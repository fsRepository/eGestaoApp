import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Colors from '../colors.json';

export default function DashboardGroups({ ItemDetails, title }) {
    let data = [];

    if (ItemDetails && ItemDetails.length > 0) {
        data = ItemDetails.map((item) => ({
            name: item.Label,
            population: item.Value,
            color: `rgba(${item.RGB},1)`,
        }));
    }

    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    return (
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
            {data.length > 0 && ( // Verifica se há dados para exibir o gráfico
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: Colors.grey_dark, marginTop: 10 }}>
                        {title}
                    </Text>
                    <PieChart
                        data={data}
                        width={400}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </View>
            )}
        </View>
    );
}
