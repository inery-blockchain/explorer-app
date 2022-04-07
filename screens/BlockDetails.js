import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {LINK_TEST} from '@env';
import moment from 'moment';
import TransactionsComponent from '../components/TransactionsComponent';

export default function BlockDetails({route, navigation}) {
    const {blockData} = route.params;
    const {network} = route.params;
    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 20}}>Block Information</Text>
            <View style={styles.detailsContainer}>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>Block hash:</Text>
                    <Text>{blockData.id}</Text>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Block num: </Text>
                        <Text>{blockData.block_num}</Text>
                    </Text>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Producer: </Text>
                        <Text onPress={()=> 
                        navigation.navigate('AccountsInitial', {
                        screen: 'AccountDetails', 
                        params: {accountName: blockData.producer, network: network} 
                    })}>
                            {blockData.producer}
                            </Text>
                    </Text>
                </View>
                <View>
                    <Text>
                        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Time: </Text>
                        <Text>{moment.utc(blockData.timestamp).fromNow()}</Text>
                    </Text>
                </View>
            </View>
            <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 20}}>Transaction List</Text>
            <ScrollView>
                {blockData.transactions.length === 0 ? 
                (<Text style={{textAlign: 'center'}}>There are no transactions for this block</Text>) 
                : (<TransactionsComponent transactions={blockData.transactions}/>)
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
        flex: 1
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20
    },
})
