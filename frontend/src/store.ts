import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/countries-slice';
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected = useSelector;

export default store;