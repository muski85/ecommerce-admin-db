import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  }),
  tagTypes: ['Products', 'Orders', 'Stats'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products', 'Stats'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Products', 'Stats'],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft.find(p => p.id === id);
            if (product) {
              Object.assign(product, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Stats'],
    }),

    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Orders', 'Stats'],
    }),

    getStats: builder.query({
      query: () => '/stats',
      providesTags: ['Stats'],
    }),

    restockProduct: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/products/${id}/restock`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Products', 'Stats'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRestockProductMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetStatsQuery,
} = apiSlice;
