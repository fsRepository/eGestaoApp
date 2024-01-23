import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// Função para formatar valores para moeda
const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

export default function DashboardCash({ ItemDetails, title }) {
    if (!ItemDetails || !Array.isArray(ItemDetails) || ItemDetails.length < 2) {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
            </View>
        );
    }

    const firstData = ItemDetails[0] || {};
    const secondData = ItemDetails[1] || {};

    const data = {
        labels: ['Entradas', 'Saídas'],
        datasets: [
            {
                data: [firstData.Value || 0, secondData.Value || 0],
                colors: [
                    (opacity = 1) => `rgba(${firstData.RGB || '0,0,0'}, ${opacity})`,
                    (opacity = 1) => `rgba(${secondData.RGB || '0,0,0'}, ${opacity})`,
                ],
            },
        ],
    };

    // Formatação dos valores para moeda
    const firstValueFormatted = formatCurrency(firstData.Value || 0);
    const secondValueFormatted = formatCurrency(secondData.Value || 0);

    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        color: (opacity = 1) => `rgba(30, 182, 203, ${opacity})`,
        fromZero: true,
    };

    return (
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#333' }}>
                {title}
            </Text>
            <BarChart
                data={data}
                width={350} // Aumente a largura para ver se os números do eixo Y não são mais cortados
                height={300}
                yAxisLabel="$"
                chartConfig={chartConfig}
                style={{
                    marginVertical: 8,
                    marginHorizontal: 16,
                    borderRadius: 16,
                }}
            />
        </View>
    );

}
