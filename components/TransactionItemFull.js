import React from 'react'
import { View, Text } from 'react-native'

export default function TransactionItemFull({data}) {
    return (
        <View style={{marginBottom: 20, borderWidth: 1, padding: 10}}>
                {data.transactions.map((item, i)=> 
                    <View style={{marginBottom: 20}} key={i}>
                        <Text style={{fontWeight: 'bold'}}>#{data.block_num}</Text>
                        <Text>
                            <Text style={{fontWeight: 'bold'}}>Who: </Text>
                            <Text>{item.trx.transaction.actions[0].account}</Text>
                        </Text>
                        <Text style={{marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Action: </Text>
                            <Text>{item.trx.transaction.actions[0].name}</Text>
                        </Text>
                        <Text selectable>{JSON.stringify(item.trx.transaction.actions[0].data , null, "\t")}</Text>
                    </View>
                )} 
        </View>
    )
}
