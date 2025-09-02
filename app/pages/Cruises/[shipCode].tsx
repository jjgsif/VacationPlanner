import DatePicker from "@components/Common/Filters/DatePicker";
import SailingList from "@components/Explore/CruiseLines/SailingList";
import PageTemplate from "@components/templates/PageTemplate";
import { useSearchSailingsQuery } from "@store/api/Cruises/Carnival/Sailings";
import { useAppDispatch, useAppSelector } from "@store/index";
import { CruiseFiltersState, setShipCode } from "@store/slices/Filters/CruiseFilters";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";

const CruiseSearch = () => {
    const { shipCode } = useLocalSearchParams();
    const [extended, setExpanded] = useState(false);
    const dispatch = useAppDispatch();
    const {
        shipCode: shipcode,
        duration,
        port,
        dates
    } = useAppSelector('CruiseFilters') as CruiseFiltersState;

    useEffect(() => {
        if (typeof shipCode === 'string') {
            dispatch(setShipCode([shipCode]));
        }
    }, [shipCode]);

    const { data, isLoading } = useSearchSailingsQuery({
        shipcode,
        durdays: duration,
        port,
        dates
    }, { refetchOnMountOrArgChange: true });


    return (
        <PageTemplate
            headerShown
            content={
                <>
                    <DatePicker open={extended} setOpen={setExpanded} />
                    {data && !isLoading ?
                        <SailingList data={data} /> : <ActivityIndicator
                            style={{ position: 'absolute', right: "45%", bottom: "55%" }}
                            size={45}
                        />
                    }
                </>}
            floatingActionButton={<AnimatedFAB onPress={() => setExpanded(!extended)} extended={extended} icon={"filter"} label="Filters" style={{
                bottom: 40,
                right: 40,
                position: 'absolute',
            }} />}
        />
    );
}

export default CruiseSearch;