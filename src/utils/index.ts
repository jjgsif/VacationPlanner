import { VacationStateType } from "@store/slices/VacationCountdown/Types";

const getVacationText = (type: VacationStateType['currentCountdown']['vacationType']) => {
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

export {
    getVacationText
};

