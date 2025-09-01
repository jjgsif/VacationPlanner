import ThemedCard from "@components/ui/ThemedComponents/ThemedCard";
import { Colors } from "@constants/Colors";
import { useGetShipsQuery } from "@store/api/Cruises/Carnival/Ships";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { List } from "react-native-paper";

const ShipList = () => {
    const { data } = useGetShipsQuery(null, { pollingInterval: 400000 });
    const ColorScheme = useColorScheme();
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    const keys = Object.keys(data ?? {}).sort();
    return (
        <>
            <ThemedCard style={{
                width: "100%",
                minHeight: '15%',
                height: expanded ? "60%" : "auto",
                overflow: 'hidden',
                marginVertical: 10
            }}>
                <List.Section title="Cruise Lines">
                    {data && <List.Accordion
                        style={{ backgroundColor: Colors[ColorScheme ?? 'dark'].cardBackground }}
                        expanded={expanded}
                        onPress={() => setExpanded(!expanded)}
                        title="Carnival Cruises"
                        titleStyle={!expanded ? { color: Colors[ColorScheme ?? 'light'].text } : null}
                    >
                        <ScrollView
                            scrollsToTop
                            contentInset={{ bottom: 225 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {keys.map((ship) => (
                                <List.Item key={ship}
                                    titleStyle={{ color: Colors[ColorScheme ?? 'light'].text }}
                                    title={ship}
                                    right={props => <List.Icon {...props} icon="chevron-right" />}
                                    onPress={() => { router.navigate(`/pages/Cruises/${data[ship].shipCode}` as Href) }}
                                />)
                            )}

                        </ScrollView>
                    </List.Accordion>
                    }
                </List.Section>
            </ThemedCard>
        </>);
}

export default ShipList;