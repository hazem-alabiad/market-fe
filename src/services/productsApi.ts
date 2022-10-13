import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum ItemType {
  mug = "mug",
  shirt = "shirt",
}

export type Product = {
  tags: Array<string>;
  price: number;
  name: string;
  description: string;
  slug: string;
  added: number;
  manufacturer: string;
  itemType: ItemType;
};

export type ListResponse<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    products: builder.query<Array<Product>, number | void>({
      query: (page = 1) => `items?_page=${page}`,
    }),
  }),
});

export const { useProductsQuery } = productsApi;
