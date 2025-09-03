import { useThemeColor } from "@hooks/useThemeColor";
import { useAppDispatch, useAppSelector } from "@store/index";
import { closeFilter, CruiseFiltersState } from "@store/slices/Filters/CruiseFilters";
import { useEffect } from "react";
import { View } from "react-native";
import DatePicker from "./DatePicker";
import ShipPicker from "./ShipPicker";

const Filters = () => {
    const { openFilters } = useAppSelector('CruiseFilters') as CruiseFiltersState;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(closeFilter());
    }, []);

    const color = useThemeColor({}, 'text')

    return <View style={openFilters ? {borderWidth: 2, margin: 2, borderRadius: 20, borderColor: color }: {}}>
        <DatePicker open={openFilters === 'dates'} />
        <ShipPicker open={openFilters === 'ship'} />
    </View>
}

export default Filters;