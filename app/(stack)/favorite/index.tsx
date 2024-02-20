import { View, Text, Image, Pressable, Dimensions, ActivityIndicator, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, readData } from '@/redux/slices/favoriteSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import PaginationComponent from '@/components/PaginationComponent'
import { EvilIcons } from '@expo/vector-icons';

export default function Favorite() {
    const dispatch = useDispatch()
    const [currentItem, setCurrentItem] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        const readData_ = async () => {
            await dispatch(readData())
        }
        readData_()
    }, [])

    const openModal = (item: any) => {
        setCurrentItem(item)
        setVisible(!visible)
    }

    const deleteData_ = async (item: any) => {
        dispatch(deleteData({ value: item }))
        setVisible(!visible)
    }

    const { data, isLoading } = useSelector((state: any) => state.favortie)
    const renderCharactersItem = ({ item }: any) => {
        return (
            <View style={{ paddingVertical: 20, gap: 40, alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * .3 }} resizeMode='contain' />
                <View style={{ width: Dimensions.get('window').width, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Character Name: {item.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Character Status: {item?.status}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Character Species: {item?.species}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Character Gender: {item?.gender}</Text>
                </View>
                <Pressable onPress={() => openModal(item)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Sil</Text>
                    <EvilIcons name="trash" size={28} color="black" />
                </Pressable>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: '#fff', alignItems: 'center' }}>
            {isLoading ? (<ActivityIndicator size="large" color="#00ff00" />) : (
                <PaginationComponent itemData={data} renderItem={renderCharactersItem} customHeight={500} />
            )}
            <Modal transparent={true} visible={visible}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: '80%', height: 400, backgroundColor: 'rgba(0,0,0,.6)', alignSelf: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'red', fontSize: 24 }}>{currentItem?.name} isimli Karakteri Silmek İstediğinize Eminmisiniz</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable onPress={() => setVisible(!visible)}>
                                <Text style={{ fontSize: 20, color: 'red' }}>Hayır</Text>
                            </Pressable>
                            <Pressable onPress={() => deleteData_(currentItem)}>
                                <Text style={{ fontSize: 20, color: 'red' }}>Evet</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}