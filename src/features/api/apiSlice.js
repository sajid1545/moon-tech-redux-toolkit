import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: '/products',
			}),
			providesTags: ['Products'],
		}),

		addProduct: builder.mutation({
			query: (product) => ({
				url: '/product',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const { useGetProductsQuery, useAddProductMutation } = productsApi;
