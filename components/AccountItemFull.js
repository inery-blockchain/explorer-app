import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import moment from 'moment';

export default function AccountItemFull({
    data,
    navigation,
    network
}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{marginBottom: 5}}>
                    <Text>Master:</Text>
                    <Text style={{fontWeight: 'bold'}}> {data.account_name}</Text>
                </Text>
                <Text>
                    <Text>Created at:</Text>
                    <Text style={{fontWeight: 'bold'}}> {moment(new Date(data.created)).format("MM/DD/YYYY")}</Text>
                </Text>
            </View>
            <Button title='Account Details' onPress={()=> navigation.navigate('AccountDetails', {accountName: data.account_name, network: network})}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#A9A9A9',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
