import cartSlice from '../features/cart/cartSlice';
import filterSlice from './../features/filter/filter';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
	reducer: {
		cart: cartSlice,
		filter: filterSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
