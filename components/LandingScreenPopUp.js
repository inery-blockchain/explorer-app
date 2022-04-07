import React from 'react'
import { 
    View, 
    Text, 
    Dimensions, 
    StyleSheet,
    Pressable 
} from 'react-native'
import { useState, useEffect } from 'react';
export default function LandingScreenPopUp({type, closePopUp}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{marginBottom: 20}}>
                    <Text>{type === 'network'? 
                    'This network is not yet available in this version.': null }</Text>
                    <Text>{type === 'block'? 
                    'This block does not exist, please check the entered block number.': null }</Text>
                </Text>
                <Pressable style={styles.button} onPress={closePopUp}>
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>
        </View>
    )
}

const height = Dimensions.get("window").height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
            display: "flex" ,
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
    content: {
        backgroundColor: '#fff',
        marginBottom: 100,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'rgb(12, 6, 62)',
        width: 65,
        height: 30,
        borderWidth: 0,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    }
})