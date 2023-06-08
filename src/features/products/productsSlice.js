import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	isLoading: false,
	isError: false,
	errorMessage: '',
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
	const res = await fetch('http://localhost:5000/products');
	const data = await res.json();
	return data.data;
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.products = [];
				state.errorMessage = action.error.message;
			});
	},
});

export default productsSlice.reducer;
