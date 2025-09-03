import ThemedText from "@components/ui/ThemedComponents/ThemedText";
import { useThemeColor } from "@hooks/useThemeColor";
import { useAppDispatch } from "@store/index";
import { setDates } from "@store/slices/Filters/CruiseFilters";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button, Icon } from "react-native-paper";

const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const selected = Object.fromEntries(Array.from(mL.entries()).map(([, month]) => [month, false]));

interface ButtonGroupProps {
    setYear: React.Dispatch<React.SetStateAction<number>>
    year: number
}

const ButtonGroup = ({ year, setYear }: ButtonGroupProps) => {
    const disabled = year === DateTime.now().year;

    return (
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: 3, alignItems: 'center' }}>
            <Button onPress={() => setYear(year - 1)} disabled={disabled}>
                <Icon source={'chevron-left'} size={30} color={disabled ? "#00000" : "#fff"} />
            </Button>
            <ThemedText>
                {year}
            </ThemedText>
            <Button onPress={() => setYear(year + 1)}>
                <Icon source={'chevron-right'} size={30} />
            </Button>
        </View>
    )
}

const DatePicker = ({ open }: { open: boolean }) => {
    const dispatch = useAppDispatch();

    const dateTime = useMemo(() => DateTime.now(), []);
    const [year, setYear] = useState(dateTime.year);
    const [monthsSel, setMonthSel] = useState(selected);
    const [yearMonthSel, setYearMonthSel] = useState<{ [index: number]: { [index: string]: boolean } }>({});

    const text = useThemeColor({}, 'text');

    const monthSlices = [];

    for (let i = 0; i < 4; i++) {
        monthSlices.push(mL.slice(3 * i, (3 * i) + 3));
    }

    useEffect(() => {
        setMonthSel(yearMonthSel[year] ?? selected);
    }, [year]);

    useEffect(() => {
        setYearMonthSel({ ...yearMonthSel, [year]: monthsSel });
    }, [monthsSel]);

    useEffect(() => {
        const dates: string[] = [];
        Object.keys(yearMonthSel).forEach(
            (y) => {
                const mL = yearMonthSel[parseInt(y, 10)];
                Object.keys(mL).forEach(
                    (m, index) => {
                        if (mL[m]) {
                            dates.push(`${(index + 1).toString().padStart(2, '0')}${y}`)
                        }
                    }
                )
            }
        )
        dispatch(setDates(dates))
    }, [yearMonthSel]);

    return (
        <>
            <Collapsible collapsed={!open}>
                <View style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 10, paddingVertical: 20 }}>
                    <ButtonGroup setYear={setYear} year={year} />
                    {monthSlices.map(
                        (monthSlice) => <View key={monthSlice.join('-')} style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>
                            {monthSlice.map(
                                (month) => {
                                    const disabled = (dateTime.toMillis() > DateTime.fromObject({ year, month: mL.findIndex((m) => m === month) + 1 }).toMillis())
                                        && dateTime.month !== mL.findIndex((m) => m === month) + 1;
                                    return (
                                        <Button
                                            disabled={disabled}
                                            style={{ ...{ width: '25%', height: 40 }, ...(monthsSel[month] ? { backgroundColor: "#a63737" } : {}) }}
                                            key={month}
                                            onPress={() => setMonthSel({ ...monthsSel, [month]: !monthsSel[month] })}>
                                            <ThemedText style={{ textAlignVertical: 'auto', fontSize: 10, fontWeight: 'semibold', fontVariant: ['contextual'], color: disabled ? "#00000" : (monthsSel[month] ? "#fff" : text) }}>
                                                {month}
                                            </ThemedText>
                                        </Button>)
                                }
                            )}</View>)}
                </View>
            </Collapsible>
        </>
    )
}

export default DatePicker;

