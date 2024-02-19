import { View, Text, Pressable, ViewStyle } from 'react-native'
import React from 'react'

const height = 40

interface CustomButtonProps {
    title: string
    handlePress(): void
    customStyle?: ViewStyle
}

export default function CustomButton({ title, handlePress, customStyle }: CustomButtonProps) {
    return (
        <Pressable
            onPress={handlePress}
            style={[{ width: '50%', height: height, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }, customStyle]}
        >
            <Text style={{ fontSize: height * .56, fontWeight: 'bold' }}>{title}</Text>
        </Pressable>
    )
}