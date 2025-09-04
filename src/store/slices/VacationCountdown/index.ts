import { createSlice } from "@reduxjs/toolkit";
import Reducers from "./Reducers";
import { VacationStateType } from "./Types";

const initialState: VacationStateType = {
    savedVacations: [],
    currentCountdown: {
        departureDate: '',
        vacationName: '',
        vacationType: ''
    }
};

const CountdownSlice = createSlice({
    name: "VacationCountdown",
    initialState,
    reducers: Reducers
});

export const {
    setCurrentCountdown,
    setAddToVacations,
    removeVacation,
    replaceCountdown,
    setSlice
} = CountdownSlice.actions;

export default CountdownSlice;