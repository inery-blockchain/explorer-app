import React from 'react';
import { useEffect, useState } from 'react';
import {LINK_TEST, LINK_MAIN} from '@env';
import axios from 'axios';
import { Text, ScrollView } from 'react-native';
import BlockItemFull from '../components/BlockItemFull';
import LoaderComponent from '../components/LoaderComponent';
import { AbortController } from 'native-abort-controller';

function Blocks({navigation, network, blockNum}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const numOfBlocks = !blockNum ? 10 : 1
    let link = '';
    const loaderCount = 5;
    let loaders = [];
    for (let i =0 ; i < loaderCount; i++){
        loaders.push(<LoaderComponent key={i}/>)
    }

    switch (network) {
        case 'Testnet':
            link = LINK_TEST
            break;
        case 'Mainnet':
            link = LINK_MAIN
            break;
        default:
            break;
    }

    useEffect(() => {
        let _mounted = true
        const fetchData = async () => {
            const blocks = [];
            let headBlock = await axios
            .get(link+'/v1/chain/get_info')
            .then((res)=> res.data.head_block_num)
            .catch((err)=> console.log(err));
            
            while (blocks.length <  numOfBlocks) {
                await axios
                    .post(link + "/v1/chain/get_block", {
                        block_num_or_id: !blockNum ? headBlock : blockNum,
                    }, {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                })
                .then((res) => blocks.push(res.data))
                .catch((err)=> console.log(err))
                headBlock--;
                
            }
            if(_mounted){
                setData([...blocks]);
                setLoading(false);
            }
        };

        fetchData();
        return ()=> _mounted = false;
    },[data]);
    return (
        <ScrollView style={{paddingHorizontal: 15, marginTop: 10}}>
            {loading ? (
            <>
            <Text style={{textAlign: 'center'}}>Getting blocks from blokchain...</Text>
            {loaders}
            </>)
            : (
                data.map((item)=> <BlockItemFull data={item} navigation={navigation} network={link} key={item.block_num}/>)
                )
            }
        </ScrollView>
    )
}

export default Blocks
