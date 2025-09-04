export interface VacationType {
    departureDate: string;
    vacationType: 'CRUISE' | 'FLIGHT' | 'HOTEL' | '';
    vacationName: string;
}

export interface VacationStateType {
    currentCountdown: VacationType;
    savedVacations: VacationType[]
}