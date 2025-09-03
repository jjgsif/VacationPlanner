import ItineraryDates from "@components/Common/Carnival/ItineraryDates";
import { PageTemplate } from "@components/templates";
import { useLocalSearchParams } from "expo-router";

const ItineraryLookup = () => {
    const {itineraryId} = useLocalSearchParams();

    return (
        <PageTemplate
            headerShown
            content={<ItineraryDates itineraryId={itineraryId as string}/>}
        />
    )
}

export default ItineraryLookup;