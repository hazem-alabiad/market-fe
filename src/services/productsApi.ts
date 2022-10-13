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
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

// number of results per page
const LIMIT = 12;

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    products: builder.query<ListResponse<Product>, number | void>({
      query: (page = 1) => `items?_page=${page}^&_limit=${LIMIT}`,
      transformResponse: (data: ListResponse<Product>, meta) => {
        const linkHeader = meta?.response?.headers.get("Link");
        const lastPageInfo = linkHeader?.split(",").at(-1);
        const total_pages =
          linkHeader && lastPageInfo
            ? Number(
                lastPageInfo?.match(/page=\d+/g)?.[0].match(/\d+/g)?.[0] ?? ""
              )
            : 0;

        const total = Number(meta?.response?.headers.get("X-Total-Count"));

        return {
          data,
          total,
          total_pages,
          per_page: LIMIT,
        };
      },
    }),
  }),
});

export const { useProductsQuery } = productsApi;
