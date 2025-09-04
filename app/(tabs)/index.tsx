import VacationComponent from "@components/Landing/VacationComponent";
import { ThemedCard, ThemedText } from "@components/ui/ThemedComponents";
import useSaveToMemory from "@hooks/startup/useSaveToMemory";
import { useAppSelector } from '@store/index';
import { VacationStateType } from '@store/slices/VacationCountdown/Types';
import { DateTime } from 'luxon';
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { PageTemplate } from "../../src/components/templates";
import { getVacationText } from "../../src/utils";

const Landing = () => {
    const countdownState = useAppSelector('VacationCountdown') as VacationStateType;
    const { saveToMemory } = useSaveToMemory();

    useEffect(() => {
        saveToMemory('countdown', JSON.stringify(countdownState));
    }, [countdownState])

    return (
        <>
            <ThemedCard style={{ paddingVertical: 20 }}>
                <ThemedText style={{ fontWeight: 'bold', fontSize: 15 }}>
                    Countdown
                </ThemedText>
                <Countdown />
            </ThemedCard>
            {
                countdownState.savedVacations && <ThemedCard style={{ marginVertical: 20 }}>
                    <FlatList
                        data={countdownState.savedVacations}
                        renderItem={({ item, index }) => <VacationComponent {...item} itemValue={index} />}
                    />
                </ThemedCard>
            }
        </>
    );
}

const Countdown = () => {
    const { currentCountdown } = useAppSelector('VacationCountdown') as VacationStateType;
    const { departureDate, vacationName, vacationType } = currentCountdown ?? {};
    const seconds = departureDate ? DateTime.fromISO(departureDate) : null;
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            seconds?.minus({ second: 1 });
            setRefresh(() => !refresh);
        }, 1000);
        return () => clearInterval(timer)
    }, [refresh]);

    if (seconds) {
        const { days, hours, minutes, seconds: second } = seconds?.diffNow(['days', 'hours', 'minutes', 'second']).toObject();
        return (
            <>
                <ThemedText style={{ fontWeight: '500', paddingHorizontal: 20, paddingVertical: 5 }}>
                    {vacationName}
                </ThemedText>
                <View style={{ width: "85%", backgroundColor: 'black', height: 2, alignSelf: 'center', opacity: .2 }} />
                <ThemedText style={{ paddingVertical: 5 }}>
                    {days ? `${days} days ` : null}
                    {hours ? `${hours % 24} hours ` : null}
                    {minutes ? `${minutes % 60} minutes ` : null}
                    {second ? `${(Math.floor(second % 60))} seconds` : null}
                </ThemedText>
                <ThemedText>
                    until your {getVacationText(vacationType)} on {seconds.toFormat('LLLL dd, yyyy')}!
                </ThemedText>
            </>
        )
    } else {
        return null;
    }
}

const Index = () => {
    return (
        <PageTemplate
            content={<Landing />}
        />
    )
}

export default Index;