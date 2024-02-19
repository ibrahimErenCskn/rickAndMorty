import React from 'react'
import { Stack } from 'expo-router'

export default function StackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='episode/index' />
        </Stack>
    )
}