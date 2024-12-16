import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/countries-slice';
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for use in components
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected = useSelector;

export default store;