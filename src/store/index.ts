import { configureStore } from '@reduxjs/toolkit/react';
import { useDispatch, useSelector } from 'react-redux';
import CruiseApis from './api';
import { CarnivalApi } from './api/Cruises';
import Slices from './slices';

const store = configureStore({
    reducer: {
        ...CruiseApis,
        ...Slices
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(CarnivalApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = (selector: keyof RootState) => useSelector((state: RootState) => state[selector]);

export default store;