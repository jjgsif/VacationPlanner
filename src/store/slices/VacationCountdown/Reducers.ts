import { PayloadAction } from "@reduxjs/toolkit";
import { VacationStateType, VacationType } from "./Types";

const Reducers: { [index: string]: (state: VacationStateType, action: PayloadAction<any>) => VacationStateType } = {
    setCurrentCountdown(state, action) {
        if (state.currentCountdown.departureDate) {
            state.savedVacations.push(state.currentCountdown);
        }
        state.currentCountdown = action.payload;
        return state;
    },
    setAddToVacations(state, action: PayloadAction<VacationType>) {
        state.savedVacations.push(action.payload);
        return state;
    },
    replaceCountdown(state, { payload }: PayloadAction<number | null>) {
        if (typeof payload === 'number') {
            const temp = state.currentCountdown;
            state.currentCountdown = state.savedVacations[payload];
            state.savedVacations = [...state.savedVacations.slice(0, payload), ...state.savedVacations.slice(payload + 1)];
            if (temp) {
                state.savedVacations.push(temp);
            }
        } else {
            if (state.currentCountdown) {
                state.savedVacations.push(state.currentCountdown);
                state.currentCountdown = {
                    vacationName: '',
                    vacationType: '',
                    departureDate: ''
                };
            }
        }
        return state;
    },
    removeVacation(state, action: PayloadAction<number>) {
        state.savedVacations = [...state.savedVacations.slice(0, action.payload), ...state.savedVacations.slice(action.payload + 1)]

        return state;
    },
    setSlice(_state, { payload }: PayloadAction<VacationStateType>) {
        return payload;
    }
};

export default Reducers;