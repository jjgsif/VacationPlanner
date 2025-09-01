import { Sailing } from "@type/Carnival";
import { FlatList } from "react-native";
import { Icon, List } from "react-native-paper";

interface Props {
    data: Sailing[];
}

const SailingList = ({ data }: Props) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) =>
                <List.Item
                    title={`${item.shipName} - ${item.itineraryTitle}`}
                    titleNumberOfLines={2}
                    description={`Destination: ${item.departurePortName}\nDuration: ${item.dur} days${item.specialScoops.length ? `\nEvent: ${item.specialScoops[0].eventTitle1}` : ""}`}
                    descriptionNumberOfLines={4}
                    right={() => <Icon source={'chevron-right'} size={30} />}
                    onPress={() => {}}
                />
            }
            keyExtractor={(item) => `${item.id}-${item.code}-${item.specialScoops.length}`}
        />
    );
}

export default SailingList;