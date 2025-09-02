import { ThemedCard, ThemedText } from "@components/ui/ThemedComponents";
import { useAppDispatch, useAppSelector } from '@store/index';
import { setCountdown, VacationStateType } from '@store/slices/VacationCountdown';
import { DateTime } from 'luxon';
import { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { PageTemplate } from "../../src/components/templates";


const Landing = () => (
    <>
        <ThemedCard style={{ paddingVertical: 20 }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 15 }}>
                Countdown
            </ThemedText>
            <Countdown />
        </ThemedCard>
    </>
)

const getVacationText = (type: VacationStateType['vacationType']) => {
    switch (type) {
        case 'CRUISE':
            return "Cruise";
        case 'FLIGHT':
            return "Flight";
        case 'HOTEL':
            return "Hotel";
        default:
            return "Vacation"
    }
}

const Countdown = () => {
    const { departureDate, vacationType } = useAppSelector('VacationCountdown') as VacationStateType;
    const dispatch = useAppDispatch();
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
                <ThemedText>
                    {days ? `${days} days ` : null}
                    {hours ? `${hours % 24} hours ` : null}
                    {minutes ? `${minutes % 60} minutes ` : null}
                    {second ? `${(Math.floor(second % 60))} seconds` : null}
                </ThemedText>
                <ThemedText>
                    until your {getVacationText(vacationType)}!
                </ThemedText>
            </>
        )
    }

    return <Button onPress={() => dispatch(setCountdown({
        departureDate: "2027-08-07T00:00:00.000Z",
        vacationType: "CRUISE"
    }))}>
        <ThemedText>
            Add Time
        </ThemedText>
    </Button>;
}

const Index = () => {
    return (
        <PageTemplate
            content={<Landing />}
        />
    )
}

export default Index;