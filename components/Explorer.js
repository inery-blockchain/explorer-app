import React from 'react';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Blocks from '../screens/Blocks';
import Accounts from '../screens/Accounts';
import Transactions from '../screens/Transactions';
import LandingScreen from './LandingScreen';
import BlockDetails from '../screens/BlockDetails';
import AccountDetails from '../screens/AccountDetails'

function Explorer({route, navigation}) {
    const [tabName, setTabName] = useState('Blocks');
    const network = route.params;
    const blockNum = route.params;
    const accountTabBarListeners = ({navigation, route}) => ({
        tabPress: () => {
            setTabName('Accounts')
            navigation.navigate(route.name)
        }
    })
    const Tab = createBottomTabNavigator();
    const TabNavigator = () => (
        <Tab.Navigator 
            initialRouteName="BlocksInitial" 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white', 
                tabBarInactiveTintColor: "rgb(12, 6, 62)", 
                tabBarActiveBackgroundColor: 'rgb(12, 6, 62)',
                }}
        >
            <Tab.Screen name="Home"
                component={LandingScreen} 
                listeners={{tabPress: ()=> {navigation.navigate('Home')}}}
                options={{
                    tabBarIcon: () => (
                        <Image
                                source={require('../assets/icons/iconmonstr-home-1-240.png')}
                                style={{ width: 26, height: 26, tintColor: 'rgb(12, 6, 62)' }}
                            />
                    )
                }}
            />
            <Tab.Screen name="BlocksInitial" 
                component={BlockStackScreen}
                listeners={{tabPress: ()=> {setTabName('Blocks')}}} 
                options={{
                    tabBarIcon: ({focused }) => (
                        <Image
                                source={require('../assets/icons/iconmonstr-cube-18-240.png')}
                                style={{ 
                                    width: 26, 
                                    height: 26, 
                                    tintColor: focused ? 'white' : 'rgb(12, 6, 62)'
                                }}
                            />
                    ),
                    tabBarLabel: 'Blocks',
                }}
                />
            <Tab.Screen name="AccountsInitial" 
                component={AccountStackScreen}
                listeners={accountTabBarListeners}
                options={{
                    tabBarIcon: ({focused }) => (
                        <Image
                                source={require('../assets/icons/iconmonstr-menu-2-240.png')}
                                style={{ 
                                    width: 26, 
                                    height: 26, 
                                    tintColor: focused ? 'white' : 'rgb(12, 6, 62)' 
                                }}
                            />
                    ),
                    tabBarLabel: 'Accounts'
                }}
            />
            <Tab.Screen name="TransactionsInitial" 
                component={TransactionsStackScreen}
                listeners={{tabPress: ()=> {setTabName('Transactions')}}}
                options={{
                    tabBarIcon: ({focused }) => (
                        <Image
                                source={require('../assets/icons/iconmonstr-cursor-22-240.png')}
                                style={{ 
                                    width: 26, 
                                    height: 26, 
                                    tintColor: focused ? 'white' : 'rgb(12, 6, 62)' 
                                }}
                            />
                    ),
                    tabBarLabel: 'Transactions'
                }}
            />
        </Tab.Navigator>
    )

    const BlockStack = createNativeStackNavigator();
    const BlockStackScreen = () => (
        <BlockStack.Navigator screenOptions={{
            headerLeft: ()=> 
            <Image 
                source={require('../assets/adaptive-icon.png')}
                style={{width: 37, height: 37}}
            />,
            headerTitleAlign: 'center' 
            }}>
            <BlockStack.Screen name='Blocks'>
                {props=> <Blocks {...props} {...network} {...blockNum}/>}
            </BlockStack.Screen>
            <BlockStack.Screen 
                name='BlockDetails' 
                component={BlockDetails} 
                options= {({route}) => ({title: route.params.name})}
            />
        </BlockStack.Navigator>
    )

    const AccountStack = createNativeStackNavigator();
    const AccountStackScreen = () => (
        <AccountStack.Navigator screenOptions={{
            headerLeft: ()=> 
            <Image 
                source={require('../assets/adaptive-icon.png')}
                style={{width: 37, height: 37}}
            />,
            headerTitleAlign: 'center'
            }}
            initialRouteName='Accounts'>
            <AccountStack.Screen name="Accounts">
                {props=> <Accounts {...props} {...network}/>}
            </AccountStack.Screen>
            <AccountStack.Screen 
                name='AccountDetails' 
                component={AccountDetails} 
                options= {() => ({title: 'Account Details'})} 
            />
        </AccountStack.Navigator>
    )

    const TransactionsStack = createNativeStackNavigator();
    const TransactionsStackScreen = () => (
        <TransactionsStack.Navigator screenOptions={{
            headerLeft: ()=> 
            <Image 
                source={require('../assets/adaptive-icon.png')}
                style={{width: 37, height: 37}}
            />,
            headerTitleAlign: 'center'
            }}>
            <TransactionsStack.Screen name='Transactions'>
                {props=> <Transactions {...props} {...network}/>}
            </TransactionsStack.Screen> 
        </TransactionsStack.Navigator>
    )

    return (
        <View style={styles.container}>
            <NavigationContainer independent={true}>
                <SafeAreaView/>
                <TabNavigator/>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default Explorer
