import React from 'react'
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import LoaderComponent from '../components/LoaderComponent';
import {BLOCK_REWARD} from '@env'

export default function AccountDetails({route, navigation}) {
    const {accountName} = route.params;
    const {network} = route.params;
    const name = accountName;
    const [user, setUser] = useState(null);
    useEffect(() => {
        let _mounted = true;
        axios
            .post(network + "/v1/chain/get_account", {
            account_name: name === "ysignchatapp" ? "prod1" : name,
            }, {
            headers:{
                'Content-Type': 'application/json'
            }
            })
            .then((data) => {
                if(_mounted){
                    setUser(data.data);
                }   
            });
            return ()=> _mounted = false;
        }, [name]);
    return (
        <ScrollView style={styles.container}>
            {user ? (
                <React.Fragment>
                    <View style={{borderBottomWidth: 1, 
                            borderBottomColor: 'rgba(0,0,0,0.5)',
                            paddingBottom: 20,
                            marginBottom: 20,
                            }}>
                        <Text style={{textAlign: 'center' }}>
                            <Text>Account: </Text>
                            <Text style={{fontWeight: 'bold'}}>{name}</Text>
                            </Text>
                        </View>
                        <View style={{marginBottom: 20}}>
                            <Text>
                                <Text style={{fontWeight: 'bold'}}>MEM: </Text>
                                <Text>{(user.mem_usage / user.mem_quota)*100 <= 1 
                                    ? 0
                                    :(user.mem_usage / user.mem_quota)*100}
                                    % mem used
                                </Text>
                            </Text>
                            <Text>
                                <Text style={{fontWeight: 'bold'}}>CPU: </Text>
                                <Text>{(user.cpu_limit.used / user.cpu_limit.max)*100 <= 1 
                                    ? 0
                                    :(user.cpu_limit.used / user.cpu_limit.max)*100}
                                    % cpu used
                                </Text>
                            </Text>
                            <Text>
                                <Text style={{fontWeight: 'bold'}}>NET: </Text>
                                <Text>{(user.net_limit.used / user.net_limit.max)*100 <= 1 
                                    ? 0
                                    :(user.net_limit.used / user.net_limit.max)*100}
                                    % net used
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.balanceContainer}>
                            <Text style={{color: 'white', marginBottom: 20}}>Total BSU Balance</Text>
                            <Text style={{color: 'white', textAlign: 'right'}}>{user.core_liquid_balance}</Text>
                        </View>
                        <View style={styles.rewardsContainer}>
                            <Text style={{marginBottom: 20}}>Block Rewards</Text>
                            <Text style={{textAlign: 'right'}}>{parseFloat(user.core_liquid_balance) / parseFloat(BLOCK_REWARD)} USDT</Text>
                        </View>
                    </React.Fragment>
                ): <LoaderComponent/>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
        flex: 1
    },
    balanceContainer: {
        backgroundColor: '#20478f',
        padding: 15,
        marginBottom: 10
    },
    rewardsContainer: {
        backgroundColor: '#ffffff',
        padding: 15
    }
})