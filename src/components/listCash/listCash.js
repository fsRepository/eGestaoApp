import { format } from "date-fns";

const DATA = new Date()
const formatData = format(DATA, "dd/MM/yyyy HH:mm:ss ")

export const listCash = [

    {
        id: 1,
        state: 'Aberto',
        number: '001',
        userName: 'João',
        date: `${formatData}`,
        value: 500.00
    },
    {
        id: 2,
        state: 'Fechado',
        number: '002',
        userName: 'Maria',
        date: '20/12/2023',
        value: 750.00
    },
    {
        id: 3,
        state: 'Aberto',
        number: '003',
        userName: 'José',
        date: `${formatData}`,
        value: 300.00
    },
    {
        id: 4,
        state: 'Fechado',
        number: '004',
        userName: 'Ana',
        date: '15/12/2023',
        value: 1200.00
    },
    {
        id: 5,
        state: 'Aberto',
        number: '005',
        userName: 'Pedro',
        date: `${formatData}`,
        value: 600.00
    },
    {
        id: 6,
        state: 'Fechado',
        number: '006',
        userName: 'Mariana',
        date: '05/12/2023',
        value: 950.00
    },
    {
        id: 7,
        state: 'Aberto',
        number: '007',
        userName: 'Carlos',
        date: `${formatData}`,
        value: 800.00
    },
    {
        id: 8,
        state: 'Fechado',
        number: '008',
        userName: 'Sara',
        date: '28/11/2023',
        value: 1100.00
    },
    {
        id: 9,
        state: 'Aberto',
        number: '009',
        userName: 'Rafael',
        date: `${formatData}`,
        value: 400.00
    },
    {
        id: 10,
        state: 'Fechado',
        number: '010',
        userName: 'Laura',
        date: '20/11/2023',
        value: 850.00
    }
];



