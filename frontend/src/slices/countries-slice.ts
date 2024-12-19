import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Country, PaginatedResponse } from '../types/country.interface';

interface FetchRowsParams {
    page: number;
    limit: number;
    search?: string;
    filterBy?: string;
}

export const fetchRows = createAsyncThunk(
    'table/fetchRows',
    async ({ page, limit, search, filterBy }: FetchRowsParams) => {
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
        const filterParam = filterBy ? `&filterBy=${filterBy}` : '';
        const response = await axios.get<PaginatedResponse<Country>>(
            `http://localhost:3000/countries?page=${page}&limit=${limit}${searchParam}${filterParam}`
        );
        return response.data;
    }
);

export const fetchAllCountries = createAsyncThunk(
    'table/fetchAllCountries',
    async () => {
        const response = await axios.get<Country[]>(
            `http://localhost:3000/countries?page=-1`
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
    allCountries: Country[];
    loading: boolean;
    error: string | null;
}

const initialState: TableState = {
    rows: null,
    allCountries: [],
    loading: false,
    error: null,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch paginated rows
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
            // Fetch all countries
            .addCase(fetchAllCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.allCountries = action.payload;
            })
            .addCase(fetchAllCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch data';
            })
            // Update country
            .addCase(updateCountry.fulfilled, (state, action) => {
                // Update in paginated data
                if (state.rows?.data) {
                    const index = state.rows.data.findIndex(
                        (country) => country.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.rows.data[index] = action.payload;
                    }
                }
                // Update in all countries
                const allIndex = state.allCountries.findIndex(
                    (country) => country.id === action.payload.id
                );
                if (allIndex !== -1) {
                    state.allCountries[allIndex] = action.payload;
                }
            })
            // Delete country
            .addCase(deleteCountry.fulfilled, (state, action) => {
                // Remove from paginated data
                if (state.rows?.data) {
                    state.rows.data = state.rows.data.filter(
                        (country) => country.id !== action.payload
                    );
                }
                // Remove from all countries
                state.allCountries = state.allCountries.filter(
                    (country) => country.id !== action.payload
                );
            });
    },
});

export default tableSlice.reducer;