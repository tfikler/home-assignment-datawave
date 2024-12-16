import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/countries-slice';

const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

export default store;