// store/services/woocommerceApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const site = process.env.NEXT_PUBLIC_SITE_URL;
const key = process.env.WOOCOMMERCE_CONSUMER_KEY!;
const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET!;
const auth = Buffer.from(`${key}:${secret}`).toString("base64");

export const woocommerceApi = createApi({
  reducerPath: "woocommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Basic ${auth}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: () => `products`,
    }),
    getAllCategories: builder.query<any, void>({
      query: () => `products/categories`,
    }),
    getProductBySlug: builder.query<any, string>({
      query: (slug) => `products/slug/${slug}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
  useGetProductBySlugQuery,
} = woocommerceApi;
