import { useAppDispatch, useAppSelector } from "@store/index";
import { removeVacation, setCurrentCountdown } from "@store/slices/VacationCountdown";
import { VacationStateType, VacationType } from "@store/slices/VacationCountdown/Types";
import { DateTime } from "luxon";
import { Alert } from "react-native";
import { IconButton, List } from "react-native-paper";
import { getVacationText } from "../../utils";

interface VacationItem extends VacationType {
    itemValue: number
};

const VacationComponent = ({ itemValue, vacationName, vacationType, departureDate }: VacationItem) => {
    const dispatch = useAppDispatch();
    const { currentCountdown } = useAppSelector('VacationCountdown') as VacationStateType;

    return <List.Item
        title={vacationName}
        titleNumberOfLines={3}
        description={`${getVacationText(vacationType)} - ${DateTime.fromISO(departureDate).toFormat('LLL dd, yyyy')}`}
        right={() => <IconButton icon={"delete"} onPress={() => {
            dispatch(removeVacation(itemValue))
        }} />}
        left={() => <IconButton icon={'plus'} onPress={() => {
            if (currentCountdown.departureDate) {
                Alert.alert(
                    "Overwrite Current Countdown",
                    `You currently have a countdown: ${currentCountdown.vacationName} - ${DateTime.fromISO(currentCountdown.departureDate).toFormat('LLL dd, yyyy')}`,
                    [
                        {
                            text: "Cancel"
                        },
                        {
                            text: "Confirm",
                            onPress: () => {
                                dispatch(removeVacation(itemValue));
                                dispatch(setCurrentCountdown({ vacationName, vacationType, departureDate }));
                            }
                        }
                    ]
                )
            } else {
                dispatch(removeVacation(itemValue));
                dispatch(setCurrentCountdown({ vacationName, vacationType, departureDate }));
            }
        }} />}
    />
};

export default VacationComponent;