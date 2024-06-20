import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function WorkoutScreen() {

    const { id } = useLocalSearchParams<{ id: string }>();


    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}