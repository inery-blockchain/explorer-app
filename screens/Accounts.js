import React from 'react'
import { useState, useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import axios from 'axios';
import AccountItemFull from '../components/AccountItemFull';
import LoaderComponent from '../components/LoaderComponent';
function Accounts({navigation, network}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [blockData, setBlockData] = useState([])
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
        let _mounted = true
        setLoading(true)
        setData([])
        axios
            .post(link + "/v1/chain/get_producers", {
                limit: "10",
                lower_bound: "0",
                json: true,
            },
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((data) => {
                const prodArray = [];
                const prodNames = data.data.rows.map((item) => item.owner);
                prodNames.forEach((prod) => {
                    prodArray.push(getProducerData(prod));
                });
            });

            const getProducerData = async (prod) => {
                const producerData = await axios
                    .post(link+ `/v1/chain/get_account`, {
                        account_name: prod
                    });
                    if(_mounted) {
                        setData((prev) => [...prev, producerData.data]); 
                    }
            };
        return ()=> _mounted = false
    },[]);

    useEffect(() => {
        let _mounted = true
        const getData = async () => {
            const blocks = [];
            let headBlock = await axios
                .get(link + "/v1/chain/get_info")
                .then((res) => res.data.head_block_num)
                .catch((err) => console.log(err));
        
            while (blocks.length < 10) {
                await axios
                    .post(link + "/v1/chain/get_block", {
                    block_num_or_id: headBlock,
                    }, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    })
                    .then((res) => {
                        if(_mounted){
                            blocks.push(res.data)
                        setLoading(false)
                        }
                    });
                headBlock--;
            }
            if(_mounted) {
                setBlockData([...blocks]);
            }
        };        
        getData();
        return () => _mounted = false;
    }, [blockData]);
    return (
        <ScrollView style={{paddingHorizontal: 15, marginTop: 10}}>
            {loading ? (
            <>
            <Text style={{textAlign: 'center'}}>Getting accounts from blokchain...</Text>
            {loaders}
            </>)
            : (
                data.map((item, i)=>
                <AccountItemFull data={item} navigation={navigation} network={link} key={i}/>
                )
            )
            }
        </ScrollView>
    )
}

export default Accounts
