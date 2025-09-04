import { ThemedText } from "@components/ui/ThemedComponents";
import useSaveToMemory from "@hooks/startup/useSaveToMemory";
import { useSailingsQueryState } from "@store/api/Cruises/Carnival/Sailings";
import { useAppDispatch, useAppSelector } from "@store/index";
import { CruiseFiltersState } from "@store/slices/Filters/CruiseFilters";
import { setAddToVacations } from "@store/slices/VacationCountdown";
import { VacationStateType } from "@store/slices/VacationCountdown/Types";
import { useRouter } from "expo-router";
import { DateTime } from "luxon";
import { FlatList, View } from "react-native";
import { Button, Icon, List } from "react-native-paper";

const ItineraryDates = ({ itineraryId }: { itineraryId: string }) => {
    const {
        dates,
        duration,
        shipCode,
        port
    } = useAppSelector('CruiseFilters') as CruiseFiltersState;

    const countdownState = useAppSelector('VacationCountdown') as VacationStateType;

    const { data } = useSailingsQueryState({
        dates,
        durdays: duration,
        shipcode: shipCode,
        port
    });

    const dispatch = useAppDispatch();
    const saveToMem = useSaveToMemory();

    const ItinerarySailings = data?.filter(v => v.id === itineraryId)[0];

    if (!ItinerarySailings) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon source={'feature-search-outline'} size={100} />
                <ThemedText style={{ fontWeight: 'condensedBold', fontSize: 25 }}>
                    No Results Found
                </ThemedText>
            </View>
        )
    }

    const SailingInformation = ItinerarySailings.sailings;

    return (
        <>
            <View style={{ display: "flex", justifyContent: 'space-between', flexDirection: 'row', padding: 20 }}>
                <ThemedText style={{ fontWeight: 'bold' }}>
                    {ItinerarySailings.itineraryTitle.length > 21 ? ItinerarySailings.itineraryTitle.slice(0, 20) + "..." : ItinerarySailings.itineraryTitle}
                </ThemedText>
                <ThemedText>
                    Add to Schedule!
                </ThemedText>
            </View>
            <FlatList
                data={SailingInformation}
                renderItem={itemRenderer(
                    dispatch,
                    saveToMem,
                    countdownState,
                    `${ItinerarySailings.itineraryTitle} - ${ItinerarySailings.shipName}`
                )}
            />
        </>
    )
}

const itemRenderer = (
    dispatch: ReturnType<typeof useAppDispatch>,
    { saveToMemory, saved, lastSaved }: ReturnType<typeof useSaveToMemory>,
    state: VacationStateType,
    itineraryTitle: string

) => ({ item }: any) => {
    const arrivalDate = DateTime.fromISO(item.arrivalDate);
    const departureDateTime = DateTime.fromISO(item.departureDate);
    const router = useRouter();

    const lastSavedObject = lastSaved instanceof Array ? lastSaved : lastSaved ? (JSON.parse((lastSaved as {
        key?: string;
        value?: string;
    })?.value ?? "") as VacationStateType).savedVacations : [];

    const savedSuccessfully = lastSaved && (JSON.stringify({
        vacationName: itineraryTitle,
        vacationType: 'CRUISE',
        departureDate: item.departureDate
    }) === JSON.stringify(lastSavedObject[lastSavedObject.length - 1]));

    const submit = () => {
        dispatch(setAddToVacations({
            vacationName: itineraryTitle,
            vacationType: 'CRUISE',
            departureDate: item.departureDate
        }));
        saveToMemory(
            'countdown',
            JSON.stringify({
                ...state, savedVacations: [...state.savedVacations, {
                    vacationName: itineraryTitle,
                    vacationType: 'CRUISE',
                    departureDate: item.departureDate
                }]
            } as VacationStateType)
            , () => setTimeout(() => router.navigate("/(tabs)"), 100)
        )
    };


    return <List.Item
        title={`${departureDateTime.toFormat('LLL dd, y')} - ${arrivalDate.toFormat('LLL dd, y')}`}
        right={() => (
            <Button onPress={
                () => submit()
            }>
                <Icon source={savedSuccessfully ? 'check' : 'plus'} color={savedSuccessfully ? "green" : "white"} size={20} />
            </Button>)
        }
    />
}

export default ItineraryDates;