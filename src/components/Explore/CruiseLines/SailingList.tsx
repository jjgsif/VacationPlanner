import { ThemedText } from "@components/ui/ThemedComponents";
import { Sailing } from "@type/Carnival";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Icon, List } from "react-native-paper";

interface Props {
    data: Sailing[];
}

const removeDuplicates = (data: Sailing[]) => {
    const items: { [index: string]: Sailing } = {};
    data.forEach(item => items[`${item.id}-${item.code}-${item.portsToDisplay.join('-')}`] = item);

    return Object.values(items);
}

const SailingList = ({ data }: Props) => {
    const sanitizedData = removeDuplicates(data);
    const router = useRouter();

    return (
        <>
            {data.length ? <FlatList
                data={sanitizedData}
                renderItem={({ item }) =>
                    <List.Item
                        title={`${item.shipName} - ${item.itineraryTitle}`}
                        titleNumberOfLines={2}
                        description={`Destination: ${item.departurePortName}\nDuration: ${item.dur} days${item.specialScoops.length ? `\nEvent: ${item.specialScoops[0].eventTitle1}` : ""}`}
                        descriptionNumberOfLines={4}
                        right={() => <Icon source={'chevron-right'} size={30} />}
                        onPress={() => { router.navigate(`/pages/Cruises/Itinerary/${item.id}`) }}
                    />
                }
                keyExtractor={(item) => `${item.id}-${item.code}-${item.portsToDisplay.join('-')}`}
            /> : <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Icon source={'feature-search-outline'} size={100}/>
                <ThemedText style={{fontWeight: 'condensedBold', fontSize: 25}}>
                    No Results Found
                </ThemedText>
            </View>}
        </>
    );
}

export default SailingList;