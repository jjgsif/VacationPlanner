import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CruiseFiltersState {
    shipCode: string[];
    duration: number[];
    port: string[];
    dates: string[];
}

const initialState: CruiseFiltersState = {
    shipCode: [],
    duration: [],
    port: [],
    dates: []
}

const CruiseFilters = createSlice({
    name: 'CruiseFilters',
    initialState,
    reducers: {
        setFilters: (_state, action: PayloadAction<CruiseFiltersState>) => (action.payload),
        setDuration: (state, action: PayloadAction<number[]>) => ({ ...state, duration: action.payload }),
        setPort: (state, action: PayloadAction<string[]>) => ({ ...state, port: action.payload }),
        setShipCode: (state, action: PayloadAction<string[]>) => ({ ...state, shipCode: action.payload }),
        setDates: (state, action: PayloadAction<string[]>) => ({ ...state, dates: action.payload }),
        resetFilters: () => initialState
    }
});

export const {
    setFilters,
    setDuration,
    setDates,
    setPort,
    setShipCode,
    resetFilters
} = CruiseFilters.actions;

export default CruiseFilters;