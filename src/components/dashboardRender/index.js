import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { PieChart } from 'react-native-chart-kit'
import DashboardCash from '../dashboardCash';
import DashboardCustomers from '../dashboardCustomers';
import DashboardGroups from '../dashboardGroups';


export default function DashboardRender({ pagar, receber, pagamento, caixa, customers, group, sellers, products }) {
    // Função para formatar o valor para o formato monetário
    console.log(pagar, receber, pagamento, caixa, customers, group, sellers, products)
    const formatarValorMonetario = (valor) => {
        return valor ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : valor;
    };

    // Formatar o valor dentro de cada objeto do array, verificando se os arrays existem antes de mapear
    const pagarFormatado = pagar && pagar.length ? pagar.map(item => ({ ...item, Value: formatarValorMonetario(item.Value) })) : [];
    const receberFormatado = receber && receber.length ? receber.map(item => ({ ...item, Value: formatarValorMonetario(item.Value) })) : [];
    const pagamentoFormatado = pagamento && pagamento.length ? pagamento.map(item => ({ ...item, Value: formatarValorMonetario(item.Value) })) : [];

    return (
        <SafeAreaView >
            <DashboardGroups title='Contas a Pagar' ItemDetails={pagar} />
            <DashboardGroups title='Contas a Receber' ItemDetails={receber} />
            <DashboardGroups title='Formas de Pagamento' ItemDetails={pagamento} />
            <DashboardCash title='Fluxo de Caixa' ItemDetails={caixa} />
            <DashboardCustomers title='Clientes que mais Compraram' ItemDetails={customers} />
            <DashboardCustomers title='Vendedores que mais venderam' ItemDetails={sellers} />
            <DashboardCustomers title='Produtos mais Vendidos' ItemDetails={products} />
            <DashboardGroups title='Grupos mais Vendidos' ItemDetails={group} />

        </SafeAreaView>
    )
}
