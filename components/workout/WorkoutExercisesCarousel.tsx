import COLORS from "@/constants/Colors";
import { SCREEN_WIDTH } from "@/constants/Dimensions";
import { s } from "@/styles/global";
import { IDetailedExercise } from "@/types/exercise";
import { Link } from "expo-router";
import { Inbox, Plus } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { FadeIn, interpolate, LinearTransition, SharedValue, useAnimatedRef, useAnimatedStyle } from "react-native-reanimated";

import { useScrollValue } from "@/hooks/useScrollValue";
import { Image } from "expo-image";
import { useState } from "react";
import MessageView from "../views/MessageView";
import Button from "../ui/Button";
import ExerciseDetailedCard from "../exercise/ExerciseDetailedCard";
import { IWorkout } from "@/types/workout";

const MARGIN_HORIZONTAL = 12;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
const SPACER = (SCREEN_WIDTH - ITEM_FULL_WIDTH) / 2;


interface WorkoutExercisesCarouselProps { exercises: IDetailedExercise[], workout: IWorkout }

export const WorkoutExercisesCarousel =
    ({ exercises, workout: { id, name, description } }: WorkoutExercisesCarouselProps) => {


        // const [activeIndex, setActiveIndex] = useState<number>(-1);
        const { offset, scrollHandler } = useScrollValue('x')


        const renderItem = ({ item, index }: { item: IDetailedExercise, index: number }) =>
            <ExerciseDetailedCard
                exercise={item}
                marginHorizontal={MARGIN_HORIZONTAL}
                inWorkoutId={id}
                cardWitdh={ITEM_WIDTH}
            />



        const ref = useAnimatedRef<Animated.FlatList<IDetailedExercise>>()

        // const handleNextExercise = () => {

        //     if (isLastExercise) return;

        //     setActiveIndex(prev => prev + 1);

        //     // console.log(activeIndex, exercises.length, -1 + 1);

        //     ref.current?.scrollToIndex({
        //         index:
        //             activeIndex + 1,
        //         viewOffset: SPACER
        //     })
        // }

        return (
            <>
                <Animated.View entering={FadeIn} style={[s.flex1, s.mt24, s.gap12]}>

                    <View style={[s.itemsCenter, s.flexRow, s.p12, s.gap4]}>
                        <Text style={[s.bold, s.textXL, s.mrAuto]}>Exercícios</Text>

                        <Link asChild href={`/(app)/(modals)/exercises-to-add/${id}`}>
                            <Button variant='tertiary' size='small' rounded>
                                <Plus color={COLORS.gray900} />
                            </Button>
                        </Link>

                        <Button
                            text='Iniciar treino'
                            asLink={{ pathname: `/working-out/${id}`, params: { name } }}
                            size='small'
                            rounded
                        />


                    </View>

                    {
                        exercises.length
                            ? <Animated.FlatList

                                ref={ref}


                                ListHeaderComponent={<View />}
                                ListHeaderComponentStyle={{
                                    width: SPACER
                                }}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{
                                    width: SPACER
                                }}
                                // scrollEnabled={activeIndex === -1}
                                onScroll={scrollHandler}
                                scrollEventThrottle={16}
                                snapToInterval={ITEM_FULL_WIDTH}
                                decelerationRate={'fast'}
                                showsHorizontalScrollIndicator={false}
                                horizontal

                                data={exercises}
                                renderItem={renderItem}
                            />

                            : <MessageView
                                icon={Inbox}
                                message="Começe adicionando exercícios"
                                description="Busque exercícios para adicionar a este treino"
                                actionButton={
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        text="Adicionar exercício"
                                        asLink={`/(app)/(modals)/exercises-to-add/${id}`}
                                    />
                                }
                            />

                    }

                </Animated.View>
            </>

        )
    }