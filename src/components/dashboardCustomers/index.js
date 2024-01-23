import React from "react";
import { View, Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function DashboardCustomers({ ItemDetails, title }) {
    if (!ItemDetails || !Array.isArray(ItemDetails) || ItemDetails.length === 0) {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 20, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18, color: '#333' }}>
                    {title}
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#777', marginTop: 10 }}>
                    Nenhuma informação disponível no momento.
                </Text>
            </View>
        );
    }

    const limitedData = ItemDetails.slice(0, 4);

    const data = {
        labels: limitedData.map(cliente => cliente.Name || cliente.Label),
        datasets: [{
            data: limitedData.map(cliente => cliente.Value),
        }],
    };

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(30, 182, 203, ${opacity})`,
    };

    return (
        <View style={{ backgroundColor: 'white', marginBottom: 20, padding: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                {title}
            </Text>
            <ScrollView horizontal={true}>
                <BarChart
                    data={data}
                    width={Math.max(300, limitedData.length * 60)}
                    height={400}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    showValuesOnTopOfBars={true}
                    showBarTops={false}
                    withInnerLines={true} // Mostra as linhas internas do gráfico
                    withOuterLines={true} // Mostra as linhas externas do gráfico
                    withHorizontalLabels={false}
                    withVerticalLabels={true}
                    verticalLabelRotation={60}
                    horizontal={true}
                />
            </ScrollView>
        </View>
    );
}
