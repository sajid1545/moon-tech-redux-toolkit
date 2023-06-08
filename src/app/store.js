import logger from 'redux-logger';
import cartSlice from '../features/cart/cartSlice';
import productsSlice from '../features/products/productsSlice';
import filterSlice from './../features/filter/filter';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		cart: cartSlice,
		filter: filterSlice,
		products: productsSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
