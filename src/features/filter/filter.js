import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stock: false,
	brands: [],
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {},
});

export default filterSlice.reducer;
