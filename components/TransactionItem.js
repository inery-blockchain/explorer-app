import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TransactionItem({trx}) {
    return (
        <View style={{marginBottom: 10, backgroundColor: '#fff', padding: 10}}>
            <View style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(12, 6, 62)',
                borderTopWidth: 1,
                borderTopColor: 'rgb(12, 6, 62)'
            }}>
                <Text style={styles.text}>
                    {trx.transaction.actions[0].data.from}
                </Text>
            </View>
            <View style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(12, 6, 62)',
                marginBottom: 10
            }}>
                <Text style={styles.text}>
                    {trx.transaction.actions[0].name}
                </Text>
            </View>
            <Text selectable>
                {JSON.stringify(trx.transaction.actions[0].data, null, "\t")}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center', 
        color: 'rgb(12, 6, 62)',
        fontWeight: 'bold'
    }
})