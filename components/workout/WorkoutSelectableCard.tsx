import COLORS from "@/constants/Colors";
import { s } from "@/styles/global";
import { IWorkout } from "@/types/workout";
import { CheckCircle2, Circle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";


interface SelectableWorkoutListCardProps {
    workout: IWorkout;
    onSelect: (id: string) => void;
    isSelected: boolean
}
export const SelectableWorkoutListCard =
    ({ workout: { id, name, description, exercises_count }, isSelected, onSelect }: SelectableWorkoutListCardProps) => {
        return (
            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => onSelect(id)}
                style={[s.flexRow, s.gap12, s.itemsCenter]}>
                <View style={[s.bgGray200, s.radius14, { height: 60, width: 60 }]} />

                <View style={[s.gap4, s.justifyCenter]} >
                    <View>
                        <Text
                            style={[s.medium, s.textBase, { lineHeight: 18 }]}
                            numberOfLines={2}>
                            {name}
                        </Text>
                        <View style={[s.flexRow, s.itemsCenter, s.gap4]}>
                            {description &&
                                <>
                                    <Text style={[s.regular, s.textGray400]}>{description}</Text>
                                    <View style={[s.bgGray400, s.radiusFull, { height: 4, width: 4 }]} />
                                </>
                            }
                            <Text style={[s.regular, s.textGray400]}>
                                {exercises_count
                                    ? `${exercises_count} exercícios`
                                    : 'Nenhum exercício'}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[s.radiusFull, s.bgGray100, s.p6, s.mlAuto]}>
                    {isSelected
                        ? <CheckCircle2 size={28} color={COLORS.black} />
                        : <Circle size={28} color={COLORS.gray} />}
                </View>
            </TouchableOpacity>

        )
    }