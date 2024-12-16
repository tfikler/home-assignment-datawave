import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchRows = createAsyncThunk('table/fetchRows', async () => {
    const response = await axios.get('http://localhost:3000/countries'); // Assumes API returns an array of rows
    return response.data;
});

const initialState = {
    rows: [],
    loading: false,
    error: null,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        editRow(state, action) {
            const index = action.payload.row_index;
            if (index >= 0 && index < state.rows.length) {
                state.rows[index] = {
                    name: action.payload.name,
                    code: action.payload.code,
                    population: action.payload.population,
                    size: action.payload.size,
                    density: action.payload.density,
                };
            }
        },
        deleteRow(state, action) {
            const index = action.payload.row_index;
            if (index >= 0 && index < state.rows.length) {
                state.rows.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRows.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRows.fulfilled, (state, action) => {
                state.loading = false;
                state.rows = action.payload;
            })
            .addCase(fetchRows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { editRow, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;