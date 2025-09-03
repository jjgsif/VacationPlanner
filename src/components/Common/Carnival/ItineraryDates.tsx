import { ThemedText } from "@components/ui/ThemedComponents";
import useSaveToMemory from "@hooks/startup/useSaveToMemory";
import { useSailingsQueryState } from "@store/api/Cruises/Carnival/Sailings";
import { useAppDispatch, useAppSelector } from "@store/index";
import { CruiseFiltersState } from "@store/slices/Filters/CruiseFilters";
import { setNextDate } from "@store/slices/VacationCountdown";
import { FlatList, View } from "react-native";
import { Button, Icon, List } from "react-native-paper";

const ItineraryDates = ({ itineraryId }: { itineraryId: string }) => {
    const {
        dates,
        duration,
        shipCode,
        port
    } = useAppSelector('CruiseFilters') as CruiseFiltersState;


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
                renderItem={itemRenderer(dispatch, saveToMem)}
            />
        </>
    )
}

const itemRenderer = (dispatch: ReturnType<typeof useAppDispatch>, {saveToMemory, saved, lastSaved}: ReturnType<typeof useSaveToMemory>) => ({ item }: any) => (
    <List.Item
        title={item.departureArrival}
        right={() => (
            <Button onPress={
                () => {
                    dispatch(setNextDate(item.departureDate));
                    saveToMemory("countdown", item.departureDate);
                    
                }
            }>
                <Icon source={saved && item.departureDate === lastSaved['value'] ? 'check' : 'plus'} color={saved && item.departureDate === lastSaved['value'] ? "green" : "white"} size={20} />
            </Button>)
        }
    />
)

export default ItineraryDates;