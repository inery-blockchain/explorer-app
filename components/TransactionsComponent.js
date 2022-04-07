import React from 'react'
import { useState } from 'react'
import { View, Text } from 'react-native'
import TransactionItem from './TransactionItem'

export default function Transactions({transactions}) {
    const [data, setData] = useState(transactions)
    return (
        <View>
            {data.map((item, i)=> <TransactionItem key={i} {...item}/>)}
        </View>
    )
}
