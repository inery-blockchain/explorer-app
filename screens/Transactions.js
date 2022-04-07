import React from 'react'
import {View, Text, ScrollView} from 'react-native';
import { useEffect, useState } from 'react';
import {LINK_TEST, LINK_MAIN} from '@env';
import axios from 'axios';
import LoaderComponent from '../components/LoaderComponent';
import TransactionItemFull from '../components/TransactionItemFull'
function Transactions({network, navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [headBlock, setHeadBlock] = useState(0);
    let link = '';
    const loaderCount = 5;
    let loaders = [];
    for (let i =0 ; i < loaderCount; i++){
        loaders.push(<LoaderComponent key={i}/>)
    }

        switch (network) {
        case 'Testnet':
            link = process.env.LINK_TEST
            break;
        case 'Mainnet':
            link = process.env.LINK_MAIN
            break;
        default:
            break;
    }

    useEffect(() => {
        let _mounted = true;
        const fetchData = async () => {
            if(headBlock === 0) {
            let headBlock = await axios
            .get(link+'/v1/chain/get_info')
            .then((res)=> res.data.head_block_num)
            .catch((err)=> console.log(err));
            /* setHeadBlock(1414250) */
            if(_mounted){
                setHeadBlock(headBlock)
            }
            } else {
                await axios
                    .post(link + "/v1/chain/get_block", {
                        block_num_or_id: headBlock,
                    }, {
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        })
                    .then((res) =>{
                        /* console.log(res.data.block_num) */
                        if(res.data.transactions.length !== 0){
                            if(_mounted) {
                                setData((prev)=> [...prev, res.data])
                            }
                        }
                    }) 
                    .catch((err)=> console.log(err))
                    if(_mounted) {
                        setHeadBlock(headBlock+1)
                    }
            }
            
            setLoading(false);
            
        }

        setTimeout(() => {
            fetchData();
        }, 600);
    
        return ()=> _mounted = false;
    },[headBlock]); 
    
    if (data) {
        return (
            <ScrollView style={{paddingHorizontal: 15, marginTop: 10}}>
                {loading ? (
                    <>
                    <Text style={{textAlign: 'center'}}>Getting transactions from blokchain...</Text>
                    {loaders}
                    </>)
                    : (
                        <React.Fragment>
                            <Text style={{marginBottom: 20, 
                                textAlign: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 25}}>
                                    Last Block:
                                </Text>
                                <Text style={{fontSize: 25}}> {headBlock}</Text>
                            </Text>
                            {data.map((item, i)=> 
                            <TransactionItemFull data={item} key={i}/>
                            )}  
                            <Text style={{textAlign: 'center', paddingBottom: 20}}>Searching for more transactions...</Text>
                        </React.Fragment>
                )
                }
            </ScrollView>
        )
    }
}

export default Transactions
