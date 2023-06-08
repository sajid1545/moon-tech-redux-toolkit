import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stock: false,
	brands: [],
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		toggleStock: (state, action) => {
			state.stock = !state.stock;
		},
		toggleBrands: (state, action) => {
			if (!state.brands.includes(action.payload)) {
				state.brands.push(action.payload);
			} else {
				state.brands = state.brands.filter((brand) => brand !== action.payload);
			}
		},
	},
});

export const { toggleStock,toggleBrands } = filterSlice.actions;
export default filterSlice.reducer;
