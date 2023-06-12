import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteProduct, fetchProducts, postProduct, updateProduct } from './productsAPI';

const initialState = {
	products: [],
	isLoading: false,
	isError: false,
	errorMessage: '',
	postSuccess: false,
	deleteSuccess: false,
	updateSuccess: false,
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
	const products = fetchProducts();
	return products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
	const products = postProduct(product);
	return products;
});

export const editProduct = createAsyncThunk('products/editProduct', async ({ product, _id }) => {
	const products = updateProduct({ product, _id });
	return products;
});

export const removeProduct = createAsyncThunk('products/removeProduct', async (id, thunkAPI) => {
	const products = deleteProduct(id);
	thunkAPI.dispatch(removeProductFromList(id));
	return products;
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		togglePostSuccess: (state) => {
			state.postSuccess = false;
		},
		toggleDeleteSuccess: (state) => {
			state.deleteSuccess = false;
		},
		toggleUpdateSuccess: (state) => {
			state.updateSuccess = false;
		},

		removeProductFromList: (state, action) => {
			state.products = state.products.filter((product) => product._id !== action.payload);
		},
	},
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
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.postSuccess = false;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.postSuccess = true;
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.products = [];
				state.postSuccess = false;
				state.errorMessage = action.error.message;
			})
			.addCase(removeProduct.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.deleteSuccess = false;
			})
			.addCase(removeProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.deleteSuccess = true;
			})
			.addCase(removeProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.products = [];
				state.deleteSuccess = false;
				state.errorMessage = action.error.message;
			})
			.addCase(editProduct.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.updateSuccess = false;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.updateSuccess = true;
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.products = [];
				state.updateSuccess = false;
				state.errorMessage = action.error.message;
			});

		// .addCase(editProduct.pending, (state, action) => {
		// 	state.isLoading = true;
		// })
		// .addCase(editProduct.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	// const updatedProduct = state.products.find((product) => product._id === action.payload._id);
		// 	state.products = state.products.filter((product) => product._id !== action.payload._id);
		// 	state.products.push(action.payload);
		// });
	},
});

export const {
	togglePostSuccess,
	toggleDeleteSuccess,
	removeProductFromList,
	toggleUpdateSuccess,
} = productsSlice.actions;
export default productsSlice.reducer;
