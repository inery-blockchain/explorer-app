import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

export default function LandingScreenLoader() {
    return (
        <View style={styles.container}>
            <Image style={styles.loader} source={require('../assets/Rolling-1s-200px.gif')}/>
            <Text style={styles.text}>Checking if the block is available...</Text>
        </View>
    )
}
const height = Dimensions.get("window").height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loader: {
        height: 50,
        width: 50,
    },
    text: {
        color: 'white', 
        marginTop: 30
    }
})
