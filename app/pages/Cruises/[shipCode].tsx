import Filters from "@components/Common/Filters";
import SailingList from "@components/Explore/CruiseLines/SailingList";
import PageTemplate from "@components/templates/PageTemplate";
import { useSearchSailingsQuery } from "@store/api/Cruises/Carnival/Sailings";
import { useAppDispatch, useAppSelector } from "@store/index";
import { closeFilter, CruiseFiltersState, openFilter, setShipCode } from "@store/slices/Filters/CruiseFilters";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FloatingAction } from "react-native-floating-action";
import { ActivityIndicator, Icon } from "react-native-paper";

const actions = [
  {
    text: "Ship",
    icon: <Icon size={30} source={'sail-boat'}/>,
    name: "ship",
    position: 2
  },
  {
    text: "Dates",
    icon: <Icon size={30} source={'calendar'}/>,
    name: "dates",
    position: 1
  },
  {
    text: "Port",
    icon: <Icon size={30} source={'island'}/>,
    name: "port",
    position: 3
  },
  {
    text: "Duration",
    icon: <Icon size={30} source={'clock-time-four-outline'}/>,
    name: "duration",
    position: 4
  }
];

const CruiseSearch = () => {
    const { shipCode } = useLocalSearchParams();
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
    }, []);

    const { data, isFetching } = useSearchSailingsQuery({
        shipcode,
        durdays: duration,
        port,
        dates
    }, { refetchOnMountOrArgChange: true });

    const {openFilters} = useAppSelector('CruiseFilters') as CruiseFiltersState;

    return (
        <PageTemplate
            headerShown
            content={
                <>
                    <Filters />
                    {data && !isFetching ?
                        <SailingList data={data} /> : <ActivityIndicator
                            style={{ position: 'absolute', right: "45%", bottom: "55%" }}
                            size={45}
                        />
                    }
                </>}
            floatingActionButton={<FloatingAction
                floatingIcon={<Icon source={'filter'} size={30}/>}
                actions={actions}
                onPressItem={name => {
                    if (openFilters === name) {
                        dispatch(closeFilter());
                    } else {
                       dispatch(openFilter(name as ("dates" | "port" | "duration" | "ship")));
                    }
                }}
            />}
        />
    );
}

export default CruiseSearch;