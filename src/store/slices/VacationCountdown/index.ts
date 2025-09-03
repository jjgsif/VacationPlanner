import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VacationStateType {
    departureDate: string;
    vacationType: 'CRUISE' | 'FLIGHT' | 'HOTEL' | '';
}

const initialState: VacationStateType = {
    departureDate: '',
    vacationType: ''
};

const CountdownSlice = createSlice({
    name: "VacationCountdown",
    initialState,
    reducers: {
        setNextDate: (state, action: PayloadAction<string>) => ({...state, departureDate: action.payload}),
        setVacationType: (state, action: PayloadAction<VacationStateType['vacationType']>) => ({...state, vacationType: action.payload}),
        setCountdown: (_state, action: PayloadAction<VacationStateType>) => ({...action.payload})
    }
});

export const {
    setNextDate,
    setVacationType,
    setCountdown
} = CountdownSlice.actions;

export default CountdownSlice;