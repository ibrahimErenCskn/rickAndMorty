import { View, Text, Image, Dimensions, StyleSheet, Pressable, ScrollView, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEpisode, setlength } from '@/redux/slices/fetchingApi'
import PaginationComponent from '@/components/PaginationComponent'
import { router } from 'expo-router'

export default function Episode() {
    const { episodeData, episodeLoading } = useSelector((state: any) => state.fetchingApi)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEpisode())
        dispatch(setlength(1))
    }, [])

    const renderEpisodeItems = ({ item }: any) => {
        return (
            <Pressable onPress={() => { router.push({ pathname: '/(stack)/characters/', params: item }) }} style={{ paddingVertical: 20, gap: 40, alignItems: 'center' }}>
                <Image source={require('@/assets/images/rickAndMortyEpisode.png')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * .3 }} resizeMode='contain' />
                <View style={{ width: Dimensions.get('window').width, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Episode Name:{item.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Episode  Air Date:{item.air_date}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                episodeLoading === 'succeeded' && <PaginationComponent itemData={episodeData?.results} renderItem={renderEpisodeItems} />
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: Dimensions.get('window').height
    }
})