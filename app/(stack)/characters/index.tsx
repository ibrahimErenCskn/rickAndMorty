import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function Characters() {
    const item = useLocalSearchParams();
    const [itemD, setItem] = useState([item])

    const getCharacters = async () => {
        const responses = await Promise.all(itemD.map(async (item) => {
            const url = item[0];
            const response = await axios.get(url);
            console.log(response)
        }))
    };
    return (
        <SafeAreaView>
        </SafeAreaView>
    )
}