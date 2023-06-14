import { productsApi } from '../features/api/apiSlice';
import cartSlice from '../features/cart/cartSlice';
import filterSlice from './../features/filter/filter';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		cart: cartSlice,
		filter: filterSlice,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
