import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Country, PaginatedResponse } from '../types/country.interface';

interface FetchRowsParams {
    page: number;
    limit: number;
}

export const fetchRows = createAsyncThunk(
    'table/fetchRows',
    async ({ page, limit }: FetchRowsParams) => {
        const response = await axios.get<PaginatedResponse<Country>>(
            `http://localhost:3000/countries?page=${page}&limit=${limit}`
        );
        return response.data;
    }
);

export const updateCountry = createAsyncThunk(
    'table/updateCountry',
    async ({ id, data }: { id: number; data: Partial<Country> }) => {
        const response = await axios.put<Country>(
            `http://localhost:3000/countries/${id}`,
            data
        );
        return response.data;
    }
);

export const deleteCountry = createAsyncThunk(
    'table/deleteCountry',
    async (id: number) => {
        await axios.delete(`http://localhost:3000/countries/${id}`);
        return id;
    }
);

interface TableState {
    rows: PaginatedResponse<Country> | null;
    loading: boolean;
    error: string | null;
}

const initialState: TableState = {
    rows: null,
    loading: false,
    error: null,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
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
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(updateCountry.fulfilled, (state, action) => {
                if (state.rows?.data) {
                    const index = state.rows.data.findIndex(
                        (country) => country.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.rows.data[index] = action.payload;
                    }
                }
            })
            .addCase(deleteCountry.fulfilled, (state, action) => {
                if (state.rows?.data) {
                    state.rows.data = state.rows.data.filter(
                        (country) => country.id !== action.payload
                    );
                }
            });
    },
});

export default tableSlice.reducer;