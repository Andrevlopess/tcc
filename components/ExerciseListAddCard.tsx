import COLORS from '@/constants/Colors'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { PlusCircle } from 'lucide-react-native'
import React from 'react'
import { GestureResponderEvent, Pressable, Text, TouchableOpacity, View } from 'react-native'

interface ExerciseListAddCardProps {
    width?: number;
    exercise: IExercise;
    onPress:(event: GestureResponderEvent) => void
}

export default function ExerciseListAddCard({ exercise, width, onPress }: ExerciseListAddCardProps) {

    return (

        <TouchableOpacity
            onPress={onPress}
            style={[
                s.flexRow,
                s.gap16,
                // s.itemsCenter,
                s.bgWhite,
                s.px12,
                s.py8,
                { width }]} >
            <View style={[s.bgWhite, s.shadow3, s.radius8, s.border1, s.borderGray100]}>

                <Image source={exercise.gifurl} style={[s.radius8,
                { height: 100, width: 100, }
                ]} />
            </View>


            <View style={[s.gap4, s.flex1]}>
                <Text
                    style={[s.medium, s.textBase, { lineHeight: 18 }]}
                    numberOfLines={2}>
                    {exercise.name}
                </Text>
                <Text style={[s.regular, s.textGray400]}>{exercise.bodypart}</Text>
            </View>


            <View
                style={[s.mrAuto, s.myAuto, s.bgGray100, s.radiusFull, s.p8]}
            >
                <PlusCircle color={COLORS.textGray} strokeWidth={2.5} />
            </View>

        </ TouchableOpacity>

    )
}