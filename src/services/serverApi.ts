import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// number of results per page
const LIMIT = 12;

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

export type GetProductsListResponse<T> = {
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export type Company = {
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  account: number;
  contact: string;
};

export type GetCompaniesListResponse<T> = {
  total: number;
  data: Record<string, T>;
};

type GetProductsArgs = {
  page?: number | null;
  filters?: {
    itemType?: string | null;
    sortBy?: string | null;
    direction?: string | null;
    manufacturers?: Array<string> | null;
    tag?: string | null;
  };
};

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      GetProductsListResponse<Product>,
      GetProductsArgs | void
    >({
      query: ({ page, filters }: GetProductsArgs) => {
        const pagination = page ? `_page=${page}&_limit=${LIMIT}` : "";

        const itemTypeFilter = filters?.itemType
          ? `&itemType=${filters.itemType}`
          : "";

        const orderByFilter = filters?.direction || "asc";

        const sortByFilter = filters?.sortBy
          ? `&_sort=${filters.sortBy}&_order=${orderByFilter}`
          : "";

        const manufacturersFilter = filters?.manufacturers
          ? filters.manufacturers
              .map((manufacturer) => `&manufacturer=${manufacturer}`)
              .join("")
          : "";

        const tagFilter = filters?.tag ? `&tags_like=${filters.tag}` : "";

        return `items?${pagination}${itemTypeFilter}${sortByFilter}${manufacturersFilter}${tagFilter}`;
      },
      transformResponse: (data: Array<Product>, meta) => {
        const total = Number(meta?.response?.headers.get("X-Total-Count"));

        return {
          data,
          total,
          per_page: LIMIT,
          total_pages: Math.ceil(total / LIMIT),
        };
      },
    }),
    getCompanies: builder.query<GetCompaniesListResponse<Company>, void>({
      query: () => "companies",
      transformResponse: (data: Array<Company>) => ({
        data: Object.fromEntries(
          data.map((company) => [company.slug, company])
        ),
        total: data.length,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCompaniesQuery } = serverApi;
