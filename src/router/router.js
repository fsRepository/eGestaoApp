import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../components/splash/splash'
import Login from './../screens/login/index';
import Home from '../screens/home/index';
import Collors from '../components/colors.json'
import Stock from '../screens/stock';
import Cash from '../screens/cash';
import Reports from '../screens/reports';
import Dashboard from '../screens/Dashboard';
import Auth from '../screens/auth';

const Stack = createNativeStackNavigator()

export default function Router() {
    return (

        <Stack.Navigator
            screenOptions={
                {
                    headerTintColor: 'white',

                }
            }
        >

            <Stack.Screen
                name='splash'
                component={Splash}

                options={{
                    headerShown: false,
                    statusBarColor: 'white'


                }}

            />

            <Stack.Screen
                name='login'
                component={Login}

                options={{
                    headerShown: false,
                    statusBarColor: "#f5f5f5"



                }}

            />


            <Stack.Screen
                name='home'
                component={Home}

                options={{
                    title: 'Selecione uma opção',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange,



                }}




            />

            <Stack.Screen
                name='stock'
                component={Stock}

                options={{
                    title: 'Selecionar Produto',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },
                    headerLeftLabelVisible: false,
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange,

                    headerBackTitleVisible: false,



                }}


            />

            <Stack.Screen
                name='cash'
                component={Cash}

                options={{
                    title: 'Caixa',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },

                    headerBackTitleVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange





                }}


            />
            <Stack.Screen
                name='reports'
                component={Reports}

                options={{
                    title: 'Relatórios',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange,

                    headerBackTitleVisible: false,



                }}



            />
            <Stack.Screen
                name='dashboard'
                component={Dashboard}

                options={{
                    title: 'Dashboard',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange,

                    headerBackTitleVisible: false,




                }}


            />

            <Stack.Screen
                name='auth'
                component={Auth}

                options={{
                    title: 'Autorizações',
                    headerStyle: {
                        backgroundColor: Collors.orange,


                    },
                    headerLeftLabelVisible: false,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    statusBarColor: Collors.orange,

                    headerBackTitleVisible: false,




                }}


            />


        </Stack.Navigator>



    )


}