import { ThemedText } from "@components/ui/ThemedComponents";
import { useGetShipsQuery } from "@store/api/Cruises/Carnival/Ships";
import { useAppDispatch, useAppSelector } from "@store/index";
import { CruiseFiltersState, setShipCode } from "@store/slices/Filters/CruiseFilters";
import { Destination, Ports } from "@type/Carnival";
import { useMemo, useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button, Icon } from "react-native-paper";

interface ButtonGroupProps {
    setPage: React.Dispatch<React.SetStateAction<number>>
    page: number,
    pageLimit: number
}

const ButtonGroup = ({ page, setPage, pageLimit }: ButtonGroupProps) => {
    const leftDisabled = page === 0;
    const rightDisabled = (page + 1) === pageLimit;

    return (
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
            <Button onPress={() => setPage(page - 1)} disabled={leftDisabled}>
                <Icon source={'chevron-left'} size={30} color={leftDisabled ? "#00000" : "#fff"} />
            </Button>
            <ThemedText>
                {page + 1}
            </ThemedText>
            <Button onPress={() => setPage(page + 1)} disabled={rightDisabled}>
                <Icon source={'chevron-right'} size={30} color={rightDisabled ? "#00000" : "#fff"} />
            </Button>
        </View>
    )
}

const ShipPicker = ({ open }: { open: boolean }) => {
    const { data } = useGetShipsQuery(null);
    const [page, setPage] = useState(0);

    const { shipCode } = useAppSelector('CruiseFilters') as CruiseFiltersState;
    const dispatch = useAppDispatch();

    const arrayData = data ? Object.entries(data).map(([shipName, ship]) => ({ shipName: shipName.trim(), ...ship })).sort((a, b) => {
        if (a.shipName < b.shipName)
            return -1;
        if (a.shipName > b.shipName)
            return 1;
        return 0;
    }) : []

    const shipSlices: ({
        shipCode: string;
        destinations: Destination[];
        ports: Ports[];
        shipName: string;
    }[])[] = [];

    for (let i = 0; i < Math.floor(arrayData.length / 3) + 1; i++) {
        shipSlices.push(arrayData.slice(3 * i, (3 * i) + 3));
    }

    const shipPages = Math.floor(shipSlices.length / 4) + 1;

    const shipPage = useMemo(() => {
        return shipSlices.slice((4 * page), (4 * page) + 4);
    }, [page]);

    return <>
        <Collapsible collapsed={!open}>
            <View style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 10, paddingVertical: 20 }}>
                <ButtonGroup setPage={setPage} page={page} pageLimit={shipPages} />
                {shipPage.map(
                    (shipInfo) => <View key={shipInfo.map(v => v.shipCode).join('-')} style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>
                        {shipInfo.map(
                            (ship) => {
                                return (
                                    <Button
                                        style={{ ...{ width: '30%', height: 40 }, ...(shipCode.includes(ship.shipCode) ? { backgroundColor: "#a63737" } : {}) }}
                                        key={ship.shipCode}
                                        onPress={() => {
                                            if (!shipCode.includes(ship.shipCode)) {
                                                dispatch(setShipCode([...shipCode, ship.shipCode]))
                                            } else {
                                                dispatch(setShipCode(shipCode.filter(v => v !== ship.shipCode)))
                                            }
                                        }}>
                                        <ThemedText style={{ textAlignVertical: 'bottom', width: 'auto', fontSize: 10, fontWeight: 'semibold', fontVariant: ['contextual'] }}>
                                            {ship.shipName.trim()}
                                        </ThemedText>
                                    </Button>)
                            }
                        )}</View>)}
            </View>
        </Collapsible>
    </>
}

export default ShipPicker;