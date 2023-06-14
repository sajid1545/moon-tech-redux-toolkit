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

		updateProduct: builder.mutation({
			query: ({ product, _id }) => ({
				url: `/product/${_id}`,
				method: 'PUT',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),

		removeProduct: builder.mutation({
			query: (id) => ({
				url: `/product/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useAddProductMutation,
	useUpdateProductMutation,
	useRemoveProductMutation,
} = productsApi;
