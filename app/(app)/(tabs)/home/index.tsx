import FeaturedExercices from '@/components/FeaturedExercices'
import LogoImage from '@/components/LogoImage'
import WorkoutsCarouselList from '@/components/WorkoutsCarouselList'
import AnimatedHeaderTitle from '@/components/ui/AnimatedHeaderTitle'
import AnimatedLargeTitle from '@/components/ui/AnimatedLargeTitle'
import { useScrollValue } from '@/hooks/useScrollValue'
import { s } from '@/styles/global'
import { IExercise } from '@/types/exercise'
import { Stack } from 'expo-router'
import React from 'react'
import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'
const exercises: IExercise[] =
  [
    {
      "id": "65683a57-b5bd-4ce5-bbfd-f7cecd1649db",
      "name": "Puxada Paralela Assistida De Perto",
      "equipment": "Graviton",
      "bodypart": "Costas",
      "target": "Dorsal",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0015.gif"
    },
    {
      "id": "8f500525-dad1-437c-9052-e8f27a185cc1",
      "name": "Elevação De Perna Deitada Assistida Com Lançamento Lateral",
      "equipment": "Com Ajuda",
      "bodypart": "Core",
      "target": "Abdômen",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_0012.gif"
    },
    {
      "id": "6049f1ba-eb01-4cef-a163-e65154af6f02",
      "name": "Puxada Assistida Em Pé",
      "equipment": "Graviton",
      "bodypart": "Costas",
      "target": "Dorsal",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1432.gif"
    },
    {
      "id": "63d9d5e4-050c-4b6d-9c70-bd29e61129d3",
      "name": "Balanços De Braço Com Pernas Estendidas Penduradas",
      "equipment": "Peso Do Corpo",
      "bodypart": "Core",
      "target": "Abdômen",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_2333.gif"
    },
    {
      "id": "2a515ab3-6692-472a-ac30-7ae0323f4cb2",
      "name": "Saltos À Distância (Masculino)",
      "equipment": "Peso Do Corpo",
      "bodypart": "Cardio",
      "target": "Cardio",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_3220.gif"
    },
    {
      "id": "784bffdd-c2b6-40fb-a846-5bab97fff12c",
      "name": "Balanços De Braço Com Pernas Dobradas Penduradas",
      "equipment": "Peso Do Corpo",
      "bodypart": "Core",
      "target": "Abdômen",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_2355.gif"
    },
    {
      "id": "b4470bb2-7466-4751-ae08-24c6c66e9e1c",
      "name": "Puxada De Pé Assistida Em Pé",
      "equipment": "Graviton",
      "bodypart": "Costas",
      "target": "Dorsal",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1431.gif"
    },
    {
      "id": "fd33de15-5023-48f3-b7f1-f57003d31ecf",
      "name": "Alongamento De Glúteos E Piriforme Deitado Assistido",
      "equipment": "Com Ajuda",
      "bodypart": "Quadriceps/Posterior",
      "target": "Glúteos",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1710.gif"
    },
    {
      "id": "ab2acaa8-bb5a-4f33-a5db-8daa3b61c6ab",
      "name": "Alongamento De Panturrilha Deitado Assistido",
      "equipment": "Com Ajuda",
      "bodypart": "Panturrilha",
      "target": "Panturrilha",
      "gifurl": "https://xjnbjevqrawvgiesutug.supabase.co/storage/v1/object/public/exercises-demos/exercise_1708.gif"
    }
  ]
export default function HomeIndexScreen() {


  const { offset, scrollHandler } = useScrollValue('y')

  return (

    <>
      <Stack.Screen
        options={{
          title: 'Início',
          headerTitleAlign: 'center',
          headerLeft: () => <LogoImage />,
          headerTitle: ({ children }) => <AnimatedHeaderTitle title={children} offset={offset} />
        }}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        contentInsetAdjustmentBehavior='automatic'
        style={[s.flex1, s.bgWhite]}
        contentContainerStyle={[s.gap8]}
      >

        <AnimatedLargeTitle title='Início' offset={offset} style={[s.px12]} />

        <WorkoutsCarouselList />
        <FeaturedExercices title='Destaques' exercises={exercises} />

      </Animated.ScrollView>
    </>
  )
}