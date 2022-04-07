import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import moment from 'moment'

function BlockItemFull({
    data,
    navigation,
    network
    }) {
        /*const [time, setTime] = useState('');
        setInterval(() => {
            setTime(moment.utc().format('x'))
        }, 1000); */
        /* useEffect(() => {
            setTime(moment.utc().format('x'))
        }, [time]) */

    return (
        <View style={styles.container}>
            <View style={[styles.idAndConfirmation, {backgroundColor: data.confirmed ? '#e6ffe6a6'  : '#ffe1e1'}]}>
                <Text style={{fontWeight: 'bold', color: '#011329'}}>#{data.block_num}</Text>
                <Text>{data.confirmed ? 'Confirmed' : 'Not Confirmed'}</Text>
            </View>
            <View style={styles.transactonsAndTime}>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>{data.transactions.length}</Text>
                    <Text> {data.transactions.length === 1 ? 'Transaction': 'Transactions'}</Text>
                </Text>
                {/* <Text>{moment.utc(`${timestamp}`).fromNow()}</Text> */}
                <Text>{/* {
                moment.utc(time - moment.utc(timestamp).format('x')).format("DD") > 1 ?
                moment.utc(timestamp).format("MM/DD/YYYY") : 
                moment.utc(time - moment.utc(timestamp).format('x')).format("HH:mm:ss") +' '+'ago'
                } */}{moment.utc(data.timestamp).fromNow()}</Text>
            </View>
            <View style={styles.producerAndDetails}>
                <Text onPress={()=>{
                    navigation.navigate('AccountsInitial', {
                        screen: 'AccountDetails', 
                        params: {accountName: data.producer, network: network} 
                    })}}>
                    <Text>Node</Text>
                    <Text style={{fontWeight: 'bold'}}>  {data.producer}</Text>
                </Text>
                <Button title="Block Details" 
                    onPress={()=> {
                    navigation.navigate('BlockDetails', {name: `Block #${data.block_num}`, blockData: {...data}, network: network})
                    }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#A9A9A9',
    },
    idAndConfirmation : {
        padding: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    transactonsAndTime: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 10
    },
    producerAndDetails: {
        padding: 5, 
        flexDirection: 'row', 
        justifyContent:'space-between',
        alignItems: 'center'
    }
})

export default BlockItemFull
