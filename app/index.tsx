import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window')

export default function RootIndex() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#77dd77', '#33cc33']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
                    <Image source={require('@/assets/images/rickAndMortText.png')} style={{ width: width, height: height * .15, position: 'absolute', zIndex: 9 }} resizeMode='contain' />
                    <Image source={require('@/assets/images/rickAndMorty.png')} style={{ width: width, height: height * .54 }} resizeMode='contain' />
                </View>
                <View style={{ flex: 1.3, alignItems: 'center', justifyContent: 'center', gap: height * .2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 23, color: 'white' }}>Bu Uygulama Rick & Morty Dizisi Hakkında Bilgi Vermek Amacı İle Yapılmışıtr.</Text>
                    <CustomButton
                        title='Kullanmaya Başla'
                        handlePress={() => router.push('/(stack)/episode/')}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});