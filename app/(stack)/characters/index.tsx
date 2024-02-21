import { View, Text, Pressable, Image, Dimensions, ScrollView, Platform, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '@/redux/slices/fetchingApi';
import PaginationComponent from '@/components/PaginationComponent';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addData, readData, setNotificationData } from '@/redux/slices/favoriteSlice';
import CustomButton from '@/components/CustomButton';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
        console.log(token);
    }

    return token;
}


export default function Characters() {
    const { charactersData, charactersLength, charactersLoading } = useSelector((state: any) => state.fetchingApi)
    const { notification, isLoading } = useSelector((state: any) => state.favortie)
    const dispatch = useDispatch()
    const item: any = useLocalSearchParams()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notificationS, setNotification] = useState(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();


    useEffect(() => {
        dispatch(fetchCharacters({ id: item?.id }))
        dispatch(readData())
    }, [dispatch]);


    async function schedulePushNotification(item: any) {
        await dispatch(addData({ value: item }))
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token: any) => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        const notific = async () => {
            if (notification) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Ekleme Hatası",
                        body: notification,
                    },
                    trigger: { seconds: 2 },
                });
                console.log(notification)
                dispatch(setNotificationData(''))
            }
        }
        notific()
    }, [notification])

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
                <Pressable style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Add Favorite</Text>
                    <Pressable onPress={() => schedulePushNotification(item)}>
                        <AntDesign name="heart" size={24} color="red" />
                    </Pressable>
                </Pressable>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <CustomButton title='Go To Favorite Page' handlePress={() => router.push('/(stack)/favorite/')} customStyle={{ backgroundColor: '#B5C9FF', marginVertical: 20 }} />
            <View style={{ flex: 8 }}>
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'center' }}
                >
                    {charactersData.length === charactersLength && charactersLoading !== 'pending' ? (
                        <PaginationComponent itemData={charactersData} renderItem={renderCharactersItem} customHeight={500} />
                    ) :
                        (<ActivityIndicator size="large" color="#00ff00" />)
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
