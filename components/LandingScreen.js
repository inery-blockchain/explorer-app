import React from 'react'
import { useState, useEffect } from 'react';
/* import {LINK_MAIN, LINK_TEST} from '@env'; */
import axios from 'axios';
import LandingScreenLoader from './LandingScreenLoader';
import LandingScreenPopUp from './LandingScreenPopUp';
import { 
    StyleSheet, 
    Text, 
    Image, 
    View,  
    TextInput, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

    function LandingScreen({navigation}) {
        const [selectedNetwork, setSelectedNetwork] = useState('Testnet');
        const [blockNum, setBlockNum] = useState(false)
        const [loader, setLoader] = useState(false);
        const [type, setType] = useState();
        const [showHide, setShowHide] = useState(false)
        const handleNetworkChange = (event) => {
            setSelectedNetwork(event._dispatchInstances.memoizedProps.children);
        }

        const fetchHeadBlock = async() => {
            setLoader(true)
            let link = '';
            switch (selectedNetwork) {
                case 'Testnet':
                    link = process.env.LINK_TEST
                    break;
                case 'Mainnet':
                    link = process.env.LINK_MAIN
                    break;
                default:
                    break;
            }
            await axios
            .get(link+'/v1/chain/get_info')
            .then((res)=> {
                if (res.data.head_block_num < blockNum){
                    setType('block');
                    setShowHide(true)
                } else {
                    navigation.navigate('Explorer', {network:selectedNetwork, blockNum: blockNum})
                }
            })
            .catch((err)=> console.log(err));
            setLoader(false)
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.logo} source={require("../assets/adaptive-icon.png")}/>
                        <View>
                                <Text style={styles.headline}>Inery</Text>
                                <Text style={{fontSize: 14}}>
                                    <Text>USDT Price:</Text>
                                    <Text style={{color: "green", fontWeight: 'bold'}}>{process.env.BLOCK_REWARD}</Text>
                                </Text>
                        </View>
                    </View>
                    <View>
                        <Text>Select Network:</Text>
                        <View style={styles.networks}>
                            <Text
                                onPress={(e)=>{handleNetworkChange(e)}} 
                                style={[styles.network, 
                                    selectedNetwork === 'Mainnet' ? 
                                    styles.selectedNetworkBg : 
                                    styles.networkBg]
                                }>Mainnet</Text>
                            <Text
                                onPress={(e)=>{handleNetworkChange(e)}} 
                                style={[styles.network, 
                                    selectedNetwork === 'Testnet' ? 
                                    styles.selectedNetworkBg : 
                                    styles.networkBg]
                                }>Testnet</Text>
                        </View>
                        <TextInput 
                        style={styles.inputField}
                        keyboardType = 'numeric'
                        defaultValue = ''
                        onChangeText={text => {
                            let str = '';
                            if (text !== ''){
                            str = text.replace(/[.-]/g,'');
                            str = Number(str);
                            } else {
                                str = false;
                            }
                            setBlockNum(str);
                        }}/>
                        <TouchableOpacity style={styles.searchBtn} 
                        onPress={()=>{
                            Keyboard.dismiss();
                            if(selectedNetwork === 'Mainnet'){
                                setType('network');
                                setShowHide(true)
                            } else {
                                if (!blockNum){
                                    navigation.navigate('Explorer', 
                                    {network: selectedNetwork})
                                    setLoader(false)
                                } else {
                                    fetchHeadBlock();
                                }
                            }
                        }}>
                            <Image style={{marginRight: 10}} source={require('../assets/icon.png')}/>
                            <Text style={{
                                color: 'rgb(12, 6, 62)',
                                fontSize: 20,
                                fontWeight: 'bold'
                                }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 'auto'}}>
                        <Text style={{textAlign: 'center'}}>Version 1.0</Text>
                    </View>
                    {loader ? <LandingScreenLoader/> : null}
                    {showHide ? <LandingScreenPopUp type={type} closePopUp={()=> setShowHide(false)}/> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingBottom: 30,
        
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headline:{
        fontSize: 55,
        fontWeight: 'bold'
    },
    networks:{
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7,
    },
    network: {
        marginRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 10,
        overflow: 'hidden'
    },
    networkBg: {
        color: 'rgb(12, 6, 62)',

    },
    selectedNetworkBg: {
        backgroundColor: 'rgb(12, 6, 62)',
        color: 'white'
    },
    inputField: {
        backgroundColor: 'rgb(216, 219, 229)',
        height: 50,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    searchBtn:{
        backgroundColor: 'rgb(116, 250, 252)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
    }
})

export default LandingScreen
