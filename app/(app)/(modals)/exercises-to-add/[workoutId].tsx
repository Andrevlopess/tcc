import ExerciseListAddCard from '@/components/ExerciseListAddCard'
import ExerciseListCard from '@/components/ExerciseListCard'
import SwipeableExerciseListCard from '@/components/ExerciseListSwipeableCard'
import FeaturedExercices from '@/components/FeaturedExercices'
import SearchInput from '@/components/ui/SearchInput'
import MessageView from '@/components/views/MessageView'
import RequestResultsView from '@/components/views/RequestResultView'
import COLORS from '@/constants/Colors'
import { SCREEN_WIDTH } from '@/constants/Dimensions'
import { bestCardioExercises, bestQuadExercises } from '@/constants/Exercises'
import { useAddExerciseToWorkout } from '@/hooks/useAddExerciseToWorkout'
import { useDebounce } from '@/hooks/useDebounceCallback'
import { useSearchExercises } from '@/hooks/useSearchExercises'
import { s } from '@/styles/global'
import { Filter, IExercise } from '@/types/exercise'
import { device } from '@/utils/device'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { CircleX, SearchX } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Feed = () => <>
    <FeaturedExercices
        title='O melhor para seus quadríceps'
        exercises={bestQuadExercises} />
    <FeaturedExercices
        title='Para queimar gordura'
        exercises={bestCardioExercises} />
</>

const CancelButton = () => (
    <TouchableOpacity onPress={() => router.back()}>
        <Text style={[s.regular, s.textBase, s.py12]}>Cancelar</Text>
    </TouchableOpacity>
)

const PADDING = 12;
const CARD_WIDTH = SCREEN_WIDTH - PADDING * 4



export default function ExericesToAddModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
    const insets = useSafeAreaInsets();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500).trim();

    if (!workoutId) return <MessageView
        message='Esta página não existe'
        description="Como q tu chegou até aqui?" />


    const {
        exercises,
        isFetching,
        isError,
        error,
        fetchStatus,
        fetchNextPage,
        isFetchingNextPage } =
        useSearchExercises(debouncedSearch, '', 15);

    const { insertExercise, isPending } = useAddExerciseToWorkout({
        workoutId,
        onSuccess: () => {
            console.log('ue')
            router.back();
        },
        onError: () => alert('Erro ao adi,cionar exercício')
    })

    function handleAddExerciseToThisWorkout(exerciseId: string) {
        insertExercise(exerciseId)
    }

    // render components
    const renderItem = ({ item }: { item: IExercise }) =>
        <ExerciseListAddCard
            onPress={() => handleAddExerciseToThisWorkout(item.id)}
            exercise={item}
        />

    const renderFooter = () => {
        if (!isFetchingNextPage) return null;
        return (
            <ActivityIndicator color={COLORS.indigo} style={[s.p12, s.mxAuto]} />
        );
    };



    return (
        <>
            <Stack.Screen options={{
                title: 'Adicionar exercícios',
                presentation: 'modal',
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: ({ canGoBack }) => <CancelButton />,
                headerTitle: ({ children }) => <Text style={[s.bold, s.textLG]}>{children}</Text>,
                headerSearchBarOptions:
                    device.ios
                        ? {
                            hideNavigationBar: false,
                            hideWhenScrolling: false,
                            // placement: `automatic`,
                            placeholder: 'Encontrar treino',
                            onChangeText: ({ nativeEvent }) => setSearch(nativeEvent.text)
                        }
                        : undefined
            }} />


            <View style={[s.flex1, s.bgWhite, s.gap12, { paddingBottom: insets.bottom }]}>

                <SearchInput
                    onChangeText={setSearch}
                    placeholder='Encontrar exercício'
                    value={search}
                    containerStyles={[s.m12]}
                />
                {isPending && <Text>carregando..</Text>}

                <RequestResultsView
                    isError={isError}
                    isPending={isFetching && !isFetchingNextPage}
                    hasData={!!exercises?.length}
                    hasSearch={!!debouncedSearch}
                    EmptyComponent={<Feed />}
                    NotFoundComponent={
                        <MessageView
                            icon={SearchX}
                            message='Sem resultados'
                            description={`Não econtramos nada para '${debouncedSearch}', tente buscar por outro!`}
                        />}
                    ErrorComponent={<MessageView
                        icon={CircleX}
                        message="Ocorreu um erro!"
                        description={error?.message || 'Estamos tentando resolver este problema!'} />}
                >

                    <FlatList
                        data={exercises}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        // showsVerticalScrollIndicator={false}
                        // onEndReachedThreshold={2}
                        onEndReached={() => fetchNextPage()}
                        ListFooterComponent={renderFooter}
                    />

                </RequestResultsView>
            </View>
        </>
    )
}