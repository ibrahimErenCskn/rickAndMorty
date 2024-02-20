import React from 'react'
import { Stack } from 'expo-router'

export default function StackLayout() {
    return (
        <Stack initialRouteName='deneme/index'>
            <Stack.Screen name='episode/index' options={{ headerTitle: 'Episode' }} />
            <Stack.Screen name='characters/index' options={{ headerTitle: 'Characters' }} />
            <Stack.Screen name='favorite/index' options={{ headerTitle: 'Favorite Characters' }} />
        </Stack>
    )
}