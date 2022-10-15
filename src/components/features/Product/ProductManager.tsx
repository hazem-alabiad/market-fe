import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useProductsQuery } from "../../../services/productsApi";
import { Pagination } from "../Pagination/Pagination";
import { ProductsGrid } from "./ProductsGrid";

export const ProductList = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading, error } = useProductsQuery(page);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <div>Error</div>;
  }

  if (!products) {
    return <div>No posts :(</div>;
  }

  return (
    <>
      <ProductsGrid cards={products.data} />
      <StyledPaginationWrapper>
        <Pagination />
      </StyledPaginationWrapper>
    </>
  );
};

const StyledPaginationWrapper = styled.nav`
  padding: 0;
  margin: 0;
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
