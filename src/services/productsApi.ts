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

type GetProductsArgs = {
  page: number;
  filters?: {
    itemType: string | null;
    sortBy: string | null;
    sortDirection: string | null;
  };
};

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ListResponse<Product>, GetProductsArgs | void>({
      query: ({ page = 1, filters }: GetProductsArgs) =>
        `items?_page=${page}&_limit=${LIMIT}${
          filters?.itemType ? `&itemType=${filters.itemType}` : ""
        }${
          filters?.sortBy
            ? `&_sort=${filters.sortBy}&_order=${
                filters.sortDirection || "asc"
              }`
            : ""
        }`,
      transformResponse: (data: ListResponse<Product>, meta) => {
        const total = Number(meta?.response?.headers.get("X-Total-Count"));

        return {
          data,
          total,
          per_page: LIMIT,
          total_pages: Math.ceil(total / LIMIT),
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
