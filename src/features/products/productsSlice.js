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

export const addProducts = createAsyncThunk('addProducts/getProducts', async (product) => {
	const res = await fetch('http://localhost:5000/product', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(product),
	});
	const data = await res.json();
	if (data.acknowledged) {
		return {
			_id: data.insertedId,
			...product,
		};
	}
});
export const deleteProducts = createAsyncThunk('deleteProducts/getProducts', async (id) => {
	const res = await fetch(`http://localhost:5000/product/${id}`, {
		method: 'DELETE',
	});
	const data = await res.json();

	return id;
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
			})
			.addCase(addProducts.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products.push(action.payload);
			})
			.addCase(deleteProducts.pending, (state, action) => {
				state.isLoading = true;
				state.products = state.products.filter((product) => product._id !== action.payload);
			})
			.addCase(deleteProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = state.products.filter((product) => product._id !== action.payload);
			});
	},
});

export default productsSlice.reducer;
