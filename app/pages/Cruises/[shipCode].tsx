import SailingList from "@components/Explore/CruiseLines/SailingList";
import PageTemplate from "@components/templates/PageTemplate";
import { useSearchSailingsQuery } from "@store/api/Cruises/Carnival/Sailings";
import { useAppDispatch, useAppSelector } from "@store/index";
import { CruiseFiltersState, setShipCode } from "@store/slices/Filters/CruiseFilters";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

const CruiseSearch = () => {
    const { shipCode } = useLocalSearchParams();
    const dispatch = useAppDispatch();
    const {
        shipCode: shipcode,
        duration,
        port
    } = useAppSelector('CruiseFilters') as CruiseFiltersState;

    useEffect(() => {
        if (typeof shipCode === 'string') {
            dispatch(setShipCode([shipCode]));
        }
    }, [shipCode]);

    const { data, isFetching } = useSearchSailingsQuery({
        shipcode,
        durdays: duration,
        port
    }, { refetchOnMountOrArgChange: true });

    if (data && !isFetching) {
        return (
            <PageTemplate
                headerShown
                content={<SailingList data={data} />}
            />
        )
    } else {
        return <PageTemplate
            headerShown
            content={<ActivityIndicator
                style={{ position: 'absolute', right: "45%", bottom: "55%" }}
                size={45}
            />}
        />
    }
}

export default CruiseSearch;