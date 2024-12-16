import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rows: [
        { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 403 },
        { name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 147 },
        { name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 201 },
        { name: 'United States', code: 'US', population: 331449281, size: 9833520, density: 34 },
        { name: 'Canada', code: 'CA', population: 38520851, size: 9976140, density: 4 },
        { name: 'Australia', code: 'AU', population: 25268912, size: 7692024, density: 3 },
    ]
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        editRow(state, action) {
            state.rows[action.payload.row_index] = {
                name: action.payload.name,
                code: action.payload.code,
                population: action.payload.population,
                size: action.payload.size,
                density: action.payload.density
            }
        },
        deleteRow(state, action) {
            state.rows.splice(action.payload.row_index, 1);
        },
    },
});

export const {editRow, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;